import * as React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux';
import * as DemoState from '../../reducers/demo';
import { ApplicationState } from '../../store';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export class Data extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            dataTableSelection: null,
            displayDialog: false,
            activeItem: {}
        }
    }

    componentDidMount() {
        this.props.getList().then(() => {
            console.log(this.props);
        })
    }
    addNew() {
        this.setState({ activeItem: { isNew: true, id: Math.random() }, displayDialog: true })
    }
    delete() {
        const { activeItem } = this.state;
        this.props.deleteItem(activeItem.id).then(() => {
            this.setState({ displayDialog: false })
        })
    }
    save() {
        const { activeItem } = this.state;
        if (activeItem.isNew == true) {
            this.props.createItem(activeItem).then(() => {
                this.setState({ displayDialog: false })
            })
        } else {
            this.props.updateItem(activeItem.id, activeItem).then(() => {
                this.setState({ displayDialog: false })
            })
        }
    }
    onDataSelect(e) {
        this.setState({
            displayDialog: true,
            activeItem: e.data
        });
    }
    render() {
        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} icon="pi pi-plus" label="Add" onClick={this.addNew.bind(this)} />
        </div>
        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button icon="pi pi-times" label="Delete" onClick={this.delete.bind(this)} />
            <Button label="Save" icon="pi pi-check" onClick={this.save.bind(this)} />
        </div>;
        return <div className="p-grid">
            <div className="p-col-12">
                <div className="card card-w-title">
                    <h1>DataTable</h1>
                    <DataTable value={this.props.Data}
                        paginatorPosition="bottom"
                        selectionMode="single"
                        header="Data List"
                        paginator={true}
                        footer={footer}
                        rows={10}
                        responsive={true}
                        selection={this.state.dataTableSelection}
                        onRowSelect={this.onDataSelect.bind(this)}
                        onSelectionChange={event => this.setState({ dataTableSelection: event.data })}>
                        <Column field="id" header="Id" sortable={true} />
                        <Column field="name" header="Name" sortable={true} />
                    </DataTable>
                    <Dialog visible={this.state.displayDialog} width="300px" header="Details" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                        {
                            this.state.activeItem &&

                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{ padding: '.75em' }}>
                                    <label>Id</label>
                                </div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText
                                        disabled={true}
                                        onChange={(e) => {
                                            const { activeItem } = this.state;
                                            activeItem.id = e.target["value"];
                                            this.setState(activeItem);
                                        }}
                                        value={this.state.activeItem && this.state.activeItem.id ? this.state.activeItem.id : ""} />
                                </div>

                                <div className="p-col-4" style={{ padding: '.75em' }}>
                                    <label>Name</label>
                                </div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText
                                        onChange={(e) => {
                                            const { activeItem } = this.state;
                                            activeItem.name = e.target["value"];
                                            this.setState(activeItem);
                                        }}
                                        value={this.state.activeItem && this.state.activeItem.name ? this.state.activeItem.name : ""} />
                                </div>
                            </div>
                        }
                    </Dialog>
                </div>
            </div>
        </div>
    }
}

// export default Data;
export default connect(
    (state: ApplicationState) => state.Demo,
    DemoState.actionCreators
)(Data);