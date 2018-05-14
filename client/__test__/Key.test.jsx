import React from 'react';
import { Key } from 'components/Key';


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

  it('matches snapshot', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
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
    mockDate(timeInASec);

    wrapper.find('button').simulate('click');
    expect(mockDispatch.mock.calls.length).toBe(3);
    expect(mockDispatch).lastCalledWith({
      type: 'SYMBOL_INSERT',
    });

    restoreDate();
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

  it('dispatches DIGITS_UPDATE', () => {
    const mockDispatch = jest.fn();
    const wrapper = setup({
      label: '3',
      digits: '12',
      dispatch: mockDispatch,
    });

    wrapper.find('button').simulate('click');
    expect(mockDispatch.mock.calls.length).toBe(1);
    expect(mockDispatch).lastCalledWith(expect.any(Function));

    const action = mockDispatch.mock.calls[0][0];
    action(mockDispatch);

    expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch).lastCalledWith({
      type: 'DIGITS_UPDATE',
      payload: '123',
    });
  });
});
