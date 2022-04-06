import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Container, Label } from './styles';

interface IButtonProps { 
    label: string | Element;
    onPress(): any;
    type?: string;
    isDisabled?: boolean;
    width?: string;
}

const Button: React.FC<IButtonProps> = ({ label, type, width, onPress, isDisabled }) => {

    const theme = useContext(ThemeContext);
    
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

        default:
            bgColor = '#141414';
            textColor = '#e67700';
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