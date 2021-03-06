import Geolocation from "@react-native-community/geolocation";
import { Dimensions, PermissionsAndroid } from "react-native";
const { width, height } = Dimensions.get('window');
export const ASPECT_RATIO = width / height;
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const INTERVAL = 5 * 1000 //

export const GeolocationService = { 

    requestPermission: async () => {

        try {
            const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (hasPermission) {
                return true;
            } else {
                const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                return status === PermissionsAndroid.RESULTS.GRANTED ? true : false;
            }
        } catch (error) {
            console.log(error);
        }
    },

    currentPosition: () => new Promise((resolve, reject) => {
        try {
            Geolocation.getCurrentPosition(
                pos => resolve({ 
                    longitude: Number(pos.coords.longitude),
                    latitude: Number(pos.coords.latitude), 
                    latititudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
            }),
            error => reject(error),
            {enableHighAccuracy: true, timeout: 5000});
        } catch (error) {
            reject(error);
        }        
    }),

    follow: (success: (pos: any) => void, error: (error: any) => void) => {
        const watchId = Geolocation.watchPosition(
            success, error,
            {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
        ); 

        return watchId;
    },
    // follow: () => {
    //     const watchId = Geolocation.watchPosition(
    //         (pos)=> { console.log('[Seguindo]: ', pos)}, 
    //         (error) => { console.log('[ERROR]:', error) },
    //         {enableHighAccuracy: false, timeout: 5000, maximumAge: 0}
    //     ); 

    //     return watchId;
    // },

    // follow2: () => new Promise((resolve, reject) => {

    // }),

    stopToFollow: (watchId: number) => {
        Geolocation.clearWatch(watchId);
    },

    /**
     * Teste
     */
    promiseTest: async (message: any) => new Promise((resolve, reject) => {
        setTimeout(() => {
            message ? resolve(message) : reject('N??o rolou n??o, feelsbadman');
        }, 2000)
    })

    /** implementa????o */
	// const teste = async () => {
	// 	const ts = await GeolocationService.promiseTest('num ?? que funcionou?!');
	// 	console.log('[message]:',ts);
		
	// }


}