import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/lib/Table';
import Client from './client';

const styles = {
    container: {
        background: '#f6f7f8',
        border: '1px solid #cdced0',
        borderRadius: 2,
        boxShadow: '0 1px 1px rgba(0,0,0,0.05)'
    }
};

const OptionsGrid = React.createClass({
    getInitialState: function() {
        return { instruments : []};
    },
    componentDidMount: async function() {
        const instruments = await Client.getOptionsChain("FB");
        this.setState({
            instruments: instruments.instruments
        })
    },
    render: function() {
        const strikes = this.state.instruments.map(function(strike) {
            return (
                <tr>
                    <td>{strike.call.expiry}</td>
                    <td>{strike.call.price}</td>
                    <td>{strike.call.vol}</td>
                    <td>{strike.strike}</td>
                    <td>{strike.put.vol}</td>
                    <td>{strike.put.price}</td>
                    <td>{strike.put.expiry}</td>
                </tr>)
        });

        return (
                <Table>
                    <thead>
                        <tr>
                            <th colSpan="7">FB</th>
                        </tr>
                        <tr>
                            <th>Expiry</th>
                            <th>Price</th>
                            <th>Vol</th>
                            <th>Strike</th>
                            <th>Vol</th>
                            <th>Price</th>
                            <th>Expiry</th>
                        </tr>
                    </thead>
                    <tbody>
                        {strikes}
                    </tbody>
                </Table>
        );
    }
});

ReactDOM.render(<OptionsGrid />, document.getElementById('app'));