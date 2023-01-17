import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter,Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";

class Body extends Component {
    render(){
        
        return(
        
            <Container>
                
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/about"} element={<About/>}/>
                    </Routes>
                </BrowserRouter>
                
            </Container>
                
                    
                    
                
    
        
        )
       
    }
}

export default Body;