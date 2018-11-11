import * as React from 'react';
import { connect } from 'react-redux';
import * as ConfigState from '../../reducers/config';
import { ApplicationState } from '../../store';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export class Config extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            dataTableSelection: null,
            activeItem: {},
            data: []
        }
    }
    componentWillMount() {
        this.props.getConfig().then(() => {
            const data = this.props.Config ? Object.getOwnPropertyNames(this.props.Config.data)
                .map((item, index) => {
                    return { label: item, value: this.props.Config.data[item] };
                }) : [];
            this.setState({ data: data });
        });
    }

    addNew() {
        const { data } = this.state;
        data.push({ label: "", value: "" });
        this.setState({ data: data })
    }
    onEditorValueChange(props, value) {
        const { data } = this.state;
        data[props.rowIndex][props.field] = value;
        this.setState({ data: data });
    }
    inputTextEditor(props) {
        return <InputText type="text" value={props.rowData[props.field]} onChange={(e) => this.onEditorValueChange(props, e.target["value"])} />;
    }

    vinEditor(props) {
        return this.inputTextEditor(props);
    }
    saveConfig() {
        const { data } = this.state;
        let config: any = {};
        data.forEach((item, index) => {
            config[item.label] = item.value;
        });
        this.props.updateItem(config);
    }
    actionTemplate(rowData, column) {
        return <div>
            <Button type="button" icon="fa fa-trash" className="p-button-danger" onClick={() => {
                const { data } = this.state;
                data.splice(column.rowIndex, 1);
                this.setState({ data: data });
            }}></Button>
        </div>;
    }
    render() {
        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} icon="pi pi-plus" label="Add" onClick={this.addNew.bind(this)} />
            <Button style={{ float: 'left' }}  className="p-button-secondary"  icon="pi pi-save" label="Save" onClick={this.saveConfig.bind(this)} />
        </div>
        return <div className="p-grid">
            <div className="p-col-12">
                <div className="card card-w-title">
                    <h1>Configuration</h1>
                    <DataTable value={this.state.data || []} editable={true}
                        footer={footer}>
                        <Column field="label" header="Label" editor={this.vinEditor.bind(this)} />
                        <Column field="value" header="Value" editor={this.vinEditor.bind(this)} />
                        <Column body={this.actionTemplate.bind(this)} style={{ textAlign: 'center', width: '8em' }} />
                    </DataTable>
                </div>
            </div>
        </div>
    }
}

// export default Config;
export default connect(
    (state: ApplicationState) => state.Config,
    ConfigState.actionCreators
)(Config);