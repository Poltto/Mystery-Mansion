import { BrowserRouter } from 'react-router-dom';
import './_app.scss';

require.context('./assets', true, /\.(png|jpeg|jpg|gif)/);
require.context('./assets', true, /\.(ttf|svg)/);
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './App';
import * as React from 'react';
import { ClickListener } from './click-listener/clickListener';
import { Dialog } from './dialog/dialog';
import { Inventory } from './inventory/inventory';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ClickListener/>
      <Dialog/>
      <Inventory/>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

