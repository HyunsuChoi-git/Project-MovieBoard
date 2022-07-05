
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState(0);
  const [init, setInit] = useState(0);

  const download = () => {
    let downloadData = 5;
    setData(downloadData);
  }

  useEffect(()=>{
   console.log("useEffact 실행됨");
   download();
  }, [init]);


  return (
    <div>
      <button onClick={() => { setInit(data); }}>초기화</button>
      <h1>데이터 : {data}</h1>
      <button onClick={() => { setData(data+1); }}>더하기</button>
    </div>
    
  );
}

export default App;
