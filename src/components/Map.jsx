import React, {Component} from "react";
//import ROS2D from "ros2d/build/ros2d";



class Map extends Component {
    state = {
        ros: null,
    };

    constructor() {
        super();
        this.view_map= this.view_map.bind(this);
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

    componentDidMount(){
        this.init_connection();
        console.log("Map: componentDidMount" + this.state.ros);
        this.view_map();
    }

    view_map () {
        /*
        var viewer = new window.ROS2D.Viewer({
            divID:"map",
            widh: 640,
            height: 640,
        });

        var navClient = new window.NAV2D.OccupancyGridClientNav({
            ros: this.state.ros,
            rootObject: viewer.scene,
            viewer: viewer,
            serverName:"/move_base",
            withOrientation: true,
        });*/

        var viewer = new window.ROS2D.Viewer({
            divID : 'map',
            width : 600,
            height : 500
        });
    
        // Setup the map client.
        var gridClient = new window.ROS2D.OccupancyGridClient({
            ros: this.state.ros,
            rootObject: viewer.scene,
            viewer: viewer,
            serverName:"/move_base",
            withOrientation: true,
        });
        // Scale the canvas to fit to the map
        gridClient.on('change', function(){
            viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
        });

        
    }
    render () {
        return(
         <div>
           <div id="map"> </div>
         </div>   
        );
    }
}

export default Map;