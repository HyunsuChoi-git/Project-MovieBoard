import { useState } from 'react';

function App() {
  console.log("App 실행됨");

  let sample = [
    {id:1, name:"홍길동"},
    {id:2, name:"홍길순"},
    {id:3, name:"홍길훈"},
    {id:4, name:"홍길영"},
  ]

  const [users, setUsers] = useState(sample);

  const download = () => {
    const sample2 = [...sample, {id:5, name:"홍길자"}]
    setUsers(sample2);
  }

  //랜더링 시점 = 상태값 변경 => 레퍼런스 변경
  return (
    <div>
      <button onClick={download}>다운로드</button>
      {users.map(u=>
        <h1>
          {u.id} / {u.name}
        </h1>
      )}
    </div>
    
  );
}

export default App;
