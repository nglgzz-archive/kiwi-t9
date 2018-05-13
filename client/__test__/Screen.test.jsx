import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Screen } from 'components/Screen';


Enzyme.configure({ adapter: new Adapter() });


describe('Screen component', () => {
  const setup = (propOverrides) => {
    const props = {
      words: 'hello world',
      ...propOverrides,
    };

    return shallow(<Screen {...props} />);
  };

  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });

  it('renders text properly', () => {
    const wrapper = setup();
    expect(wrapper.find('.textbox').text()).toEqual('hello world');
  });

  it('dispatches TEXT_RESET', () => {
    const mockDispatch = jest.fn();
    const wrapper = setup({ dispatch: mockDispatch });

    wrapper.find('.actions--reset').simulate('click');
    expect(mockDispatch.mock.calls.length).toBe(1);
    expect(mockDispatch).toBeCalledWith({
      type: 'TEXT_RESET',
    });
  });

  it('dispatches CHAR_DELETE', () => {
    const mockDispatch = jest.fn();
    const wrapper = setup({ dispatch: mockDispatch });

    wrapper.find('.actions--delete').simulate('click');
    expect(mockDispatch.mock.calls.length).toBe(1);
    expect(mockDispatch).toBeCalledWith({
      type: 'CHAR_DELETE',
    });
  });

  it('redirect to twitter', () => {
    // https://github.com/facebook/jest/issues/890#issuecomment-295939071
    window.location.assign = jest.fn();
    const wrapper = setup();
    const url = 'https://twitter.com/home?status=hello%20world';

    wrapper.find('.actions--send').simulate('click');
    expect(window.location.assign).toBeCalledWith(expect.stringContaining(url));
  });
});
