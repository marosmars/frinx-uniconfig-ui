import React, { Component } from 'react';
import {Button, Form, Modal, Row, Col, Tabs, Tab} from "react-bootstrap";
import { mountCliTemplate, mountNetconfTemplate } from "../../../constants";


class MountModal extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: this.props.show,
            mountCliForm: JSON.parse("[" + mountCliTemplate + "]"),
            mountNetconfForm: JSON.parse("[" + mountNetconfTemplate + "]"),
            mountingDevice: false,
            mountType: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            show: nextProps.show
        })
    }

    componentDidMount() {
        this.setState({
            mountCliForm: JSON.parse("[" + mountCliTemplate + "]")
        });
    }

    mountDevice() {
        console.log(document.getElementById(`mount${this.state.mountType}Input-port`).value);
    }

    changeMountType(which) {
        this.setState({
            mountType: which
        })
    }


    handleClose() {
        this.setState({ show: false });
    }

    render() {
        return (
            <Modal size="lg" show={this.state.show} onHide={this.handleClose} >
                <Modal.Header>
                    <Modal.Title>Mount Device</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{padding: "30px"}}>
                    <Tabs onSelect={this.changeMountType.bind(this)} style={{marginBottom: "20px"}} defaultActiveKey="Cli" id="mountTabs">
                        <Tab eventKey="Cli" title="CLI">
                            <Form>
                                <Row>
                                    {Object.entries(this.state.mountCliForm[0]).map((function (item, i) {
                                        return (
                                            <Col sm={6}>
                                                <Form.Group controlId={`mountCliInput-${item[0].split(":").pop()}`}>
                                                    <Form.Label>{item[0].split(":").pop()}</Form.Label>
                                                    <Form.Control type="input" defaultValue={item[1]}/>
                                                    <Form.Text className="text-muted">
                                                        Some description.
                                                    </Form.Text>
                                                </Form.Group>
                                            </Col>
                                        )
                                    }))}
                                </Row>
                            </Form>
                        </Tab>
                        <Tab eventKey="Netconf" title="Netconf">
                            <Form>
                                <Row>
                                    {Object.entries(this.state.mountNetconfForm[0]).map((function (item, i) {
                                        return (
                                            <Col sm={6}>
                                                <Form.Group controlId={`mountNetconfInput-${item[0].split(":").pop()}`}>
                                                    <Form.Label>{item[0].split(":").pop()}</Form.Label>
                                                    <Form.Control type="input" defaultValue={item[1]}/>
                                                    <Form.Text className="text-muted">
                                                        Some description.
                                                    </Form.Text>
                                                </Form.Group>
                                            </Col>
                                        )
                                    }))}
                                </Row>
                            </Form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.mountDevice.bind(this)}>
                        {this.state.mountingDevice ? (<i className="fas fa-spinner fa-spin"/>) : null}
                        {this.state.mountingDevice ? "    Mounting..." : "Mount Device"}
                    </Button>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default MountModal;