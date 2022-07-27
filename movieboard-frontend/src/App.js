import { Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Header from "./components/Header";
import AddForm from "./pages/movie/AddForm";
import Detail from "./pages/movie/Detail";
import LoginForm from "./pages/user/LoginForm";
import JoinForm from "./pages/user/JoinForm";
import UpdateForm from "./pages/movie/UpdateForm";
import Home from "./pages/movie/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path='/' exact={true} element={<Home />}/>
          <Route path='/addForm' exact={true} element={<AddForm/>}/>
          <Route path='moive/:id' exact={true} element={<Detail />}/>
          <Route path='/loginForm' exact={true} element={<LoginForm/>}/>
          <Route path='/joinForm' exact={true} element={<JoinForm />}/>
          <Route path='/updateForm' exact={true} element={<UpdateForm />}/>
          <Route path='/deleteForm' exact={true} element={''}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
