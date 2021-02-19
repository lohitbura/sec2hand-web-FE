import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
    render() {
        
        var latitude = parseFloat(this.props.lat);
        var longitude = parseFloat(this.props.long);
        
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: latitude,
          lng: longitude,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDP-lgJYueMSRrrb9824PWG6KzSIsN3iY0",
})(MapContainer);
