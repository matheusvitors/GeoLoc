import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity<{bgColor: string; width: string}>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${props => props.width} ;
    height: 50px;
    margin-top: 50px;

    background-color: ${props => props.bgColor};
    border-radius: 5px;

    opacity: ${props => props.disabled ? 0.5 : 1};

`;

export const Label = styled.Text<{textColor: string}>`   
    color: ${props => props.textColor};
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
`;
