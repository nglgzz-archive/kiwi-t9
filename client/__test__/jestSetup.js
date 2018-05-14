import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


// Make Enzyme shallow available in all tests without importing
global.shallow = shallow;
