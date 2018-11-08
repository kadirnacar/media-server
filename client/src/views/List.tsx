import * as React from 'react';
import { connect } from 'react-redux';
import * as DemoState from '../reducers/demo';
import { ApplicationState } from '../store';

class List extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getList().then(() => {
            console.log(this.props);
        })
    }

    render() {
        return <div>
            <table>
                <thead>
                    <tr>
                        <td colSpan={3}>
                            <button onClick={(event) => {
                                this.props.createItem({ id: Math.random(), name: "deneme" })
                            }}>create</button>
                        </td>
                    </tr>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.Data.map((item, index) => {
                            return <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <button onClick={(event) => {
                                        this.props.updateItem(item.id, { name: "deneme" })
                                    }}>edit</button>
                                    <button onClick={(event) => {
                                        this.props.deleteItem(item.id)
                                    }}>delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.Demo,
    DemoState.actionCreators
)(List);