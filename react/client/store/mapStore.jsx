import {observable, action} from 'mobx';
import { saveAs } from 'filesaver.js';

import Search from './search.jsx';
import Planet from '../space/lib/lib.jsx';

class MapStore {

	planet = new Planet(1.52368, 0.09340, 1.850, 286.502, 49.558, 19.373, 0);

	@observable mapRotation = 0;

	@observable sidebar = 0;

	@observable.ref geoJson = {
		type: 'FeatureCollection',
		features: []
	};

	openGeoJson(){
		var self = this;
		this.loadUserFile('.geojson,.json', function(file, content){
			//console.log(file);
			var geoJson = JSON.parse(content);
			var error = true;
			// "type":"FeatureCollection"
			if('type' in geoJson){
				if(geoJson.type == 'FeatureCollection'){
					self.setGeoJson(geoJson);
					error = false;
				}
			}
			if(error){
				console.log('The specified file does not contain valid GeoJson.');
			}
		});
	}

	saveGeoJson(){
		this.saveUserFile('map.geojson', JSON.stringify(this.geoJson, null, '\t'));
	}

	clearGeoJson(){
		this.geoJson = {
	  	type: 'FeatureCollection',
	  	features: []
	  }
	}

	setGeoJson(data){
		this.geoJson = data;
	}

	addPoint(data){
		this.geoJson.features.push(data);
	}

	setMap(map){
		this.map = map;
	}

	updateSidebar(){
		this.sidebar++;
	}

	updateMapRotation(rotation){
		if(Math.abs(this.mapRotation - rotation) >= 5){
			this.mapRotation = rotation;
		}
	}

	search(data){
		var self = this;
		new Search(data, function(newGeoJson){
			newGeoJson.forEach(function(el, i){
				self.geoJson.features.push(el);
			});
			self.updateSidebar();
			//console.log(newGeoJson);
		});
	}

	loadUserFile(extensions, f){
		var self = this;
		var i = document.createElement('input');
		i.accept = extensions;
		i.type = 'file';
    i.addEventListener('change', e => {
      var file = i.files[0];
      if(file){
      	var r = new FileReader();
      	r.onload = function(e){
      		var content = e.target.result;
      		f(file, content);
      	}
      	r.readAsText(file);
      }
    });
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
		i.dispatchEvent(evt);
	}
	
	saveUserFile(name, content){
		var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
		saveAs(blob, name);
	}
}

var mapStore = window.store = new MapStore();
export default mapStore;