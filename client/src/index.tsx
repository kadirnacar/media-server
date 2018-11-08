import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './containers/App';
import history from './history';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './layout/layout.scss';

const initialState = (window as any).initialReduxState;
const store = configureStore(history, initialState);

function renderApp(App) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <App />
                    </Switch>
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('react-root')
    );
}


renderApp(App);

if (module.hot) {
    module.hot.accept('./containers/App/index', () => {
        const App2 = require('./containers/App/index').default;
        renderApp(App2);
    });
}