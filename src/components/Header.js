import React from 'react';
import styled from 'styled-components';

//재사용을 위한 하나의 컴포넌트를 생성할 때
//css와 js 파일이 하나로 되어있어 관리가 편하다!
//디자인도 컴포넌트화된다!
//js에 디자인을 넣으면서 css문법을 가져다 쓸 수 있다.
//디자인 적용시에 <태그>로써 사용할 수 있다.

const HeaderList = styled.div`
    border: 1px solid black;
    height: 300px;
`

const Header = () => {
    return (
        <HeaderList>
            <ul>
                <li>소개</li>
                <li>News</li>
            </ul>
        </HeaderList>
    );
};

export default Header;