import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import { useEffect , useState} from "react";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);
const chartConfig={
    caption: "Random Readings Chart",
    plottooltext: "<b>$percentValue</b>",
    showlegend: "1",
    showpercentvalues: "1",
    legendposition: "bottom",
    usedataplotcolorforlabels: "1",
    theme: "fusion"
}

const RandomPieChart = ({products,selectedRecordId}) => {
    const [graphData, setgraphData] = useState([
                                                {
                                                label: "High",
                                                value: 0
                                                },
                                                {
                                                label: "Low",
                                                value: 0
                                                },
                                                {
                                                label: "Normal",
                                                value:0
                                                }
                                            ])
    useEffect(() => {
        let p=0;
        let j=0;
        let k=0;
      products.forEach(i=>{
        if(i.result>140 && i.result!=='')
            p++;
        else if(i.result>=99 && i.result<=140 && i.result!=='')
            j++;
        else if(i.result<99)
            k++
      })
      setgraphData([
        {
        label: "High",
        value: `${p}`
        },
        {
        label: "Low",
        value: `${k}`
        },
        {
        label: "Normal",
        value:`${j}`
        }
    ])
    }, [products])
    
  
return (
    <ReactFusioncharts
        type="doughnut2d"
        width="100%"
        height="500"
        dataFormat="JSON"
        dataSource={{chart: chartConfig,data:graphData}}
    />
);
}
export default RandomPieChart