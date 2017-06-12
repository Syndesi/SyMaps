import React from 'react';
import {observer} from 'mobx-react';

import Map from './mapbox/map.jsx';
import MapOverlay from './mapbox/mapOverlay.jsx';
import Sidebar from './sidebar.jsx';
import Bar from './bar.jsx';
import SolarSystem from './solarSystem/scene.jsx';
require('../style/main.scss');


@observer
export default class App extends React.Component {

  render() {
    return (
      <div id="app">
      	<Map store={this.props.store} />
      	<MapOverlay store={this.props.store} />
      	<div className="overlay">
      		<div className="solarSystem">
      			<SolarSystem store={this.props.store} />
      		</div>
      		<Bar store={this.props.store} />
      		<Sidebar store={this.props.store} />
      	</div>
      </div>
    );
  }
}