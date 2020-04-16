import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import TextFit from 'react-textfit'

const ModalWindow = (props) => {
    const {
        buttonLabel,
        className,
        idButton,
        onClick
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    return (
        <div>
            <Button id = {idButton}  className={className} color="danger" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} centered={true}>
                <Container id="modelContainer">
                    <Row id="modalHead">
                        <Col md={11}/>
                        <Col md={1}>
                            <button
                                    id="closeWindow"
                                    className="deleteButton"
                                    onClick={toggle}/>
                            <label className = "closeModalPlace"
                                    htmlFor="closeWindow"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <TextFit mode="single"
                                     forceSingleModeWidth={true}
                                     id="modalBody">
                                Do you really want to delete it?
                            </TextFit>
                        </Col>
                    </Row>
                    <Row id="rowButtonsModal">
                        <Col id="colDeleteButton" md={6}>
                            <Button id="deleteButton"
                                    onClick={onClick}>
                                Delete
                            </Button>
                        </Col>
                        <Col id="colCancelButton" md={6}>
                            <Button id="cancelButton"
                                    onClick={toggle}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        </div>
    );
}

export default ModalWindow;