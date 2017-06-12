import React from 'react';
import {observable} from "mobx";
import {observer} from "mobx-react";
import Radium from "radium";
import Color from "color";

import Icon from '../icon.jsx';

@observer
@Radium
export default class Point extends React.Component {  

  @observable active = false;
  @observable edit = false;

  getCoords(){
    return this.props.data.geometry.coordinates;
  }

  openColorPanel(){
    console.log('Color panel opened');
  }

  share(){
    console.log('share');
  }

  toggleEdit(){
    console.log('toggle edit');
    this.edit = !this.edit;
  }

  flyTo(){
    //var lnglat = this.state.place.coordinate;
    var coords = this.getCoords();
    this.props.store.map.flyTo([coords[0], coords[1]]);
  }

  route(){
    console.log('route');
  }

  toggleActive(){
    this.active = !this.active;
    this.props.store.updateSidebar();
  }

  render(){
    var data = this.props.data;
    var coords = this.getCoords();
    var classes = 'placeEntry';
    var toggleIcon = 'downSmall';
    if(this.active){
      classes += ' active';
      toggleIcon = 'up';
    }

    var colorFill = this.props.data.properties['marker-color'];
    var colorBackground = '#fff';
    var c = Color(colorFill);
    var lum = c.luminosity();
    if(lum > 0.5){
      classes += ' light';
    } else {
      classes += ' dark';
    }

    var placeEntry = {
      backgroundColor: null
    };

    var iconColor = {
      fill: colorFill,
      fillHover: colorBackground
    };
    var iconSize = {
      width: '100%',
      height: '100%'
    };

    var button = {
      transition: 'all 0.2s ease-in-out',
      ':hover': {
        backgroundColor: colorFill
      }
    };

    if(this.active){
      placeEntry.backgroundColor = colorFill;
    }

    var elevation = '';
    if(!(typeof coords[2] === 'undefined')){
      elevation = 'Elevation: '+coords[2].toFixed(0);
    }

    return (
      <div className="row">
        <div className={classes} style={placeEntry}>
          <div className="header">
            <div className="toggleActive" onClick={this.toggleActive.bind(this)} >
              <Icon icon={toggleIcon} />
            </div>
            <p className="title">{data.properties.title}</p>
            <p className="address">{data.properties.address}</p>
          </div>
          <div className="content">
            <div className="bar">
              <div className="button" onClick={this.route.bind(this)} style={button} key="0">
                <Icon icon="route" colors={iconColor} />
              </div>
              <div className="button" onClick={this.openColorPanel.bind(this)} style={button} key="1">
                <Icon icon="fill" colors={iconColor} />
              </div>
              <div className="button" onClick={this.toggleEdit.bind(this)} style={button} key="2">
                <Icon icon="edit" colors={iconColor} />
              </div>
              <div className="button" onClick={this.flyTo.bind(this)} style={button} key="3">
                <Icon icon="center" colors={iconColor} />
              </div>
              <div className="button" onClick={this.share.bind(this)} style={button} key="4">
                <Icon icon="share" colors={iconColor} />
              </div>
            </div>
            <p>{data.properties.description}</p>
            <p className="elevation">{elevation}</p>
            <p className="gps">GPS: {coords[1].toFixed(7)}, {coords[0].toFixed(7)}</p>
          </div>
        </div>
      </div>
    );
  }
}