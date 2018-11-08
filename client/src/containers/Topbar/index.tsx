import * as React from 'react';
import { InputText } from 'primereact/inputtext';

export class Topbar extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="layout-topbar clearfix">
            <a className="layout-menu-button" onClick={this.props.onToggleMenu}>
                <span className="pi pi-bars" />
            </a>
            <div className="layout-topbar-icons">
                {/* <span className="layout-topbar-search">
                    <InputText type="text" placeholder="Search" />
                    <span className="layout-topbar-search-icon pi pi-search" />
                </span>
                <a>
                    <span className="layout-topbar-item-text">Events</span>
                    <span className="layout-topbar-icon pi pi-calendar" />
                    <span className="layout-topbar-badge">5</span>
                </a>
                <a>
                    <span className="layout-topbar-item-text">Settings</span>
                    <span className="layout-topbar-icon pi pi-cog" />
                </a>
                <a>
                    <span className="layout-topbar-item-text">User</span>
                    <span className="layout-topbar-icon pi pi-user" />
                </a> */}
            </div>
        </div>
    }
}

export default Topbar;