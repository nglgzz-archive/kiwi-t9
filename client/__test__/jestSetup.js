import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


// Make Enzyme shallow and date utils available in all tests without importing
global.shallow = shallow;

// Store the real value of Date so it can later be restored.
global.RealDate = Date;

global.mockDate = (fakeDate) => {
  global.Date = function constructor() { return fakeDate; };
};

// Let's not mess with time and set Date back to its original value.
// https://imgur.com/gallery/nhFFBm3
global.restoreDate = () => {
  global.Date = global.RealDate;
};
