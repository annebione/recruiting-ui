import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';

const customRender = (
  ui,
  {
    initialState = {},
    reducer = state => state,
    store = createStore(reducer, initialState, compose(applyMiddleware(thunk))),
    ...options
  } = {}
) => {
  /* eslint-disable-next-line react/prop-types */
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
