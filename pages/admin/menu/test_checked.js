import React, { Component } from 'react';

class ExampleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
checkedItems: {
extraKey: [], // Initialize extraKey as an empty array
              },
        };
    }

    handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        this.setState((prevState) => {
            if(checked) {
                return {checkedItems: {...prevState.checkedItems,extraKey: [...prevState.checkedItems.extraKey, value],[value]: true}};
            } else {
            const { [value]: _, ...newCheckedItems } = prevState.checkedItems;
            return {checkedItems: {...newCheckedItems,extraKey: newCheckedItems.extraKey.filter(item => item !== value)}};
            }
        });
};

render() {
    const { checkedItems } = this.state;
    console.log(checkedItems)

    const items = ['item1', 'item2'];

    return (
            <div>
            {/* Render checkboxes dynamically using map */}
            {items.map(item => (
                        <label key={item}>
                        <input
                        type="checkbox"
                        value={item}
                        checked={!!checkedItems[item]}
                        onChange={this.handleCheckboxChange}
                        />
                        {item}
                        </label>
                        ))}
            </div>
           );
}
}

export default ExampleComponent;

