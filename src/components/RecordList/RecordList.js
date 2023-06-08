import styled from 'styled-components'
import { cover1, coverrev } from '../../assets';
import RecordTable from './RecordTable';
const RecordList = () => {
  return (
    <ListComp>
       <div className="cont">
            <h1 className='mb-5'>All Record Section</h1> 
            <RecordTable/>   
        </div>
    </ListComp>
  )
}

export default RecordList
const ListComp = styled.div`
     width: -webkit-fill-available;
    padding: 30px;
    background: url(${cover1});
    background-size: auto;
    background-repeat: no-repeat;
    @media (max-width: 940px) {
        padding: 5px 0px;
  }
  
    background: url(${coverrev});
    background-size: cover;
    background-position: center;
    .cont{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1em 2em;
        margin: auto;
    }
    @media (max-width: 780px) {
       .cont,.for{
        padding: 2em 0.5em;
       }
        }`