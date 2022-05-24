import React, { useContext, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components';

import { Container, Label, LoadingContainer } from './styles';

interface IButtonProps { 
    label: string | Element;
    onPress(): any;
    type?: string;
    isDisabled?: boolean;
    width?: string;
    height?: string;
    isLoading?: boolean; 
}

const Button: React.FC<IButtonProps> = ({ label, type, width, height, onPress, isDisabled, isLoading }) => {

    const theme = useContext(ThemeContext);
    let render = <></>
    
    let bgColor = '#141414';
    let textColor = '#e67700';

    switch (type) {
        case 'accent':
            bgColor = theme.colors.accent;
            textColor = theme.text.light;
            break;
        case 'info':
            bgColor = theme.colors.info;
            textColor = theme.text.light;
            break;
        case 'warning':
            bgColor = theme.colors.warning;
            textColor = theme.text.light;
            break;
        case 'invert':
            bgColor = '#e67700';
            textColor = '#141414';
            break;

        default:
            bgColor = '#141414';
            textColor = '#e67700';
            break;
    }

    if (isDisabled) {
        onPress= () => {};
    }

    if(!isLoading) {
        render = <Container onPress={onPress} bgColor={bgColor} width={width? width : '90%'} height={height? height : '40px'} disabled={isDisabled}>
                    <Label textColor={textColor}>{label}</Label>
                </Container> 
    } else {
        render = <LoadingContainer  bgColor={bgColor} width={width? width : '90%'} height={height? height : '40px'} >
                    <ActivityIndicator size="large" color="#141414" />
                </LoadingContainer> 
    }


    return (render);
}

export default Button;