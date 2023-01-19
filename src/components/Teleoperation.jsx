import React, { Component } from "react";
import Connection from "./Connection";
import { Joystick } from "react-joystick-component";


class Teleoperation extends Component {
    state = { ros: null };

    constructor () {
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this)
        this.handleStop = this.handleStop.bind(this)
    }
    
    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log("TIAGO" + this.state.ros);

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

    
    handleMove(event) {
        console.log("handle move");

        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name:"/cmd_vel",
            messageType:"geometry_msgs/Twist"
        });
        
        var Twist = new window.ROSLIB.Message({
            linear:{
                x:event.y / 5,
                y:0,
                z:0,
            },
            angular:{
                x:0,
                y:0,
                z:-event.x / 5,
            },
            
        });
        console.log(Twist)
        cmd_vel.publish(Twist);
    }
    handleStop(event) {
        console.log("handle stop");
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name:"/cmd_vel",
            messageType:"geometry_msgs/Twist"
        });
        
        var Twist = new window.ROSLIB.Message({
            linear:{
                x:0,
                y:0,
                z:0,
            },
            angular:{
                x:0,
                y:0,
                z:0,
            },
            
        });
        console.log(Twist)
        cmd_vel.publish(Twist);


    }

    render() {
        return (
            <div>
                <Joystick
                    size={100}
                    baseColor="#EEEEEE"
                    stickColor="#BBBBBB"
                    move={this.handleMove}
                    stop={this.handleStop}>
                
                </Joystick>
            </div>
        )
    }
}

export default Teleoperation;