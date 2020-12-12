import *  as React from 'https://unpkg.com/react@16/umd/react.development.js'
import * as ReactDOM from 'https://unpkg.com/react-dom@16/umd/react-dom.development.js'
import * as antd from 'https://cdnjs.cloudflare.com/ajax/libs/ant-design-pro/2.3.2/ant-design-pro.min.js'

//console.log(ReactDOM);
class App extends React.Component {
    render() {
        return (
            React.createElement('h1', null, 'Hello')
        )
    }
}

const app = React.createElement(App, null, null)

ReactDOM.render(
    app,
    document.getElementById("root")
)