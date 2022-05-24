import AsyncStorage from '@react-native-async-storage/async-storage';

const useHeaders = async () => {
    const token = await AsyncStorage.getItem('@token');
	const header =  { headers: { "token": `${token}` }};
	// const header =  { headers: { "token": token }};
	return header;

}

export default useHeaders;