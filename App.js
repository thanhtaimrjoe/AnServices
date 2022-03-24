import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import AuthStack from './src/navigation/AuthStack';
import myReducer from './src/redux/reducers/index';

const store = createStore(myReducer, applyMiddleware(thunk));
export default function App() {
  return (
    <Provider store={store}>
      <AuthStack />
    </Provider>
  );
}
