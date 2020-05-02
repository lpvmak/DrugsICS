import React, { useState } from 'react';
import { Button, Modal} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import TextFit from 'react-textfit'
import {Text} from "../containers/Language";

const ModalWindow = (props) => {
    const {
        buttonLabel,
        className,
        idButton,
        onClick,
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    return (
        <div>
            <Button id = {idButton}  className={className} color="danger" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} centered={true}>
                <Container id="modal-container">
                    <Row id="modal-head">
                        <Col md={11}/>
                        <Col md={1}>
                            <button
                                    id="close-window"
                                    className="delete-button"
                                    onClick={toggle}/>
                            <label className = "modal-close__place"
                                    htmlFor="close-window"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <TextFit mode="single"
                                     forceSingleModeWidth={true}
                                     id="modal-body">
                                <Text tid="confirmDelete" />
                            </TextFit>
                        </Col>
                    </Row>
                    <Row id="modal__buttons">
                        <Col id="modal-delete" md={6}>
                            <Button id="modal-delete__button"
                                    onClick={onClick}>
                                <Text tid="delete" />
                            </Button>
                        </Col>
                        <Col id="modal-cancel" md={6}>
                            <Button id="modal-cancel__button"
                                    onClick={toggle}>
                                <Text tid="cancel" />
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        </div>
    );
}

export default ModalWindow;