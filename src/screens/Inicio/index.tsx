import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import MapView from 'react-native-maps';
import Button from '../../components/Button';
import { GeolocationService, INTERVAL } from '../../core/geolocation';
import { JUSTICA, PARIS } from '../../core/locations';
import { Service } from '../../core/service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PJ from '../../../package.json';

import BackgroundService from 'react-native-background-actions';

import {ButtonInit, Container, ContainerRota, FooterContent, HeaderContent, MessageBox, TextRota, Texto, IconContainer} from './styles';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Inicio = () => {

	const [rota, setRota] = useState(null); 
	const [posicao, setPosicao] = useState<any>(JUSTICA);
	const [rastrear, setRastrear] = useState(false);
	const [seguir, setSeguir] = useState(false);
	const [watchId, setWatchId] = useState(0)
	const [boxMessage, setBoxMessage] = useState('Geoloc - ' + PJ.version)

	const [coords, setCoords] = useState<any>(null);

	useEffect(() => {
		pegarPosicaoInicial();
	}, [])

	// useEffect(() => {
	// 	intervalTracking();
	// }, [posicao, rastrear]);

	//TODO: Opção de rastrear usando o follow
	//TODO: Listar as chamadas e identificar quais foram enviadas
	//TODO: Pegar matricula de quem ta usando
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

	const salvarPosicao = async (lat: number, long: number) => {

		const coord = { 
			latitude: lat,
			longitude: long,
			timestamp: Date.now(),
			rota: rota
		}

		console.log('[coord p/ salvar]', coord);
		setCoords(coord);

		if(rota) {
			await Service.novaCoordenada(coord);
		}

	}

	const pegarPosicao = async () => {
		
		try {
			const pos = await GeolocationService.currentPosition();
			const data = new Date().toLocaleTimeString();

			setPosicao(pos);
			setBoxMessage(data + JSON.stringify(pos));

			salvarPosicao(pos.latitude, pos.longitude);


		} catch (error) {
			console.log(error);
			setBoxMessage(error.message)
		}
	}
	
	const seguirPosicao = async () => { 
		console.log('seguindo');

		const success = (pos: any)=> { 
			const posicao = { latitude: pos.coords.latitude , longitude: pos.coords.longitude}
			console.log('[Seguindo]: ', posicao);
			salvarPosicao(posicao.latitude, posicao.longitude)
		}
		
		const errorCb = (error: any) => { 
			console.log('[ERROR]:', error)
			setBoxMessage(error.message)
		}

		try {
			if(!watchId){
				// setWatchId(GeolocationService.follow(success, errorCb));
				setWatchId(GeolocationService.follow(success, errorCb));
			}

		} catch (error) {
			console.log(error);
		}
		
	}

	const intervalTracking = async () => {

		const sleep = (time: any) => new Promise((resolve) => setTimeout(() => resolve('ok'), time));
		
		await new Promise(async (resolve) => {
			while(BackgroundService.isRunning()) {				
				pegarPosicao();
				await sleep(INTERVAL);
			}
		});
	}

	const followTracking = async () => {

		if(!watchId){
			seguirPosicao();
		}
	}

	const runInBackground = async (callback: () => Promise<void>) => {
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

			await BackgroundService.start(callback, options); 
			// await BackgroundService.updateNotification({taskDesc: 'O dispositivo está sendo rastreado'});	
		} catch (error) {
			console.log(error);
			
		}
	}
	
	const rastrearUsuario = async () => {
		
		try {
			setRastrear(!rastrear);

			if(rota) {
				setRota(null);
				await BackgroundService.stop();
			} else {
				separador();
				const { data } = await Service.novaRota();
				setRota(data.rota.id);	
			}
			
		} catch (error) {
			console.log(error);
			setBoxMessage(error.message)
		}
	}

	const seguirUsuario = async () => {

		try {
			setSeguir(!seguir);

			if(rota){
				setRota(null);
				GeolocationService.stopToFollow(watchId);
				setWatchId(0);
				await BackgroundService.stop();
			} else {
				separador();
				const { data } = await Service.novaRota();
				setRota(data.rota.id);	
				// seguirPosicao();
			}

		} catch (error) {
			console.log(error);
			setBoxMessage(error.message)
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
		if(rota) {
			if(rastrear) {
				runInBackground(intervalTracking)
			}
			if(seguir) {
				runInBackground(followTracking)

				// runInBackground(seguirPosicao)
			}
		}
	}, [rota]);

	useEffect(() => {
		console.log('[Rastreamento]:', rastrear);
	}, [rastrear]);

	useEffect(() => {
		console.log('[Seguir]:', seguir);
	}, [seguir]);

	useEffect(() => {
		console.log('[WATCHID]:', watchId);
	}, [watchId]);

	const ShowItem: React.FC<{item: any, icon?: any}> = ({ item, icon }) => {
		return (
			<ContainerRota>
				{icon ?<IconContainer>
					<Icon name={icon} size={25} /> 
				</IconContainer>: null }
				<TextRota>{item ? item : '0'}</TextRota>
			</ContainerRota> 
		)
	}

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
				{rastrear ? <ShowItem item={rota} icon="alt-route" /> : null }
				{seguir ? <ShowItem item={watchId} icon="follow-the-signs" /> : null }
				<Button label={<Icon name="power-settings-new" size={30} ></Icon>} 
					width='12%' onPress={acordarAPI} />
				<Button label={<Icon name="delete" size={30} ></Icon>} 
					width='12%' onPress={deletarDatabase} />
			</HeaderContent>

			<FooterContent>
				<Button label={rastrear ? "Parar" : "Iniciar"} isDisabled={ seguir ? true : false } width='30%' onPress={rastrearUsuario} />
				<Button label="Pegar Posição" width='40%' onPress={pegarPosicao} />
				<Button label={seguir ? "Parar" : "Me Seguir"} isDisabled={ rastrear ? true : false } width='30%' onPress={seguirUsuario} />

				{/* <Button label="1s" width='15%' onPress={() => {}} />
				<Button label="10s" width='15%' onPress={() => {}} />
				<Button label="30s" width='15%' onPress={() => {}} /> */}
			</FooterContent>

		</Container>
	);
};

export default Inicio;
