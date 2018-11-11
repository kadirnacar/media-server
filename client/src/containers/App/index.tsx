import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../../views/Home';
import Flowplayer from '../../views/Flowplayer';
import Config from '../../views/Config';
import Folders from '../../views/Folders';
import Topbar from '../Topbar';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import { connect } from 'react-redux';
import * as ConfigState from '../../reducers/config';
import { ApplicationState } from '../../store';

class App extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false
        };
    }
    componentWillMount() {
        this.props.getConfig();
    }
    onToggleMenu(event) {
        this.setState({
            sideBarToggle: !this.state.sideBarToggle
        });
        event.preventDefault();
    }

    render() {
        return <div className={"layout-wrapper layout-static " + (this.state.sideBarToggle ? "layout-static-sidebar-inactive" : "")}>
            <Topbar onToggleMenu={this.onToggleMenu.bind(this)} />
            <Sidebar />
            <div className="layout-main">
                <Route exact path="/" component={Home} />
                <Route path="/folders/path/:folder*" component={Folders} />
                <Route path="/player/:folder*" component={Flowplayer} />
                <Route path="/config" component={Config} />
            </div>
            <Footer />
            <div className="layout-mask"></div>
        </div>
    }
}

// export default App;
export default connect(
    (state: ApplicationState) => state.Config,
    ConfigState.actionCreators
)(App);