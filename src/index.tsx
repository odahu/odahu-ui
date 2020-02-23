import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import * as serviceWorker from './serviceWorker';
import {MainLayout} from "./views/layout/Main";
import {configureStore} from "./configureStore";
import {ThemeProvider} from '@material-ui/core/styles';
import {configureTheme} from "./configureTheme";

const store = configureStore();
const theme = configureTheme();

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <MainLayout/>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
