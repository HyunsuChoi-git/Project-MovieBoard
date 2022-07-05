import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // let number = 1; //상태값 아님
  const [number, setNumber] = useState(1);  // 상태값임
  // 리액트가 상태값이 변경된 것을 알아차릴 수 있도록 React의 hooks 라이브러리 사용
  // useState를 이용해 값을 number에 넣어줌.
  // 값변경 시에는 setNumber을 이용해서 리엑트한테 number값 변경을 요청하는 형태임.
  // setNumber가 호출되면 리엑트는 랜더링을 실시함.

  const add = () => {
    setNumber(number+1); 
    console.log('add', number);
  };

  //랜더링 시점 = 상태값 변경
  return (
    <div>
      <div>숫자 : {number}</div>
      <button onClick={add}>더하기</button>
    </div>
    
  );
}

export default App;
