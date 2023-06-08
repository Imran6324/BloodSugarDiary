import { useState } from 'react'
import { useEffect } from 'react'
import RoutineChart from './RoutineChart'

const RoutineChartList = ({products}) => {
  const [breakfast, setBreakfast] = useState([
    {
    date: "",
    Bfast:"",
    Bpp:""
    }
])
const [lunch, setLunch] = useState([
  {
  date: "",
  Lfast:"",
  Lpp:""
  }
])
const [dinner, setDinner] = useState([
  {
  date: "",
  Dfast:"",
  Dpp:""
  }
])
  useEffect(() => {
    let b=[];
    let l=[];
    let d=[];
    products.forEach(i => {
      b.push({date:i.testDate,fast:i.Bfast,pp:i.Bpp})
      l.push({date:i.testDate,fast:i.Lfast,pp:i.Lpp})
      d.push({date:i.testDate,fast:i.Dfast,pp:i.Dpp})
    });
    setBreakfast(b);
    setLunch(l)
    setDinner(d)
  }, [products])
  
  return (
    <div className="container">
        <h1>BreakFast</h1>
    <div className="row" style={{display:'flex',flexWrap: 'wrap',justifyContent: 'center'}}>
        <div className="col" style={{textAlign:'center'}}><RoutineChart data={breakfast}/></div>
    </div>
    <h1>Lunch</h1>
    <div className="row" style={{display:'flex',flexWrap: 'wrap',justifyContent: 'center'}}>
        <div className="col" style={{textAlign:'center'}}><RoutineChart data={lunch}/></div>
    </div>
    <h1>Dinner</h1>
    <div className="row" style={{display:'flex',flexWrap: 'wrap',justifyContent: 'center'}}>
        <div className="col" style={{textAlign:'center'}}><RoutineChart data={dinner}/></div>
    </div>
  </div>
  )
}

export default RoutineChartList