import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import {reaction} from 'mobx';

import Marker from './marker.jsx';

export default class Map extends React.Component {

  componentDidMount(){
    var self = this;
    this.node = ReactDOM.findDOMNode(this);
    mapboxgl.accessToken = 'pk.eyJ1Ijoic29lcmVua2xlaW4iLCJhIjoiTFhjai1qcyJ9.JvmV0WKbbrySeFyHJQYRfg';
    var map = new mapboxgl.Map({
      container: this.node,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [10.8703515, 48.050783],
      zoom: 13
    });
    this.map = map;
    this.props.store.setMap(this);
    this.map.on('rotate', function(e){
      self.handleRotation();
    });
  }

  handleRotation(){
    this.props.store.updateMapRotation(this.map.getBearing());
  }

  say(){
    console.log('hi');
  }


  flyTo(coordinates){
    this.map.flyTo({center: coordinates});
  }

  zoomIn(){
    this.map.zoomIn();
  }

  zoomOut(){
    this.map.zoomOut();
  }

  setPitch(pitch){
    this.map.easeTo({
      pitch: pitch
    });
  }

  getPitch(){
    return this.map.getPitch();
  }

  setRotation(rotation){
    this.map.rotateTo(rotation);
  }

  getRotation(){
    return this.map.getBearing();
  }

  addMarker(coordinates, title, description){
    var data = {
      title: title,
      description: description
    };
    var el = document.createElement('div');
    el.className = "markerContainer";
    ReactDOM.render(<Marker store={this.props.store} data={data}/>, el);
    new mapboxgl.Marker(el, {offset: [0, 0]})
        .setLngLat([10.92767, 47.9222007])
        .addTo(this.map);
  }

  disableMapEvents(){
    this.map.scrollZoom.disable();
    this.map.boxZoom.disable();
    this.map.dragRotate.disable();
    this.map.dragPan.disable();
    this.map.keyboard.disable();
    this.map.doubleClickZoom.disable();
    this.map.touchZoomRotate.disable();
  }

  enableMapEvents(){
    this.map.scrollZoom.enable();
    this.map.boxZoom.enable();
    this.map.dragRotate.enable();
    this.map.dragPan.enable();
    this.map.keyboard.enable();
    this.map.doubleClickZoom.enable();
    this.map.touchZoomRotate.enable();
  }







  componentWillReceiveProps(newProps){
    //this.renderDialogContent(newProps);
  }

  componentWillUnmount(){
    //this.dialog.destroy();
  }

  render(){
    return <div className="map" />;
  }
}