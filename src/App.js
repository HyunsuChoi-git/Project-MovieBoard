import { createRef, useMemo, useRef, useState } from 'react';
import './App.css';

function App() {

  const myRef = useRef(null);

  const [list, setList] = useState([{id:1,name:"길동"}, {id:2,name:"꺽정"}])

  // list 길이 만큼 myRef를 생성하여 리스트에 저장
  const myRefs = Array.from({length:list.length}).map(() => createRef());

  return (
    <div>
      <button onClick={()=> {
        console.log(myRef);
        console.log(myRef.current);  // <div>박스</div>
        console.log(list);
        myRef.current.style.backgroundColor='red';
        myRefs[0].current.style.backgroundColor='green';
        myRefs[1].current.style.backgroundColor='yellow';
      }}>색변경</button>
      <div ref={myRef}>박스</div>

      {list.map((user, index)=>(
        <h1 ref={myRefs[index]}>{user.id}. {user.name}</h1>
      ))}
    </div>



    
  );
}

export default App;
