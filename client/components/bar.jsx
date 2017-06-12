import React from 'react';
import {observable} from "mobx";
import {observer} from "mobx-react";

import Icon from './icon.jsx';

@observer
export default class App extends React.Component {

	defaultSearchText = 'Suche...';
  @observable searchText = this.defaultSearchText;

	addMarker(){
		//this.props.store.flyTo();
		this.props.store.map.addMarker([10.9276958, 47.9189897], 'Reichling', '10.9276958, 47.9189897');
		//this.props.store.addMarker();
	}

	handleSearchChange(e){
		this.searchText = e.target.value;
	}

	handleSearchKeyDown(e){
		if(this.searchText == this.defaultSearchText){
			this.searchText = '';
		}
		switch(e.key){
			case 'Tab':
				e.preventDefault();
				var val = e.target.value;
				var start = e.target.selectionStart;
				var end = e.target.selectionEnd;
				this.searchText = val.substring(0, start) + '\t' + val.substring(end);
				break;
			case 'Enter':
				this.submitSearch();
				e.preventDefault();
				e.stopPropagation();
				break;
			default:
				break;
		}
	}

	submitSearch(){
		var searchText = this.searchText;
		this.searchText = '';
		this.props.store.search(searchText);
	}

	submitExternSearch(){
		var searchText = this.searchText;
		this.searchText = this.defaultSearchText;
		this.props.store.search(searchText);
	}

	handleSearchOnFocus(e){
		if(this.searchText == this.defaultSearchText){
			this.searchText = '';
		}
	}

	handleSearchOnBlur(e){
		if(this.searchText == ''){
			this.searchText = this.defaultSearchText;
		}
	}

  render() {
    //<button onClick={this.addMarker.bind(this)}>add Marker</button>
    return (
      <div className="title-bar">
      	<h1 className="title"><a href="http://www.syndesi.de">Sy</a>Maps</h1>
      	<div className="searchbox">
      		<textarea className="searchbox" type="text" wrap="off" value={this.searchText} onChange={this.handleSearchChange.bind(this)} onKeyDown={this.handleSearchKeyDown.bind(this)} onFocus={this.handleSearchOnFocus.bind(this)} onBlur={this.handleSearchOnBlur.bind(this)} />
      		<div onClick={this.submitExternSearch.bind(this)}>
      			<Icon icon="search"/>
      		</div>
      	</div>
      </div>
    );
  }
}