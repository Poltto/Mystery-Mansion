import { BrowserRouter } from 'react-router-dom';
import './_app.scss';

require.context('./assets', true, /\.(png|jpeg|jpg|gif)/);
require.context('./assets', true, /\.(ttf|svg)/);
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

