import { BrowserRouter } from 'react-router-dom';
import './app.scss';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
require.context('./assets', true, /\.(png|jpeg|jpg|gif)/);
require.context('./assets', true, /\.(ttf|svg)/);
require.context('./icomoon', true, /\.(woff|woff2|eot|ttf)/);
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './App';
import * as React from 'react';
import { ClickListener } from './click-listener/clickListener';
import { Dialog } from './dialog/dialog';
import { Inventory } from './inventory/inventory';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <DndProvider options={{enableMouseEvents: true}} backend={HTML5Backend}>
      <Provider store={store}>
        <BrowserRouter>
          <ClickListener/>
          <Dialog/>
          <Inventory/>

          <App/>
        </BrowserRouter>
      </Provider>
    </DndProvider>
  </ApolloProvider>,


  document.getElementById('root'));

