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
export class Folders extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            selectedNodeKey: null
        };
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
                        <div className="p-col-12 p-md-2">
                            <div onClick={() => { this.props.history.push("/folders/path/" + (this.props.match.params.folder ? this.props.match.params.folder + "/" : "") + ".."); }}>
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
                                        <Card title={item.label} footer={footer} header={headerFolder}>
                                        </Card>
                                    </div> :
                                    <div onClick={() => { this.props.history.push("/player/" + (this.props.match.params.folder ? this.props.match.params.folder + "/" : "") + item.label); }}>
                                        <Card className="box" title={item.label} footer={footer} header={header}>
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