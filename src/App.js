import { useMemo, useState } from 'react';
import './App.css';

function App() {

  const [list, setList] = useState([1,2,3]);
  const [str, setStr] = useState("합계");

  const getAddResult = () => {
    let sum = 0;
    list.forEach(i => sum = sum + i);
    console.log(sum+"1");
    return sum;
  }

  const addResult = useMemo(()=>getAddResult(), [list]);


  return (
    <div>
      <button onClick={() => {
        setList([...list, 10]);
      }}>리스트 값 추가</button>
      <button onClick={() => {
        setStr("최종 합계");
      }}>값 추가 종료</button>
      {list.map(n => <h1>{n}</h1>)}
      <div>{str}: {addResult}</div>
    </div>
    
  );
}

export default App;
