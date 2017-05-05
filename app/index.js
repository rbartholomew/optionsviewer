import React from 'react';
import ReactDOM from 'react-dom';
import FileContainer from './filecontainer';
import Client from './client';

const styles = {
    container: {
        background: '#f6f7f8',
        border: '1px solid #cdced0',
        borderRadius: 2,
        boxShadow: '0 1px 1px rgba(0,0,0,0.05)'
    },
    inputelement: {
        margin: '10px',
    },
    column: {
        paddingRight: '20px'
    },
    depressed: {
        backgroundColor: '#4e69a2',
        borderColor: '#c6c7ca',
        color: '#5890ff'
    }
};

const FileSelector = React.createClass({
    getInitialState: function() {
        return { files: []};
    },
    componentDidMount: async function() {
        let files = await Client.getFiles();
        this.setState({
            files: files.files
        });
    },
    render: function() {
        var fileList = this.state.files.map((file) => {
            return <li>{file}</li>;
        });

        return (
            
            <div>
                <ul>
                    {fileList}
                </ul>
                <FileContainer />
            </div>
        );
    }
});



ReactDOM.render(<FileSelector />, document.getElementById('app'));