jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
jest.useFakeTimers()
import { render } from '@testing-library/react-native';
import DelayList from '../components/Delays';

const exampleDelay = 
{"ActivityId":"1500adde-115d-43e5-08da-c37dd445579d","ActivityType":"Avgang","AdvertisedTimeAtLocation":"2022-11-26T19:57:00.000+01:00","AdvertisedTrainIdent":"645","Canceled":false,
"EstimatedTimeAtLocation":"2022-11-26T20:14:00.000+01:00","FromLocation":[{"LocationName":"Cst","Priority":1,"Order":0}],"ToLocation":[{"LocationName":"Ksc","Priority":1,"Order":0}],
"advertisedTimeShort":{time:"10:10",day:"11-30"},"estimatedTimeShort":{time:"10:40",day:"11-30"}}

test('Delaylist should render a table with four headers', async () => {
    const { getByText } = render(<DelayList delays={[]}/>)
    const header1 = await getByText('Tåg-ID', { exact: false });
    const header2 = await getByText('Avgång', { exact: false });
    const header3 = await getByText('Ny', { exact: false });
    const header4 = await getByText('Ort', { exact: false });
    expect(header1).toBeDefined();
    expect(header2).toBeDefined();
    expect(header3).toBeDefined();
    expect(header4).toBeDefined();
});

test('Delaylist should should show a delay when given input', async () => {
    const { getByText } = render(<DelayList delays={[exampleDelay]}/>)
    const trainId = await getByText('645', { exact: false });
    const departureTime = await getByText('10:10', { exact: false });
    const newTime = await getByText('10:40', { exact: false });
    expect(trainId).toBeDefined();
    expect(departureTime).toBeDefined();
    expect(newTime).toBeDefined();
});

