

import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import axios from 'axios';

const App = () => {

  const [position, setPosition] = useState<GeolocationResponse>();

  useEffect(() => {
    // Geolocation.getCurrentPosition(info =>{
    //   console.log(info)
    //   setPosition(info);
    // } );

    getLocation();

    // const interval = setInterval(() => {
    //   console.log('interval funcionando1231');
    // },3000)
    // const interval = setInterval(() => getLocation, 2000)
    // const interval = setInterval(() => teste, 2000)
    // return () => clearInterval(interval);



  }, [])


  function getCurrent() {
    const interval = setInterval(() => {
      Geolocation.getCurrentPosition(info => {
        console.log('watch', info);
        let date = new Date(info.timestamp);
        info = { ...info, timestamp: date.getTime() }
        setPosition(info);
        sendLocation(info);
      },
        (error) => console.log(error))

    }, 10000)
    return () => clearInterval(interval);

  }

  function watching() {
    /**funciona!!! */
    const watchId = Geolocation.watchPosition(
      position => {
        const { coords } = position;
        console.log('coords', coords);
        sendLocation(position);
        setPosition(position);
      },
      error => {
        console.log(error, 'coords')
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        timeout: 10000
      }
    )
    return () => Geolocation.clearWatch(watchId)

  }

  async function getLocation() {
    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    console.log('permission', hasPermission);

    if (!hasPermission) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    } else {
      getCurrent();
      // watching();
    }
  }

  async function sendLocation(coord: any) {
    try {

      let coordenada = { 
        latitude: coord.coords.latitude,
        longitude: coord.coords.longitude,
        timestamp: coord.timestamp
      }

      const response = await axios.post('http://10.0.2.2:8000/coords', coordenada);
      console.log('response', response.status);

    } catch (err) {
      console.log(err);

    }
  }

  function transformDate(date: any) {

    var a = date ? new Date(date * 1000) : new Date();
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var dt = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = dt + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }


  return (
    <View style={{ backgroundColor: 'white' }}>
      <Text>GeoLoc</Text>
      <Text>Latitude: {position?.coords.latitude}</Text>
      <Text>Longitude: {position?.coords.longitude}</Text>
      <Text>Timestamp: {transformDate(position?.timestamp)}</Text>
    </View>
  );
};

export default App;
