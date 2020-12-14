class AddColorForm extends React.Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
    }
    submit(e) {
        const { _title, _color } = this.refs
        e.preventDefault();
        //alert('New Color: ${_title.value} ${_color.value}')
        this.props.onNewColor(_title.value, _color.value)
        _title.value = ''
        _color.value = '#000'
        _title.focus()

    }
    render() {
        return (
            <form onSubmit={this.submit}>
                <input
                    ref="_title"
                    type="text"
                    placeholder="color title..." required />
                <input
                    ref="_color"
                    type="text" required />
                <button>ADD</button>
            </form>
        )
    }
}

AddColorForm.defaultProps = {
    onNewColor: f => f
}

const logColor = (title, color) => {
    console.log('New Color: ' + title + " | " + color)
}

ReactDOM.render(
    <AddColorForm onNewColor={logColor} />,
    document.getElementById("root")
)