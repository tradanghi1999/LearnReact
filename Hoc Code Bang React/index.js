import { CustomerTable } from './custable.js'

class App extends React.Component {
    state = {
        isLoading: true,
        data: null,
    }
    componentDidMount() {
        // rxjs.from(ajax.getXML(url))
        //     .pipe(
        //         rxjs.operators.map(xml => xml.getElementsByTagName("Employee")),
        //         rxjs.operators.map(xmls => {
        //             let items = []
        //             for (let i = 0; i < xmls.length; i++) {
        //                 items.push({
        //                     id: xmls[i].attributes['id'].value,
        //                     title: xmls[i].attributes['title'].value,
        //                     name: xmls[i].children[0].innerHTML,
        //                     phone: xmls[i].children[1].innerHTML
        //                 })
        //             }
        //             return items
        //         })
        //     )
        //     .subscribe(data => {
        //         const unique = (value, index, self) => {
        //             return self.indexOf(value) === index
        //         }
        //         let types = data.map(x => x.title)
        //             .filter(unique)
        //         this.setState({
        //             isLoading: false,
        //             data: data
        //         })
        //     })
    }

    render() {
        const { isLoading, data } = this.state
        if (isLoading)
            return (
                <React.Fragment>
                    <img src="https://raw.githubusercontent.com/tradanghi1999/LearnReact/main/Hoc%20Code%20Bang%20React/loading.svg" />
                </React.Fragment>
            )



        return (
            <React.Fragment>
                <CustomerTable
                    rowDatas={data}
                />
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)

