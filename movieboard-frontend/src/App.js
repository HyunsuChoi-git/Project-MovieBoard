import { Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Header from "./components/Header";
import AddForm from "./pages/movie/AddForm";
import Detail from "./pages/movie/Detail";
import LoginForm from "./pages/user/LoginForm";
import JoinForm from "./pages/user/JoinForm";
import UpdateForm from "./pages/movie/UpdateForm";
import Logout from "./pages/user/Logout";
import ModifyForm from "./pages/user/ModifyForm";
import Home from "./pages/movie/Home";
import { useEffect, useState } from "react";
import KakaoLogin from "./api/KakaoLoginApi";


function App() {

  const [keyword, setKeyword] = useState();
  const [login, setLogin] = useState(false);
  const [kakaoUser, setKakaoUser] = useState({
    email: '',
    gender: '',
    birth: ''
  });

  useEffect(()=>{
    if(localStorage.getItem('jwt') !== null){
      setLogin(true);
    };
  },[])

  return (
    <div className="App">
      <Header setKeyword={setKeyword} login={login}/>
      <Container>
        <Routes>
          <Route path='/' exact={true} element={<Home keyword={keyword}/>}/>
          <Route path='/addForm' exact={true} element={<AddForm login={login}/>}/>
          <Route path='moive/:id' exact={true} element={<Detail login={login}/>}/>
          <Route path='/loginForm' exact={true} element={<LoginForm setLogin={setLogin}/>}/>
          <Route path='/joinForm' exact={true} element={<JoinForm login={login} kakaoUser={kakaoUser}/>}/>
          <Route path='/modifyForm' exact={true} element={<ModifyForm login={login}/>}/>
          <Route path='/updateForm' exact={true} element={<UpdateForm login={login} />}/>
          <Route path='/logout' exact={true} element={<Logout setLogin={setLogin}/>} />
          <Route path='/kakaoLogin' exact={true} element={<KakaoLogin setLogin={setLogin} setKakaoUser={setKakaoUser}/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
