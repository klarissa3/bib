import React, { Component } from 'react';
import './App.css';
import Bar from './Bar.js';
import Intro from './Intro.js';
import List from './List';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class App extends Component {
  render(){
    return (
      <div className="container">
        <div className="row">
          <Bar/>
        </div>
      
      <div className="container body">
        <div className="row">
          <Intro/>
        </div>
      </div>
      <div className="container bib">
        <div className="row">
          <List/>
        </div>
      </div>
      <div className="map">
      <Map google={this.props.google} zoom={14}>
 
      <Marker onClick={this.onMarkerClick}
              name={'Current location'} />

      <InfoWindow onClose={this.onInfoWindowClose}>
          
      </InfoWindow>
    </Map>
    </div>
    </div>
    
    );
  }
  
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAigMIMTY-1q-L6SvPl65Ab7zEpf9XIomo")
})(App)

