import * as React from 'react';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import Menu from './menu';

export class Sidebar extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.onSidebarClick = this.onSidebarClick.bind(this);

    }

    layoutMenuScroller: any;

    onSidebarClick(event) {
        setTimeout(() => { this.layoutMenuScroller.moveBar(); }, 500);
    }

    render() {
        const menu = [
            { label: 'Anasayfa', icon: 'pi pi-fw pi-home', url: "/" },
            { label: 'Data', icon: 'pi pi-fw pi-align-justify', url: "/data" }
        ];

        return <div className="layout-sidebar layout-sidebar-dark" onClick={this.onSidebarClick.bind(this)}>
            <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{ height: '100%' }}>
                <div className="layout-sidebar-scroll-content" >
                    <div className="layout-logo">
                        <img alt="Logo" src="assets/layout/images/BENGSOFT.png" />
                    </div>
                    <div className="profile">
                        <div>
                            <img src="assets/layout/images/avatar_4.png" alt="" />
                        </div>
                    </div>
                    <div className="menu">
                        <Menu items={menu} className="layout-main-menu" root={true} />
                    </div>
                </div>
            </ScrollPanel>
        </div>
    }
}

export default Sidebar;