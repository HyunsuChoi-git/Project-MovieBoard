import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledItemBoxDic = styled.div`
    display: flex; 
    /* display: flex --> div간의 정렬을 할 수 있도록 해줌*/
    justify-content: space-between;

    border: 1px solid black;
    padding: 10px;
    height: 100px;
    margin: 20px;
    align-items: center;
    /* 세로정렬 */
`;

const ListPage = () => {

    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({
        id:'',
        title:'',
        content:'',
});

    useEffect(() => {
        setPosts([
            {id:1, title:"글제목입니다1", content:"글내용입니다1"},
            {id:2, title:"글제목입니다2", content:"글내용입니다2"},
            {id:3, title:"글제목입니다3", content:"글내용입니다3"},
            {id:4, title:"글제목입니다4", content:"글내용입니다4"},
        ]);
        setPost({...post, id:5});
    },[]);
    
    const handleWrite = (e) => {
        e.preventDefault();
        // form태그는 submit되면 브라우저는 refresh되는 성질이 있다.
        // 페이지가 refresh되는 것을 막기 위해 쓰는 함수. 브라우저 고유의 동작을 막는 함수이다.

        //ListPage 의 setPosts에 제목을 담아줌
        post.title !== '' && setPosts([...posts, post]);
        post.title !== '' &&     setPost({
                id:post.id+1,
                title:'',
                content:'',
            });
    };

    const handleChnage = (e) => {
        console.log(e.target.value);
        setPost({...post, [e.target.name]:e.target.value});
        /* computed property names 문법 : 키값 동적할당 '[]' */ 
    };    

    const hadleDelete = (e) => {
        const newPosts = posts.filter((post)=> { return post.id != e.target.name;});
        setPosts(newPosts);
    };
    
    return (
        <div>
            <h1>댓글달기</h1>
            <form onSubmit={handleWrite}>
                <input type="text" value={post.title} placeholder="제목을 입력하세요.." name="title" onChange={(e) => handleChnage(e)}/>
                <input type="text" value={post.content} placeholder="내용을 입력하세요.." name="content" onChange={(e) => handleChnage(e)}/>
                <button type="submit">글쓰기</button>
            </form>
            <hr/>
            {posts.map((post) =>
                <StyledItemBoxDic key={post.id}>
                    <div>No : {post.id} ㅣ Title : {post.title} ㅣ Content : {post.content}</div>
                    <button name={post.id} onClick={(e) => hadleDelete(e)}>삭제</button>
                </StyledItemBoxDic> )}
        </div>
    );
};

export default ListPage;