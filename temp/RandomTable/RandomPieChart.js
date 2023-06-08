import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const dataSource = {
chart: {
caption: "Random Readings Chart",
plottooltext: "<b>$percentValue</b>",
showlegend: "1",
showpercentvalues: "1",
legendposition: "bottom",
usedataplotcolorforlabels: "1",
theme: "fusion"
},
data: [
{
label: "High",
value: "30"
},
{
label: "Low",
value: "57"
},
{
label: "Normal",
value: "77"
}
]
};

const RandomPieChart = () => {
return (
<ReactFusioncharts
type="doughnut2d"
width="100%"
height="500"
dataFormat="JSON"
dataSource={dataSource}
/>
);
}
export default RandomPieChart