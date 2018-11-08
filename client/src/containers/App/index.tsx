import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../../views/Home';
import Data from '../../views/Data';
import Topbar from '../Topbar';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

class App extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false
        };
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
                <Route exact path="/data" component={Data} />
            </div>
            <Footer />
            <div className="layout-mask"></div>
        </div>
    }
}

export default App;