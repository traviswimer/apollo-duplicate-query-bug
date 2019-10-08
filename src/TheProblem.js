import React from 'react';

import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';

const GET_ITEMS = gql`
  query items($page: Int) {
    items(page: $page) {
      id
      title
    }
  }
`;

export default function TheProblem({title}) {
  const {data = {}, loading, fetchMore} = useQuery(GET_ITEMS, {
    notifyOnNetworkStatusChange: true,
  });
  const {items = []} = data;
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        {title} (loading: {loading.toString()})
      </h1>

      <div>
        {items.map(item => (
          <div key={item.id}>{item.id}</div>
        ))}
      </div>

      <button
        onClick={() => {
          fetchMore({
            variables: {
              page: items.length / 2,
            },
            updateQuery: (prev, {fetchMoreResult}) => {
              if (!fetchMoreResult) {
                return prev;
              }

              // Combine the old items with the new items
              return Object.assign({}, prev, {
                items: [
                  ...(prev.items || []),
                  ...(fetchMoreResult.items || []),
                ],
              });
            },
          });
        }}>
        Fetch More
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#6dF',
    margin: 10,
    padding: 5,
  },
  heading: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
};
