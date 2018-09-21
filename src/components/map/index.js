import React, {Component} from 'react';
import { Button, View} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

import styles from './mapStyles';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -12.107922,
        longitude: -76.986144,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
            origin: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null
            }
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
   }

  changeLocation = (data, details) => {
    const {lat, lng} = details.geometry.location; 
    this.setState(prevState => ({
      region: {
        ...prevState.region,
        longitude: lng,
        latitude: lat
      },
      destiny:{
        longitude: lng,
        latitude: lat
      }
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <GooglePlacesAutocomplete
            ref={(instance) => { this.GooglePlacesRef = instance }}
            query={{ key: '' }}
            placeholder='Enter Location'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            renderRightButton={
              () => <Button onPress={() => this.GooglePlacesRef.setAddressText("")} title="Cancelar"/>
            }
            currentLocationLabel="Current location"
            onPress={(data, details = null) => this.changeLocation(data, details)}
            styles={{
              textInputContainer: {
                width: '100%'
              },
              description: {
                fontWeight: 'bold'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              }
            }}
          />
        </View>
        <MapView style={styles.map}
        showsUserLocation = {true}
        //followsUserLocation = {true}
        showsScale={true}
        showsCompass={true}
        showsPointsOfInterest={true}
        showsBuildings={true}
        region={this.state.region}
        >
          { this.state.destiny ? 
          <View>
            <MapViewDirections
              origin={this.state.origin}
              destination={this.state.destiny}
              strokeWidth={3}
              apikey={''}
              strokeColor="#f3a54b"
            />
            <Marker
              coordinate={this.state.destiny}
            />
          </View>
        : null}
        </MapView>
      </View>
    );
  }
}
