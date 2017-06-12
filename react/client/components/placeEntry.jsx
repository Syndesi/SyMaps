import React from 'react';

import Icon from './icon.jsx';

export default class PlaceEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      place: this.props.store.mapData[this.props.placeId]
    };
  }  

  openColorPanel(){
    console.log('Color panel opened');
  }

  share(){
    console.log('share');
  }

  setImage(){
    console.log('set image');
  }

  flyTo(){
    var lnglat = this.state.place.coordinate;
    this.props.store.map.flyTo([lnglat[0], lnglat[1]]);
    console.log('fly to');
  }

  route(){
    console.log('fly to');
  }

  render(){
    return (
      <div className="row">
        <div className="placeEntry">
          <p className="title">{this.state.place.title}</p>
          <p className="address">{this.state.place.address}</p>
          <div className="content">
            <div className="bar">
              <div className="button" onClick={this.route.bind(this)} >
                <Icon icon="route"/>
              </div>
              <div className="button" onClick={this.openColorPanel.bind(this)} >
                <Icon icon="fill"/>
              </div>
              <div className="button" onClick={this.setImage.bind(this)} >
                <Icon icon="image"/>
              </div>
              <div className="button" onClick={this.flyTo.bind(this)} >
                <Icon icon="center"/>
              </div>
              <div className="button" onClick={this.share.bind(this)} >
                <Icon icon="share"/>
              </div>
            </div>
            <p>{this.state.place.description}</p>
            <p className="gps">Lng: {this.state.place.coordinate[0]}, Lat: {this.state.place.coordinate[1]}</p>
          </div>
        </div>
      </div>
    );
  }
}