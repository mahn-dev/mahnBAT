import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import reportWebVitals from './reportWebVitals';

import GlobalStyles from '~/components/GlobalStyles';
import { store } from '~/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();
root.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
    // </React.StrictMode>,
);
reportWebVitals();
