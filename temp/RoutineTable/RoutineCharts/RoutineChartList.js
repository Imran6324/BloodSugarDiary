import RoutineChart from './RoutineChart'

const RoutineChartList = () => {
  return (
    <div class="container">
        <h1>BreakFast</h1>
    <div class="row" style={{display:'flex',flexWrap: 'wrap',justifyContent: 'center'}}>
        <div class="col" style={{textAlign:'center'}}><RoutineChart/></div>
    </div>
    <h1>Lunch</h1>
    <div class="row" style={{display:'flex',flexWrap: 'wrap',justifyContent: 'center'}}>
        <div class="col" style={{textAlign:'center'}}><RoutineChart/></div>
    </div>
    <h1>Dinner</h1>
    <div class="row" style={{display:'flex',flexWrap: 'wrap',justifyContent: 'center'}}>
        <div class="col" style={{textAlign:'center'}}><RoutineChart/></div>
    </div>
  </div>
  )
}

export default RoutineChartList