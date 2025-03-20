import React from 'react';
import {
 ApolloClient, InMemoryCache, ApolloProvider,
 HttpLink,
 ApolloLink,
 Operation,
 NextLink
} from '@apollo/client';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import Main from './Main';
import configureStore from './store';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const addStatusLink = new ApolloLink((operation: Operation, forward: NextLink) => {
  return forward(operation).map((response: any) => {
    if (response.errors) {
      for (const error of response.errors) {
        // @ts-ignore
        if (error.status === 401) {
          sessionStorage.setItem('lastPathname', location.pathname === `${process.env.BASE_UI_PATH}/logout/` ? `${process.env.BASE_UI_PATH}/` : location.pathname);
          localStorage.clear();
          location.href = `${process.env.BASE_UI_PATH}/logout/`;
          break;
        }
      }
    } 
    return response;
  });
});
console.log('🚀 ~ App.tsx:25 ~ returnforward ~ process.env.BASE_UI_PATH:', process.env.BASE_UI_PATH);

const link = addStatusLink.concat(httpLink);
const cache = new InMemoryCache({ addTypename: false });
const client = new ApolloClient({
  cache,
  link,
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'none',
      fetchPolicy: 'network-only'
    }
  }
});
const store = configureStore({});

console.log('🚀 ~ App.tsx:26 ~ store:', store);
const App = (): JSX.Element => {
    return (
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Router>
					<Main />
				</Router>
			</Provider>
		</ApolloProvider>
	);
};

export default App;
