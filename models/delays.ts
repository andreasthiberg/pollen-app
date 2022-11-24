import config from "../config/api_config.json";

const delays = {
    getStations: async function getStations() {
        const response = await fetch(`${config.traffic_api_url}/stations`);
        const result = await response.json();
        return result.data;
    },
    getDelays: async function getDelays() {
        const response = await fetch(`${config.traffic_api_url}/delayed`);
        const result = await response.json();
        return result.data;
    },
    getDelaysWithStationInfo: async function getDelaysWithStationInfo() {
        const delays = await this.getDelays();
        const stations = await this.getStations();
        for(const delay of delays){

            delay.advertisedTimeShort = await this.changeTimeFormat(delay.AdvertisedTimeAtLocation);
            delay.estimatedTimeShort = await this.changeTimeFormat(delay.EstimatedTimeAtLocation);
            if(delay.hasOwnProperty("FromLocation")){
                let fromStationCode = delay.FromLocation[0].LocationName;
                const stationInfo = stations.find((element: any) => element.LocationSignature == fromStationCode)
                delay.stationInfo = stationInfo;
            }
        }
        return delays;
    },
    changeTimeFormat: async function changeTimeFormat(timeStamp: string) {
        let day = timeStamp.slice(5,10);
        let time = timeStamp.slice(11,16);
        return day + " " + time;
    }
};
   
export default delays;