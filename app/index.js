import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/lib/Table';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Client from './client';

const styles = {
    container: {
        background: '#f6f7f8',
        border: '1px solid #cdced0',
        borderRadius: 2,
        boxShadow: '0 1px 1px rgba(0,0,0,0.05)'
    }
};

const Application = React.createClass({
    getInitialState: function() {
        return {
            selectedSymbol: "AAPL", 
            symbols: [ "AAPL", "FB", "MSFT" ]
        };
    },
    selectSymbol: function(e) {
        const symbol = e.target.textContent;
        console.log("Clicked " + symbol);
        this.setState({
            selectedSymbol: symbol
        });
    },
    render: function() {
        let clickHandle = this.selectSymbol
        const buttons = this.state.symbols.map(function(symbol) {
            return (<Button bsStyle="primary" bsSize="large" onClick={clickHandle}>{symbol}</Button>);
        })

        return (
            <div>
                <ButtonToolbar>
                    {buttons}
                </ButtonToolbar>
                <OptionsGrid symbol={this.state.selectedSymbol}/>
            </div>
        );
    }
});

const OptionsGrid = React.createClass({
    getInitialState: function() {
        return { instruments : []};
    },
    componentDidMount: async function() {
        const symbol = this.props.symbol;
        const instruments = await Client.getOptionsChain(symbol);
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
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th colspan="3"></th>
                            <th colSpan="2">{this.props.symbol}</th>
                            <th>150.96</th>
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

ReactDOM.render(<Application />, document.getElementById('app'));