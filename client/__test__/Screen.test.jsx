import React from 'react';
import { Screen } from 'components/Screen';


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

  it('matches snapshot', () => {
    // Use fixed time for the snapshot (the component contains a clock that
    // otherwise would make the test fail every time).
    const fixedTime = new Date('10-10-2010');
    const RealDate = Date;
    // eslint-disable-next-line no-global-assign
    Date = function constructor() { return fixedTime; };

    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    // Restore original value of Date.
    // eslint-disable-next-line no-global-assign
    Date = RealDate;
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
