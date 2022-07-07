import styled from 'styled-components';
import './App.css';
import { Title } from './MyCss';

//h1태그를 가상으로 만드는 것 
//JS 문법 --> let T = document.createElement("h1"); 
/*
const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: palevioletred;
`;
*/


function App() {
  return (
    <div>
      <Title>안녕</Title>
    </div>
    
  );
}

export default App;
