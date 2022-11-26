import { render } from '@testing-library/react-native';
import HomePage from '../components/HomePage';

jest.mock("../components/HomePage", () => "Page");

test('header should exist containing text Alla förseningar', async () => {
    const { getByText } = render(<HomePage />);
    const header = await getByText('Alla förseningar');

    expect(header).toBeDefined();
});