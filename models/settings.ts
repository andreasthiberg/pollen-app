import config from "../config/api_config.json";
import storage from "./storage";

const settings = {
    addFavourite: async function addFavourite(favourite: string) {
        const token = await storage.readToken();
        const data = {
            api_key: config.api_key,
            artefact: favourite
        };
        const response = await fetch(`${config.auth_api_url}/data`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            },
        });
        const result = await response.json();
        return result.data;
    },
    getFavourites: async function getFavourites() {
        const token = await storage.readToken();
        const response = await fetch(`${config.auth_api_url}/data?api_key=${config.api_key}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            },
        });
        const result = await response.json();
        return result.data;
    },
    removeFavourite: async function removeFavourite(favouriteId: number){
        console.log(favouriteId);
        const token = await storage.readToken();
        const data = {
            api_key: config.api_key,
            id: favouriteId
        };
        const response = await fetch(`${config.auth_api_url}/data`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            },
        });

        return;
    }
};

export default settings;