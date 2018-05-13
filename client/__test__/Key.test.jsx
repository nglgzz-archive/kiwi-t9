import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Key } from 'components/Key';


Enzyme.configure({ adapter: new Adapter() });


describe('Key component', () => {
  const setup = (propOverrides) => {
    const props = {
      label: '1',
      ...propOverrides,
    };

    return shallow(<Key {...props} />);
  };

  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });

  it('dispatches SYMBOL_INSERT and SYMBOL_NEXT', () => {
    const mockDispatch = jest.fn();
    const wrapper = setup({ dispatch: mockDispatch });

    wrapper.find('button').simulate('click');
    expect(mockDispatch.mock.calls.length).toBe(1);
    expect(mockDispatch).lastCalledWith({
      type: 'SYMBOL_INSERT',
    });

    wrapper.find('button').simulate('click');
    expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch).lastCalledWith({
      type: 'SYMBOL_NEXT',
    });

    // Fast forward time by one second, so the next time the symbol button is
    // pressed it will insert a new symbol instead of changing the existing one.
    const timeInASec = new Date(Number(new Date()) + 1000);
    const RealDate = Date;
    // eslint-disable-next-line no-global-assign
    Date = function constructor() { return timeInASec; };

    wrapper.find('button').simulate('click');
    expect(mockDispatch.mock.calls.length).toBe(3);
    expect(mockDispatch).lastCalledWith({
      type: 'SYMBOL_INSERT',
    });


    // Let's not mess with time and set Date back to its original value.
    // https://imgur.com/gallery/nhFFBm3
    // eslint-disable-next-line no-global-assign
    Date = RealDate;
  });

  it('dispatches WORD_NEXT', () => {
    const mockDispatch = jest.fn();
    const wrapper = setup({ label: '*', dispatch: mockDispatch });

    wrapper.find('button').simulate('click');
    expect(mockDispatch.mock.calls.length).toBe(1);
    expect(mockDispatch).toBeCalledWith({
      type: 'WORD_NEXT',
    });
  });

  it('dispatches CHANGE_CASE', () => {
    const mockDispatch = jest.fn();
    const wrapper = setup({ label: '#', dispatch: mockDispatch });

    wrapper.find('button').simulate('click');
    expect(mockDispatch.mock.calls.length).toBe(1);
    expect(mockDispatch).toBeCalledWith({
      type: 'CHANGE_CASE',
    });
  });

  it('dispatches WORD_END', () => {
    const mockDispatch = jest.fn();
    const wrapper = setup({ label: '0', dispatch: mockDispatch });

    wrapper.find('button').simulate('click');
    expect(mockDispatch.mock.calls.length).toBe(1);
    expect(mockDispatch).toBeCalledWith({
      type: 'WORD_END',
      space: true,
    });
  });

  it('dispatches SUGGESTIONS_FETCH', () => {
    const mockDispatch = jest.fn();
    const wrapper = setup({
      label: '3',
      digits: '12',
      dispatch: mockDispatch,
    });

    wrapper.find('button').simulate('click');
    expect(mockDispatch.mock.calls.length).toBe(1);
    expect(mockDispatch).toBeCalledWith({
      type: 'SUGGESTIONS_FETCH',
      payload: '/api/suggestions?q=123',
    });
  });
});
