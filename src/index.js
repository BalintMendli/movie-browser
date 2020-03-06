import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'swiper/css/swiper.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.REACT_APP_BASE_PATH || '/'}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
