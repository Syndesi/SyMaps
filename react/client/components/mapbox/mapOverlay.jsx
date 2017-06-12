import React from 'react';
import {observer} from 'mobx-react';

import Icon from '../icon.jsx';

@observer
export default class MapOverlay extends React.Component {

  zoomIn(){
    this.props.store.map.zoomIn();
  }

  zoomOut(){
    this.props.store.map.zoomOut();
  }

  setRotation(){
    var rotation = this.props.store.map.getRotation();
    rotation = 90 * (Math.floor(rotation/90) + 1);
    this.props.store.map.setRotation(rotation);
  }

  setPitch(){
    var toAngle = 0;
    var angle = this.props.store.map.getPitch();
    if(angle == 0){
      toAngle = 60;
    }
    this.props.store.map.setPitch(toAngle);
  }

  setLayer(){
    console.log('layer! xD');
  }

  render(){
    /*var rotation = this.props.store.mapRotation;
    var styleRotation = {
      transform: 'rotate('+rotation+'deg)',
      transition: 'none'
    };*/
    return (
      <div className="mapOverlay">
        <div className="buttonGroup left top">
          <div className="button" onClick={this.zoomIn.bind(this)}>
            <Icon icon="zoomIn" className="invert flex" />
          </div>
          <div className="button" onClick={this.zoomOut.bind(this)}>
            <Icon icon="zoomOut" className="invert flex" />
          </div>
          <div className="button" onClick={this.setRotation.bind(this)}>
            <Icon icon="compass" className="invert flex" rotation={this.props.store.mapRotation} />
          </div>
          <div className="button" onClick={this.setPitch.bind(this)}>
            <Icon icon="angle" className="invert flex" />
          </div>
          <div className="button" onClick={this.setLayer.bind(this)}>
            <Icon icon="layer" className="invert flex" />
          </div>
        </div>
      </div>
    );
  }
}