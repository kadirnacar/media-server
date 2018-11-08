import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from '../../views/List';

class App extends React.Component<any, any>{

    render() {
        return <BrowserRouter>
            <Switch>
                <Route exact path="/" component={List} />
            </Switch>
        </BrowserRouter>;
    }
}

export default App;