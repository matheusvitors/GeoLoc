import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import MapView from 'react-native-maps';
import Button from '../../components/Button';
import { GeolocationService, INTERVAL } from '../../core/geolocation';
import { JUSTICA, PARIS } from '../../core/locations';
import { Service } from '../../core/service';

import BackgroundService from 'react-native-background-actions';

import {ButtonInit, Container, FooterContent, HeaderContent, MessageBox, Texto} from './styles';

const Inicio = () => {

	const [rota, setRota] = useState(null); 
	const [posicao, setPosicao] = useState<any>(JUSTICA);
	const [rastrear, setRastrear] = useState(false);
	const [watchId, setWatchId] = useState(0)
	const [boxMessage, setBoxMessage] = useState("Message Box")

	useEffect(() => {
		pegarPosicaoInicial();
	}, [])

	// useEffect(() => {
	// 	intervalTracking();
	// }, [posicao, rastrear]);

	//TODO: Forçar segundo plano
	//TODO: Listar as chamadas e identificar quais foram enviadas
	//TODO: Pegar matricula de quem ta usando
	//TODO: Opção de rastrear usando o follow
	//TODO: Indicar visualmente no message box se a coordenada foi enviadas ou não
	//TODO: Melhoria do botão de acordar a api

	const pegarPosicaoInicial = async () => {

		try {
			const permission = await GeolocationService.requestPermission();

			if(permission) {
				const pos = await GeolocationService.currentPosition();
				setPosicao(pos);	
			} else {
				Alert.alert('',
				'A permissão é necessária para que o aplicativo cumpra sua função!',
				[{
					text: 'Entendido',
					onPress: () => GeolocationService.requestPermission()
				}]);
			}
		} catch (error) {
			console.log(error);
			setBoxMessage(error.message)
		}
	}

	const pegarPosicao = async () => {
		
		try {
			const pos = await GeolocationService.currentPosition();
			setPosicao(pos);
			const data = new Date().toLocaleTimeString();
			// const numero = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
			setBoxMessage(data + JSON.stringify(pos));

			console.log('[rota em pegar posicao]:', rota);
			
			const coord = { 
				latitude: pos.latitude,
				longitude: pos.longitude,
				timestamp: Date.now(),
				rota: rota
			}

			console.log('[coord]', coord);

			if(rota) {
				await Service.novaCoordenada(coord);
			}

		} catch (error) {
			console.log(error);
			setBoxMessage(error.message)
		}
	}

	// const intervalTracking = async () => {

	// 	console.log("Interval Tracking", rastrear);

	// 	if(rastrear) { 
	// 		setTimeout(() => {
	// 			pegarPosicao();
	// 		}, INTERVAL)
	// 	}
	// }

	// const teste = async () => {
	// 	const sleep = (time: any) => new Promise((resolve) => setTimeout(() => resolve('ok'), time));
	// 	await new Promise( async (resolve) => {
	// 		for (let i = 0; BackgroundService.isRunning(); i++) {
	// 			console.log(i);
	// 			await sleep(1000);
	// 		}
	// 	});		
	// }

	const testLocalizacao = async () => {
		const sleep = (time: any) => new Promise((resolve) => setTimeout(() => resolve('ok'), time));
		await new Promise(async (resolve) => {
			while(BackgroundService.isRunning()) {				
				pegarPosicao();
				await sleep(INTERVAL);
			}
		});
	}

	const runOnBackground = async () => {
		const options = {
			taskName: 'Geoloc',
			taskTitle: 'O dispositivo está sendo rastreado',
			taskDesc: ' ', 
			taskIcon: {
				name: 'ic_launcher',
				type: 'mipmap',
			}
		}
		
		try {
			console.log('Running on background');

			await BackgroundService.start(testLocalizacao, options); 
			// await BackgroundService.updateNotification({taskDesc: 'O dispositivo está sendo rastreado'});	
		} catch (error) {
			console.log(error);
			
		}
	}	

	const gerenciarRota = async () => {
		try {
			// rastrear ? 
			// GeolocationService.stopToFollow(watchId) :
			// setWatchId(GeolocationService.follow());

			// intervalTracking();
			setRastrear(!rastrear);

			if(rota) {
				setRota(null);
				await BackgroundService.stop();
			} else {
				separador();
				const { data } = await Service.novaRota();
				setRota(data.rota.id);	
				runOnBackground();
			}
			
		} catch (error) {
			console.log(error);
		}
	}

	const acordarAPI = async () => { 
		try {
			await Service.welcome();
			setBoxMessage('Api acordada')
		} catch (error) {
			setBoxMessage(error.message);
			console.log(error);
		}
	}

	const deletarDatabase = async () => { 
		try {
			await Service.apagarDatabase();
			setBoxMessage('Database Apagada')
		} catch (error) {
			setBoxMessage(error.message);
			console.log(error);
		}
	}

	const separador = () => {
		console.log('------------------------------------------------------');
		console.log('------------------------ NOVA ROTA -------------------');
		console.log('------------------------------------------------------');
	}

	// useEffect(() => {
	// 	console.log('[POSICAO]:', posicao);
	// }, [posicao]);

	useEffect(() => {
		console.log('[ROTA]:', rota);
	}, [rota]);

	useEffect(() => {
		console.log('[Rastreamento]:', rastrear);
	}, [rastrear]);

	useEffect(() => {
		console.log('[WATCHID]:', watchId);
	}, [watchId]);

	return (
		<Container>
			<MessageBox>
				<Texto>{boxMessage}</Texto>
			</MessageBox>
			{posicao ? 
			<MapView
				style={{flex: 1, width: '100%', height: '100%'}}
				region={JUSTICA}
				showsUserLocation={true}
				followsUserLocation={true}
				>

			</MapView> : null }
			<HeaderContent>
				<Button label="API" width='12%' onPress={acordarAPI} />
				<Button label="Apagar Dados" width='30%' onPress={deletarDatabase} />
			</HeaderContent>

			<FooterContent>
				<Button label={rastrear ? "Parar" : "Iniciar"} width='30%' onPress={gerenciarRota} />
				<Button label="Pegar Posição" width='40%' onPress={pegarPosicao} />

				{/* <Button label="1s" width='15%' onPress={() => {}} />
				<Button label="10s" width='15%' onPress={() => {}} />
				<Button label="30s" width='15%' onPress={() => {}} /> */}
			</FooterContent>

		</Container>
	);
};

export default Inicio;
