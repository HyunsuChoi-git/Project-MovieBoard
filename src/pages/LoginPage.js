import React from 'react';
import Login from '../components/login/Login';
import { useParams, useNavigate} from 'react-router-dom';


// 페이지는 컴포넌트들의 조합니다.
// 컴포넌트를 만들어놓으면 재사용할 수 있다.

const LoginPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    return (
        <div>
            {id}
            <Login/>
            <button onClick={() => navigate(-1)}>뒤로가기</button>
            <button onClick={() => navigate("/")}>홈으로</button>
        </div>
    );
};

export default LoginPage;