import AsyncStorage from "@react-native-async-storage/async-storage";

const useId = async () => {
    return await AsyncStorage.getItem('@idUsuario'); 
}

export default useId;