import * as React from 'react';
import { NavLink } from 'react-router-dom';

export class Menu extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        const { items } = this.props;
        return items ? <ul className={this.props.className}>
            {
                items.map((item, index) => {
                    return <li key={index} className={""}>
                        {item.items && this.props.root === true && <div className='arrow'></div>}
                        <NavLink to={item.url}>
                            <i className={item.icon}></i>
                            <span>{item.label}</span>
                            {item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>}
                            {item.badge && <span className="menuitem-badge">{item.badge}</span>}
                        </NavLink>
                        <Menu items={item.items} />
                    </li>
                })
            }
        </ul> : null;
    }
}

export default Menu;