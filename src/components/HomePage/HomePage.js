import styled from 'styled-components'
import FeaturesCard from './FeaturesCard';
import { add_file,add_post,everyday,opened_tabs,
  random_thoughts,throw_away ,
 } from '../../assets';
 
const features=[{
  id:5,
  title:' All Records',
  cover:`${opened_tabs}`,
  disc:'View list of saved records.',
  link:'/listrecords'
 },{
  id:1,
  title:'Add Test Result',
  cover:`${add_file}`,
  disc:'Add a new test result in record.',
  link:'/addreadings'
 },
 {
  id:2,
  title:'Edit Records',
  cover:`${add_post}`,
  disc:'Edit and Update records.',
  link:'/listrecords'
 },
 {
  id:6,
  title:'Routine Records',
  cover:`${everyday}`,
  disc:'Get complete insight of routine records',
  link:'/routine_record'
 },
 {
  id:3,
  title:'Delete Records',
  cover:`${throw_away}`,
  disc:'Delete a record from database.',
  link:'/listrecords'
 },       
 {
  id:7,
  title:'Random Record',
  cover:`${random_thoughts}`,
  disc:'Get complete insight of random records.',
  link:'/random_record'
 }]
const HomePage = () => {
   
    return (
        <WelcomeCom>
          <FeaturesCard features={features}/>
        </WelcomeCom>
      );
}

export default HomePage
const WelcomeCom = styled.div`
    width: -webkit-fill-available;
    
`