import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;

    /* background-color: #141414; */
`;

export const MessageBox = styled.View`
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 20px;

    background-color: #3b3b3b;

`;

export const Texto = styled.Text`
    color: #fff;
`;

export const ButtonInit = styled.Button`
    position: absolute;
    display: flex;

    margin: 150px;

    width: 100px;
    height: 50px;

`;

export const HeaderContent = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;

    position: absolute;

    left: 20px;
    top: 0px

    width: 90%;

`;  

export const FooterContent = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;

    position: absolute;

    left: 20px;
    bottom: 20px

    width: 90%;

`;  

