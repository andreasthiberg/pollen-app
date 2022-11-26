jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
jest.useFakeTimers()
import { render } from '@testing-library/react-native';
import FavouriteList from '../components/FavouriteList';

const exampleDelay = 
{"ActivityId":"1500adde-115d-43e5-08da-c37dd445579d","ActivityType":"Avgang","AdvertisedTimeAtLocation":"2022-11-26T19:57:00.000+01:00","AdvertisedTrainIdent":"645","Canceled":false,
"EstimatedTimeAtLocation":"2022-11-26T20:14:00.000+01:00","FromLocation":[{"LocationName":"Cst","Priority":1,"Order":0}],"ToLocation":[{"LocationName":"Ksc","Priority":1,"Order":0}],
"advertisedTimeShort":{time:"10:10",day:"11-30"},"estimatedTimeShort":{time:"10:40",day:"11-30"},"stationInfo":{"AdvertisedLocationName":"Stockholm C"}}


test('Favourite page should show delay if it matches favourite stations', async () => {
    const { getByText } = render(<FavouriteList userFavourites={[{artefact:"Stockholm C"}]} delays={[exampleDelay]}/>)
    const trainId = await getByText('645', { exact: false });
    const station = await getByText('Stockholm C', { exact: false });
    expect(trainId).toBeDefined();
    expect(station).toBeDefined();
});

test('Favourite page should NOT show delay if it DOES NOT match favourite stations', async () => {
    const { queryByText } = render(<FavouriteList userFavourites={[{artefact:"Lund C"}]} delays={[exampleDelay]}/>)
    const trainId = await queryByText('645', { exact: false });
    const station = await queryByText('Stockholm C', { exact: false });
    expect(trainId).toBeNull();
    expect(station).toBeNull();
});
