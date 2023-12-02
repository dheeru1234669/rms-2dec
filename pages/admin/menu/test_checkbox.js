import React, { Component } from 'react';

class MultiCheckboxEditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {options : [
              { id: 'option1', label: 'Option 1' },
                      { id: 'option2', label: 'Option 2' },
                                { id: 'option3', label: 'Option 3' },
                                          ],
checkboxValues: { ...props.initialValues },
        };
    }

    async componentDidMount(){
        this.setState({checkboxValues:{'option1':true}})
    }

    handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        this.setState((prevState) => ({
checkboxValues: {
...prevState.checkboxValues,
[name]: checked,
},
}));
};

handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can do something with the updated checkbox values, like submitting to a server.
    console.log('Updated Checkbox Values:', this.state.checkboxValues);
};

render() {
    const { checkboxValues, options } = this.state;

    return (
            <form onSubmit={this.handleSubmit}>
            {options.map((option) => (
                        <label key={option.id}>
                        <input
                        type="checkbox"
                        name={option.id}
                        checked={checkboxValues[option.id]}
                        onChange={this.handleCheckboxChange}
                        />
                        {option.label}
                        </label>
                        ))}
            <button type="submit">Save Changes</button>
            </form>
           );
}
}

export default MultiCheckboxEditForm;

