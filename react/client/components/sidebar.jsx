import React from 'react';
import {observer} from 'mobx-react';
import { Scrollbars } from 'react-custom-scrollbars';

import PlaceEntry from './placeEntry.jsx';
import Point from './geojson/point.jsx';
import Icon from './icon.jsx';

@observer
export default class Sidebar extends React.Component {

  demo(){
    console.log('demo');
  }

  open(){
    this.props.store.openGeoJson();
  }

  save(){
    this.props.store.saveGeoJson();
  }

  clear(){
    this.props.store.clearGeoJson();
  }

  render() {
    var geoJson = this.props.store.geoJson;
    var entrys = [];
    var store = this.props.store;
    geoJson.features.map(function(feature, index){
      entrys.push(<Point store={store} data={feature} key={index} />);
    });
    var full = {
      width: '100%',
      height: '100%'
    };
    return (
      <div className="sidebar" label={this.props.store.sidebar}>
        <div className="bar">
          <div className="button" onClick={this.save.bind(this)} >
            <Icon className="flex invert" icon="save" />
          </div>
          <div className="button" onClick={this.open.bind(this)} >
            <Icon className="flex invert" icon="open" />
          </div>
          <div className="button" onClick={this.clear.bind(this)} >
            <Icon className="flex invert" icon="delete" />
          </div>
          <div className="button" onClick={this.demo.bind(this)} >
            <Icon className="flex invert" icon="share" />
          </div>
          <div className="button" onClick={this.demo.bind(this)} >
            <Icon className="flex invert" icon="settings" />
          </div>
        </div>
        <div className="entrys">
          <Scrollbars style={{width: '100%', height: '100%'}}>
            {entrys}
          </Scrollbars>
          <div className="shadow" />
        </div>
      </div>
    );
  }
}