import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

export default createStore(
  enableBatching(rootReducer),
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
);
