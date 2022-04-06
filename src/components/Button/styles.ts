import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity<{bgColor: string; width: string}>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${props => props.width} ;
    height: 40px;
    margin-top: 30px;
    margin-left: 5px;

    background-color: ${props => props.bgColor};
    border-radius: 5px;

    opacity: ${props => props.disabled ? 0.8 : 1};

`;

export const Label = styled.Text<{textColor: string}>`   
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${props => props.textColor};
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
`;
