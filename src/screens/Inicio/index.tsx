import React from 'react';
import {View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Button from '../../components/Button';

import {ButtonInit, Container, Content, Texto} from './styles';

const Inicio = () => {
	return (
		<Container>
			<MapView
				style={{flex: 1, width: '100%', height: '100%'}}
				initialRegion={{
					latitude: -15.8010596434,
					longitude: -47.8800594807,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}>

				<Marker
					coordinate={{latitude: -15.8010596434, longitude: -47.8800594807}}
					title={'Eu'}
					description={'Minha Posição atual'}>
					<View
						style={{
							backgroundColor: '#009dff',
							padding: 10,
							width: 10,
							height: 10,
							borderRadius: 10,
						}} />
				</Marker>
			</MapView>
			<Content>
				<Button label="Iniciar Rota" width='30%' onPress={() => {}} />

				<Button label="5s" width='30%' onPress={() => {}} />
				{/* <Button label="30s" width='30%' onPress={() => {}} />
				<Button label="1m" width='30%' onPress={() => {}} /> */}
			</Content>

		</Container>
	);
};

export default Inicio;


						{/* <Marker
					coordinate={{latitude: -15.8010596434, longitude: -47.8800594807}}
					pinColor={'green'} // any color
					title={'Eu'}
					description={'Minha Posição atual'}
				/> */}

