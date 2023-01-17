import React, {Component} from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import Connection from "./Connection";
import Teleoperation from "./Teleoperation";

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
                        </Col>
                        <Col>
                            <h1> MAP</h1>
                            <p>região que sera usada pro display do map</p>
                        </Col>
                    </Row>
                    
                    
                </Container>

            </main>
        )
    }
}

export default Home; 
