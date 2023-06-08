import styled from 'styled-components'
import { cover1 } from '../../assets';
import { Chart } from 'primereact/chart';

const Graphs = () => {
  const data = {
    labels: ['1/13/2022', '2/13/2022', '3/13/2022', '4/13/2022', '5/13/2022', '6/13/2022', '7/13/2022'],
    datasets: [
        {
            label: 'First Dataset',
            data: [[0, 1], [1, 78], [2, 4], [3, 82], [4, 72]],
            fill: false,
            borderColor: '#4bc0c0'
        },
        {
            label: 'Second Dataset',
            data: [[0, 7], [1, 9], [2, 77], [3, 0], [4, 7]],
            fill: false,
            borderColor: '#565656'
        }
    ]
};

const options = {
  plugins: {
      title: {
          display: true,
          text: 'Breakfast',
          font: {
              size: 16
          }
      },
      legend: {
          position: 'bottom'
      }
  }
}

  return (
    <GraphComp>
        <h1>functionalities adding soon</h1>
        <Chart height='50%' width='50%' style={{background:'white',margin:'auto'}} type="line" data={data} options={options} />
    </GraphComp>
  )
}

export default Graphs;

const GraphComp = styled.div`
margin: auto;
     width: -webkit-fill-available;
    padding: 30px;
    background: url(${cover1});
    background-size: auto;
    background-repeat: no-repeat;
    @media (max-width: 940px) {
        padding: 5px 0px;
  }

`