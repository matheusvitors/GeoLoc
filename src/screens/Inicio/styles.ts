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

    background-color: #141414;

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


/** Rota */
export const ContainerRota = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;

    margin-top: 30px;
    width: 55px;
    height: 40px;

    /* background-color: #141414; */
    border-radius: 5px;

`;

export const IconContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #e67700;
    height: 40px;
    width: 25px;

    border-radius: 5px;
`;

export const TextRota = styled.Text`
    color: #141414;
    font-size: 28px;
    width: 25px;
    text-align: center;

    background-color: #e67700;
    border-radius: 5px;

`;