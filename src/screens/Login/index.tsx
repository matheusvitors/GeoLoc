import React, { useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import Button from '../../components/Button';
import { Service } from '../../core/service';

import { Container, FormContainer, Input, LogoContainer, SubmitButton, SystemName } from './styles';

const Login: React.FC = () => {

    const navigation = useNavigation();
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const autenticar = async () => {

        setLoading(true);

        if(matricula === '' || senha === '') {
            Alert.alert('Por favor, preencha os campos!');
        } else {
            try {
                const response = await Service.login({matricula, password: senha}); 
                await AsyncStorage.setItem('@token', response.data.token);

                const decoded = jwtDecode<JwtPayload>(`${response.data.token}`);                 
                await AsyncStorage.setItem('@idUsuario', decoded.id.toString());

                setLoading(false);
                navigation.navigate('Geoloc');

            } catch (error) {
                setLoading(false);
                Alert.alert('Erro!', error.message, [{text: 'OK'}]);
                console.log(error);
            }
        }
    }

    return (
        <Container>
            <LogoContainer> 
                <Icon name="explore" size={100} color="#e67700" /> 
                <SystemName>GEOLOC</SystemName>
            </LogoContainer>
            <FormContainer>
                <Input placeholder="Matrícula" placeholderTextColor="#e67700" onChangeText={(text) => setMatricula(text)}  />
                <Input placeholder="Senha" secureTextEntry={true} placeholderTextColor="#e67700" onChangeText={(text) => setSenha(text)}  />
                <Button  label="Entrar" type='invert' width='80%' height='60px' onPress={autenticar} isLoading={loading} />
            </FormContainer>
        </Container>
    );
};

export default Login;
