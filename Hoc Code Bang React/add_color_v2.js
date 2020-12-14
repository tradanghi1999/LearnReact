const AddColorForm = ({ onNewColor = f => f }) => {
    let _title, _color
    const submit = e => {
        e.preventDefault();
        //alert('New Color: ${_title.value} ${_color.value}')
        onNewColor(_title.value, _color.value)
        _title.value = ''
        _color.value = '#000'
        _title.focus()
    }
    return (
        <form onSubmit={submit}>
            <input
                ref={input => _title = input}
                type="text"
                placeholder="color title..." required />
            <input
                ref={input => _color = input}
                type="text" required />
            <button>ADD</button>
        </form>
    )
}

const logColor = (title, color) => {
    console.log('New Color: ' + title + " | " + color)
}

ReactDOM.render(
    <AddColorForm onNewColor={logColor} />,
    document.getElementById("root")
)