import { QueryClient, QueryClientProvider } from 'react-query';
import ReactDOM from 'react-dom';
import React from 'react';
import Main from './component/Main';

import './assets/styles/tailwind.css';

const queryClient = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <Main />
      </React.StrictMode>
    </QueryClientProvider>,
    document.getElementById('root')
);