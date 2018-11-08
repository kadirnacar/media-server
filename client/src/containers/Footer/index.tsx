import * as React from 'react';

export class Footer extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="layout-footer">
            <span className="footer-text" style={{ 'marginRight': '5px' }}>Bengsoft</span>
            <img src="assets/layout/images/BENGSOFT.png" alt="" width="80" />
            <span className="footer-text" style={{ 'marginLeft': '5px' }}>Application</span>
        </div>
    }
}
export default Footer;