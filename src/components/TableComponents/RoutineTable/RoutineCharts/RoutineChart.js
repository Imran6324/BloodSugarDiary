import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { React,useEffect,useState } from "react";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const RoutineChart=({data})=>{
  const [date, setDate] = useState([{
    label:""
  }])
  const [fast, setFast] = useState([{
    value:""
  }])
  const [pp, setPp] = useState([{
    value:""
  }])
  useEffect(() => {
    let l=[]
    let p =[]
    let f=[]
    // console.log("data",data)
       data.forEach(i => { 
        if(i.fast !=="" && i.pp!==""){
          l.push({label:i.date})
          p.push({value:i.pp})
          f.push({value:i.fast})
        }
      });
    setDate(l)
    setFast(f)
    setPp(p)
  }, [data])

  const chartConfigs = {
    type:"msspline",
    width: '100%',
    height: 400,
    dataFormat: 'json',
    dataSource: {chart: {
      caption: "Report visualised Before and After meal",
      yaxisname: "Readings in mg/dL",
      xAxisName: "Dates",
      subcaption: "In 1 mg/dL = 0.0555 mmol/L",
      numdivlines: "3",
      showvalues: "0",
      legenditemfontsize: "15",
      legenditemfontbold: "1",
      plottooltext: "<b>$dataValue</b> mg/dL $seriesName on $label",
      theme: "fusion"
    },
    categories: [
      {
        category: date
      }
    ],
    dataset: [
      {
        seriesname: "Before meal",
        data: fast
      },
      {
        seriesname: "After meal",
        data: pp
      }
    ]}
  };
  
    return (<ReactFC {...chartConfigs} />);
}



export default RoutineChart