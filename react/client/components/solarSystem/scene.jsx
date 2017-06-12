import React from 'react';
import ReactDOM from 'react-dom';
import {reaction} from 'mobx';

import React3 from 'react-three-renderer';
import * as THREE from 'three';

export default class SolarSystem extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    this.state = {
      time: 0,
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        time: this.state.time + 0.01,
        cubeRotation: new THREE.Euler(
          0.5 * Math.sin(this.state.time),
          -this.state.time,
          0
        ),
      });
    };
  }

  render() {
    const width = 298; // canvas width
    const height = 198; // canvas height
    return(<p>scene</p>);
    /*
    return (
      <React3 mainCamera="camera" width={width} height={height} onAnimate={this._onAnimate} alpha={false} >
        <scene>
          <perspectiveCamera name="camera" fov={75} aspect={width / height} near={0.1} far={1000} position={this.cameraPosition} />
          <mesh rotation={this.state.cubeRotation} >
            <sphereGeometry radius={2.5} widthSegments={32} heightSegments={16} />
            <meshBasicMaterial color={0x247CFF} wireframe />
          </mesh>
        </scene>
      </React3>
    );*/
  }
}