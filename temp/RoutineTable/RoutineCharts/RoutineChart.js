// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// STEP 2 - Chart Data


// STEP 3 - Creating the JSON object to store the chart configurations


const chartConfigs2 = {
  type:"msspline",
  width: '100%',
  height: 400,
  dataFormat: 'json',
  dataSource: {chart: {
    caption: "Blood Sugar Report visualised Before and After meal",
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
      category: [
        {
          label: "1/1/2022"
        },
        {
          label: " 21/1/2022"
        },
        {
          label: " 31/1/2022"
        },
        {
          label: " 1/3/2022"
        },
        {
          label: " 11/4/2022"
        },
        {
          label: " 18/4/2022"
        },
        {
          label: " 1/5/2022"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Before meal",
      data: [
        {
          value: "55"
        },
        {
          value: "45"
        },
        {
          value: "52"
        },
        {
          value: "29"
        },
        {
          value: "48"
        },
        {
          value: "28"
        },
        {
          value: "32"
        }
      ]
    },
    {
      seriesname: "After meal",
      data: [
        {
          value: "50"
        },
        {
          value: "30"
        },
        {
          value: "49"
        },
        {
          value: "22"
        },
        {
          value: "43"
        },
        {
          value: "14"
        },
        {
          value: "31"
        }
      ]
    }
  ]}
};
// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const RoutineChart=()=>{
    return (<ReactFC {...chartConfigs2} />);
}
// class RoutineChart extends React.Component {
//   render() {
//     return (<ReactFC {...chartConfigs} />);
//   }
// }


export default RoutineChart