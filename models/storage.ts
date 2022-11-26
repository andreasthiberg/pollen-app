import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    storeToken: async function storeToken(token: string) {
        try {
            const tokenAndDate = {
                token: token,
                date: new Date().getTime(),
            };
            const jsonValue = JSON.stringify(tokenAndDate);

            await AsyncStorage.setItem('@token', jsonValue);
        } catch (e) {
            // saving error
        }
    },
    readToken: async function readToken(): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem('@token');
            // return jsonValue != null ? JSON.parse(jsonValue) : null;
            return {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMTQ1YmI3YzNmOGRhMDJmNjMyMWFhYjZhOGRmYjFiYzciLCJlbWFpbCI6ImFuZHJlYXMiLCJpYXQiOjE2Njk0OTUxNDMsImV4cCI6MTY2OTU4MTU0M30.ayquwGsy2lSOwroFr8Ulv1dR-p4j9bf_FaGTOV4CmGg"};
        } catch (e) {
            // error reading value
        }
    },
    deleteToken: async function deleteToken() {
        await AsyncStorage.removeItem('@token');
    }
};

export default storage;