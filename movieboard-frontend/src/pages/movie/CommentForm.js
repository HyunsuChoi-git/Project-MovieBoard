import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from "styled-components";

const StyledButton = styled(Button)`  // 버튼
    height: 32px;       // 버튼크기
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    position: relative;
    float: right;
    padding-top: 2px;   // text위치
`;

const MydModalWithGrid = (props) => {

    return(
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                감상평 작성
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">등록</Button>
                    <Button variant="primary" onClick={props.onHide} >닫기</Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
}


const CommentForm = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const { id } = props;

    return (
        <div>
            <StyledButton variant="primary" name={'update'} onClick={() => setModalShow(true)}>comment</StyledButton>
            <MydModalWithGrid show={modalShow} movie={props.movie} onHide={() => setModalShow(false)} /> 
        </div>
    );
};

export default CommentForm;