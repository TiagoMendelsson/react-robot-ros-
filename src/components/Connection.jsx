import React, {Component} from "react";
import { Alert } from "react-bootstrap";


class Connection extends Component {
    state = {connected : false, ros: null} ;
    

    constructor () {
        super();
        this.init_connection();
    }
    
    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("connection established !");
            this.setState({connected:true})
        })
        this.state.ros.on("close", () => {
            console.log("connection is closed!");
            this.setState({connected: false});

            setTimeout (() => {
                try{
                    this.state.ros.connect("ws://10.0.2.15:9090");
                }catch (error) {
                    console.log ("connection problem");
                }
            }, 5000);

        })
        try{
            this.state.ros.connect("ws://10.0.2.15:9090");
        } catch (error) {
            console.log("connection problem");
        }
        
    }

    render( ) {
        return (
            <div>
                <Alert className="text-center m-3" 
                variant={this.state.connected ? "success": "danger"}>
                    {this.state.connected ? "Robot Connected": "Robot Disconnected"} 
                </Alert>
            </div>
        )
    }
}

export default Connection; 