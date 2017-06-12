import React from 'react';

import Icon from '../icon.jsx';

export default class Marker extends React.Component {

  onMouseOver(e){
    this.props.store.map.disableMapEvents();
  }

  onMouseLeave(e){
    this.props.store.map.enableMapEvents();
  }

  render(){
    return (
      <div className="marker" onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} >
        <Icon icon="marker" />
        <p className="title">{this.props.data.title}</p>
        <p className="description">{this.props.data.description}</p>
      </div>
    );
  }
}