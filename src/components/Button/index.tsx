import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Container, Label } from './styles';

interface IButtonProps { 
    label: string;
    onPress(): any;
    type?: string;
    isDisabled?: boolean;
    width?: string;
}

const Button: React.FC<IButtonProps> = ({ label, type, width, onPress, isDisabled }) => {

    const theme = useContext(ThemeContext);
    
    let bgColor = '#4432a8';
    let textColor = '#d1d1d1';

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

        default:
            bgColor = '#4432a8';
            textColor = '#d1d1d1';
            break;
    }

    if (isDisabled) {
        onPress= () => {};
    }

    return (
        <Container onPress={onPress} bgColor={bgColor} width={width? width : '90%'} disabled={isDisabled}>
            <Label textColor={textColor}>{label}</Label>
        </Container>
    );
}

export default Button;