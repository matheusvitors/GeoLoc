import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #141414;
    /* background-color: #000; */
`;

export const LogoContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    height: 150px;
    width: 100%;

`;

export const SystemName = styled.Text`
    width: 100%;
    height: 50px;

    font-size: 40px;
    color: #e67700;
    text-align: center;
`;

export const FormContainer = styled.View`
    display: flex;
    flex: 1;
    align-items: center;
    
    width: 100%;
    margin-top: 20px;

`;

export const Input = styled.TextInput`
    width: 80%;
    height: 60px;
    padding-left: 15px;
    margin-bottom: 20px;

    border-width: 2px;
    border-color: #e67700;
    border-radius: 10px;

    font-size: 18px;
    color: white;
    text-align: center;
`;

export const SubmitButton = styled.Button`
    width: 80%;
    height: 60px;

    background-color: #e67700;
`;