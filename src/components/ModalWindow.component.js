import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

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
            <Modal isOpen={modal} toggle={toggle}>
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
                            <ModalBody>
                                <div>Do you really want to delete it?</div>
                            </ModalBody>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}
                             id="buttonsModal">
                            <Button id="deleteButton"
                                    onClick={onClick}>
                                Delete
                            </Button>
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