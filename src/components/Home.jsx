import React, {Component} from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import Connection from "./Connection";
import Teleoperation from "./Teleoperation";
import RobotState from "./RobotState";
import Map from "./Map";

class Home extends Component {
    state = {
        
    }

    render() {
        return(
            <main>
                
                <Container>
                    <h1 className="text-center">Robot Control Page</h1>
                    <Row>
                        <Col>
                            <Connection /> 
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Teleoperation />
                            <Map></Map>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <RobotState />
                            
                        </Col>
                    </Row>
                    
                    
                </Container>

            </main>
        )
    }
}

export default Home; 
