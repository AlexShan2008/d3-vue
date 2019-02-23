<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <div class="svg-container"></div>
    <!-- <div name="originData" id="originData" cols="30" rows="10" v-html="newData"></div> -->
  </div>
</template>

<script>
const d3 = require("d3");

export default {
  name: "Stack",
  mounted() {
    this.init();
  },
  data() {
    return {
      msg: "Stack",
      originData: [],
      flatData: [],
      newData: []
    };
  },
  methods: {
    init() {
      const width = 1000;
      const height = 600;
      const margin = {
        top: 10,
        right: 10,
        bottom: 20,
        left: 40
      };
      const svg = d3
        .select(".svg-container")
        .append("svg")
        .style("width", width)
        .style("height", height)
        .style("border", "1px solid #999")
        .attr("class", "stack");

      // A map from age group (<10, 10-19, 20-29, etc.) to array of Census variables.
      // https://api.census.gov/data/2016/acs/acs5/variables.html
      const variables = new Map(
        [
          ["<10", ["003", "004", "027", "028"]],
          ["10-19", ["005", "006", "007", "029", "030", "031"]],
          ["20-29", ["008", "009", "010", "011", "032", "033", "034", "035"]],
          ["30-39", ["012", "013", "036", "037"]],
          ["40-49", ["014", "015", "038", "039"]],
          ["50-59", ["016", "017", "040", "041"]],
          ["60-69", ["018", "019", "020", "021", "042", "043", "044", "045"]],
          ["70-79", ["022", "023", "046", "047"]],
          ["≥80", ["024", "025", "048", "049"]]
        ].map(([key, V]) => [key, V.map(v => `B01001_${v}E`)])
      );

      // A map from state FIPS numeric code to two-letter USPS abbreviation.
      // https://www.census.gov/geo/reference/ansi_statetables.html
      const states = new Map([
        ["01", "AL"],
        ["02", "AK"],
        ["04", "AZ"],
        ["05", "AR"],
        ["06", "CA"],
        ["08", "CO"],
        ["09", "CT"],
        ["10", "DE"],
        ["11", "DC"],
        ["12", "FL"],
        ["13", "GA"],
        ["15", "HI"],
        ["16", "ID"],
        ["17", "IL"],
        ["18", "IN"],
        ["19", "IA"],
        ["20", "KS"],
        ["21", "KY"],
        ["22", "LA"],
        ["23", "ME"],
        ["24", "MD"],
        ["25", "MA"],
        ["26", "MI"],
        ["27", "MN"],
        ["28", "MS"],
        ["29", "MO"],
        ["30", "MT"],
        ["31", "NE"],
        ["32", "NV"],
        ["33", "NH"],
        ["34", "NJ"],
        ["35", "NM"],
        ["36", "NY"],
        ["37", "NC"],
        ["38", "ND"],
        ["39", "OH"],
        ["40", "OK"],
        ["41", "OR"],
        ["42", "PA"],
        ["44", "RI"],
        ["45", "SC"],
        ["46", "SD"],
        ["47", "TN"],
        ["48", "TX"],
        ["49", "UT"],
        ["50", "VT"],
        ["51", "VA"],
        ["53", "WA"],
        ["54", "WV"],
        ["55", "WI"],
        ["56", "WY"],
        ["72", "PR"]
      ]);

      // Fetch the data from the Census, returning one row per state plus the header row,
      // and one column per variable plus the "state" column.
      const getData = async () => {
        const data = await d3.json(
          `https://api.census.gov/data/2016/acs/acs5?get=${Array.from(
            variables.values()
          )}&for=state:*`
        );

        this.originData = data;
        // console.log(data, "originData");

        // Construct an index from the variable name to the column number (e.g., B01001_003E => 0).
        // We expect the state code to be the last column; verify this before continuing.
        const index = new Map(data[0].map((d, i) => [d, i]));
        if (index.get("state") !== data[0].length - 1) throw new Error();

        // Construct an array of state abbreviations (in the order returned by the Census API).
        const names = data.slice(1).map(d => states.get(d[d.length - 1]));

        // Compute the total population for each state by aggregating across age groups.
        // (Don’t include the state column in the sum, obviously.)
        const totals = data.slice(1).map(d => d3.sum(d.slice(0, -1)));

        // Compute the desired order of states by descending total population.
        const order = d3
          .range(data.length - 1)
          .sort((i, j) => totals[j] - totals[i]);

        // Construct an array of arrays where sums[i][j] is the population for state i and age group j.
        const sums = data
          .slice(1)
          .map(d =>
            Array.from(variables.values(), V => d3.sum(V, v => d[index.get(v)]))
          );

        // Lastly, compute the stacked series, and decorate the returned object with additional fields.
        const flatData = Object.assign(
          // data
          d3.stack().keys(d3.range(variables.size))(d3.permute(sums, order)),
          {
            keys: Array.from(variables.keys()),
            totals: d3.permute(totals, order),
            names: d3.permute(names, order)
          }
        );

        this.flatData = flatData;
        console.log(flatData, "flatData");

        const keys = Array.from(variables.keys());

        const newData = sums.map((values, i) => {
          const d = { name: names[i] };
          for (const [j, v] of values.entries()) d[keys[j]] = v;
          return d;
        });

        this.newData = newData;

        const legend = svg => {
          const g = svg
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(flatData.keys.slice().reverse()) //data
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

          g.append("rect")
            .attr("x", -19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", color);

          g.append("text")
            .attr("x", -24)
            .attr("y", 9.5)
            .attr("dy", "0.35em")
            .text(d => d);
        };

        const x = d3
          .scaleBand()
          .domain(flatData.names)
          .range([margin.left, width - margin.right])
          .padding(0.1);

        const y = d3
          .scaleLinear()
          .domain([0, d3.max(flatData.totals)])
          .rangeRound([height - margin.bottom, margin.top]);

        const yAxis = g =>
          g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, "s"))
            .call(g => g.selectAll(".domain").remove());

        const xAxis = g =>
          g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .call(g => g.selectAll(".domain").remove());

        const color = d3
          .scaleOrdinal()
          .domain(flatData.keys)
          .range(
            d3
              .quantize(
                t => d3.interpolateSpectral(t * 0.8 + 0.1),
                flatData.length
              )
              .reverse()
          )
          .unknown("#ccc");

        svg
          .append("g")
          .selectAll("g")
          .data(flatData)
          .join("g")
          .attr("fill", (d, i) => color(flatData.keys[i]))
          .selectAll("rect")
          .data(d => d)
          .join("rect")
          .attr("x", (d, i) => x(flatData.names[i]))
          .attr("y", d => y(d[1]))
          .attr("height", d => y(d[0]) - y(d[1]))
          .attr("width", x.bandwidth());

        svg.append("g").call(xAxis);

        svg.append("g").call(yAxis);

        svg
          .append("g")
          .attr("transform", `translate(${width - margin.right},${margin.top})`)
          .call(legend);
      };

      getData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  color: #666;
  text-decoration: underline;
  margin: 40px 0 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<style>
/* 坐标轴背景线颜色 */
.x-axis line {
  stroke: #f1f1f1;
}
/* .y-axis line {
  stroke: #f1f1f1;
} */

.x-axis path {
  fill: none;
  shape-rendering: crispEdges;
}

.x-axis text {
  font-family: sans-serif;
  font-size: 11px;
}
</style>