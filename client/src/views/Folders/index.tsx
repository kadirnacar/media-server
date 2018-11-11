import * as React from 'react';
import { connect } from 'react-redux';
import * as FoldersState from '../../reducers/folders';
import { ApplicationState } from '../../store';
import { Tree } from 'primereact/tree';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import LazyImage from '../../containers/LazyImage';
import { fetchReq } from '../../Utils';
import { Message } from 'primereact/message';
import { BreadCrumb } from 'primereact/breadcrumb';

export class Folders extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            selectedNodeKey: null,
            home: {
                icon: 'pi pi-home',command: (e) => { this.props.history.push("/folders/path/") }
            }
        }
    }
    componentDidMount() {
        this.props.getFolders(this.props.match.params.folder);
    }
    componentWillReceiveProps(props) {
        if (this.props.match.url != props.match.url) {
            this.props.Data.data = [];
            this.setState({});
            this.props.getFolders(props.match.params.folder);
        }
    }
    render() {
        return <div className="p-grid">
            <div className="p-col-12">

                <div className="card card-w-title">
                    <h1>Folders</h1>
                    <div className="p-grid">
                        <div className="p-col-12 p-md-12">
                            <BreadCrumb model={this.props.match.params.folder ? this.props.match.params.folder.split('/')
                                .map((item, index, o) => {

                                    return {
                                        label: item, command: (e) => {
                                            this.props.history.push("/folders/path/" + (this.props.match.params.folder ? this.props.match.params.folder.slice(0, this.props.match.params.folder.indexOf(e.item.label))  + e.item.label : ""));
                                            console.log(e);
                                        }
                                    }
                                }) : []} home={this.state.home} />
                        </div>
                        <div className="p-col-12 p-md-2">
                            <div onClick={() => { this.props.history.push("/folders/path/" + (this.props.match.params.folder ? this.props.match.params.folder.split("/").slice(0, -1).join('/') + "/" : "")); }}>
                                <Card title={".."} header={<img src={`${config.restUrl}/api/folders/img/`} />}>
                                </Card>
                            </div>
                        </div>
                        {this.props.Data.data ? this.props.Data.data.map((item, index) => {
                            // const header = <img src={`${config.restUrl}/api/folders/img/${(this.props.match.params.folder ? this.props.match.params.folder + "/" : "") + item.label}`} />;
                            const header = <LazyImage unloadedSrc={`${config.restUrl}/api/folders/img/`} src={`${config.restUrl}/api/folders/img/${(this.props.match.params.folder ? this.props.match.params.folder + "/" : "") + item.label}`} />;
                            const headerFolder = <LazyImage unloadedSrc={`${config.restUrl}/api/folders/img/`} src={`${config.restUrl}/api/folders/img/`} />;
                            const footer = <span>
                                {/* <Button label="Save" icon="pi pi-check" style={{ marginRight: '.25em' }} />
                                <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" /> */}
                            </span>;
                            return <div key={index} className="p-col-12 p-md-2">
                                {item.data.type == "Folder" ?
                                    <div onClick={() => { this.props.history.push("/folders/path/" + (this.props.match.params.folder ? this.props.match.params.folder + "/" : "") + item.label); }}>
                                        <Card className="box" title={item.label} footer={footer} header={headerFolder}>
                                        </Card>
                                    </div> :
                                    <div onClick={() => {
                                        // this.props.history.push("/player/" + (this.props.match.params.folder ? this.props.match.params.folder + "/" : "") + item.label);
                                    }}>
                                        <Card className="box" title={item.label} footer={footer} header={header}>
                                            {!item.data.hasTemp ? <Button style={{ float: 'left' }} icon="fa fa-refresh" label="Convert"
                                                onClick={() => {
                                                    const url = `${config.restUrl}/api/video/${(this.props.match.params.folder ? this.props.match.params.folder + "/" : "") + item.label}`
                                                    fetchReq(url, "GET").then(() => {
                                                        this.setState({});
                                                    }).catch(() => {
                                                        this.setState({});
                                                    })
                                                }} /> : (!item.data.process ? <Button style={{ float: 'left' }} icon="fa fa-play" label="Play"
                                                    onClick={() => {
                                                        this.props.history.push("/player/" + (this.props.match.params.folder ? this.props.match.params.folder + "/" : "") + item.label);
                                                    }} /> : null)}
                                            {item.data.process ? <div><Message severity="info" text={"%" + parseFloat(item.data.process.percent).toFixed(2)} /></div> : null}
                                        </Card>
                                    </div>}

                            </div>
                        }) : null}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.Folders,
    FoldersState.actionCreators
)(withRouter(Folders));