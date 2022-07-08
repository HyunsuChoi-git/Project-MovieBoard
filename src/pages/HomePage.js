import React, { useEffect, useState } from 'react';
import Home from '../components/home/Home';

const HomePage = () => {


    const [boards, setBoards] = useState([]);
    const [user, setUser] = useState({id:'1', name:'hera'});


    useEffect(() => {
        let data = [
            {id:1, title:"제목1", content:"내용1"},
            {id:2, title:"제목2", content:"내용2"},
            {id:5, title:"제목4", content:"내용3"},

        ]

        setBoards([...data]);
    }, [])


    return (
        <div>
            <Home boards={boards} setBoards={setBoards} user={user} setUser={setUser}/>
        </div>
    );
};

export default HomePage;