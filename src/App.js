import React from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

import TheProblem from './TheProblem';

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
  });

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <TheProblem title="THE FIRST QUERY" />
        <TheProblem title="THE SECOND QUERY" />
      </ApolloProvider>
    </div>
  );
}

export default App;
