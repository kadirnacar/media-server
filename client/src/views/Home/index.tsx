import * as React from 'react';

export class Home extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="p-grid p-fluid dashboard">
            <div className="p-col-12 p-lg-4">
                <div className="card summary">
                    <span className="title">Users</span>
                    <span className="detail">Number of visitors</span>
                    <span className="count visitors">12</span>
                </div>
            </div>
            <div className="p-col-12 p-lg-4">
                <div className="card summary">
                    <span className="title">Sales</span>
                    <span className="detail">Number of purchases</span>
                    <span className="count purchases">534</span>
                </div>
            </div>
            <div className="p-col-12 p-lg-4">
                <div className="card summary">
                    <span className="title">Revenue</span>
                    <span className="detail">Income for today</span>
                    <span className="count revenue">$3,200</span>
                </div>
            </div>
        </div>
    }

}
export default Home;