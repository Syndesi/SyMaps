import accounts from './accounts.json';

export default class Search {

	plainData = '';
	defaultHeader = ['title', 'address', 'description', 'icon', 'color'];
	header = [];
	search = [];
	loadedElements = 0;
	elementsToLoad = 0;

	constructor(data, returnGeoJson){
		this.plainData = data;
		this.returnGeoJson = returnGeoJson;
		this.parsePlainData();
	}

	parsePlainData(){

		var obj = [];
		var lines = this.plainData.split("\n");
		var self = this;

		var containsHeader = this.parseHeader(lines[0]);
		if(containsHeader){
			lines.shift();
		}
		console.log(this.header);
		//this.addressToGPS('Am Bruckberg 2a, 86934 Reichling');

		lines.forEach(function(line, i, array){
			var lineObj = [];
			// Add all typed data to the newly generated lineObj
			line.split("\t").forEach(function(element, i, array){
				lineObj[self.header[i]] = element;
			});
			// Exception: If only the address is typed (e.g. in default search), then the address becomes the title of the place
			if(!('title' in lineObj) && 'address' in lineObj){
				lineObj.title = lineObj.address;
			}
			obj.push(lineObj);
		});
		this.search = obj;

		this.elementsToLoad = 0;
		this.search.forEach(function(place, i, array){
			if('address' in place){
				self.elementsToLoad++;
			}
		});


		this.loadedElements = 0;
		this.search.forEach(function(place, i, array){
			// only search for a place if the address is available
			if('address' in place){
				var address = self.addressToGPS(place['address'], function(gps){
					self.search[i].gps = gps;
					self.loadedElements++;
					if(self.loadedElements == self.elementsToLoad){
						self.finishedLoading();
					}
				});
			}
		});
	}

	finishedLoading(){
		var obj = [];
		var self = this;
		this.search.forEach(function(el, i, array){
			obj.push(self.objectToGeoJSON(el));
		})
		//console.log(obj);
		this.returnGeoJson(obj);
	}

	objectToGeoJSON(data){
		var json = {
			"type": "Feature",
		  "properties": {
		    "marker-color": "#247CFF",
		    "marker-size": "medium",
		    "marker-symbol": "marker",
		    "title": "Titel",
		    "address": "",
		    "description": ""
		  },
		  "geometry": {
		    "type": "Point",
		    "coordinates": [0, 0]
		  }
		};
		Object.keys(data).forEach(function(el, i){
			switch(el){
				case 'title':
					json.properties.title = data['title'];
					break;
				case 'address':
					json.properties.address = data['address'];
					break;
				case 'gps':
					json.geometry.coordinates = data['gps'];
					break;
				case 'description':
					json.properties.description = data['description'];
					break;
				case 'icon':
					json.properties['marker-symbol'] = data['icon'];
					break;
				case 'color':
					json.properties['marker-color'] = data['color'];
					break;
				default:
					json.properties[el] = data[el];
					break;
			}
		});

		return json;
	}

	addressToGPS(address, callback){
		//callback([10.8703515, 48.050783]);
		//return false;
		var geocodingKey = accounts.geocodingGoogle;
		address = address.replace(/ /g, '+').replace(/&/g, '');
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+geocodingKey;
		//console.log('URL: '+url);
		fetch(url)
		.then((resp) => resp.json())
		.then(function(data){
			if(data.status === 'OK'){
				var gps = data.results[0].geometry.location;
				callback([gps.lng, gps.lat]);
			} else {
				console.log('Google Geocoding API: Error');
				callback(false);
			}
		})
	}

	/**
	 * Reads a line and determines if it's a valid header (and use it's field for
	 * the generated objects) or not and using default values.
	 * The generated header is saved as this.header in this object.
	 * @param  {array} line The lines which shoud be analyzed (e.g. the first line).
	 * @return {boolean}      If the line contains the header.
	 */
	parseHeader(line){
		var defaultHeader = this.defaultHeader;
		var header = defaultHeader.slice(0);
		var entrys = line.split("\t");
		var trueElements = 0;
		if(entrys.length == 1){
			this.header = ['address'];
			return false;
		}
		entrys.forEach(function(entry, i, a){
			if(defaultHeader.includes(entry)){
				trueElements++;
			}
		});
		if(trueElements == 0){
			// the user hasn't send any meta-informations, using default order
			for(var i = header.length; i < entrys.length; i++){
				header.push('property_'+(i - defaultHeader.length));
			}
			this.header = header.slice(0, entrys.length);
			return false;
		} else {
			// the user has send meta-informations, using them
			this.header = entrys;
			return true;
		}
	}

}