import React, { Component } from 'react';

class MyComponent extends Component {
    state = {
isModalOpen: false,
             items: ['Item 1', 'Item 2', 'Item 3'], // Preselected values
             editedItems: [],
    };

    handleModalOpen = () => {
        // Logic to open the modal and set the preselected values for editing
        const { items } = this.state;
        this.setState({ isModalOpen: true, editedItems: [...items] });
    };

    handleModalClose = () => {
        // Logic to close the modal and reset the edited items
        this.setState({ isModalOpen: false, editedItems: [] });
    };

    handleInputChange = (event, index) => {
        // Update the edited item when input changes
        const { editedItems } = this.state;
        const updatedItems = [...editedItems];
        updatedItems[index] = event.target.value;
        this.setState({ editedItems: updatedItems });
    };

    handleSaveItems = () => {
        // Save the edited items and close the modal
        const { editedItems } = this.state;
        this.setState({ items: editedItems, isModalOpen: false, editedItems: [] });
    };

    render() {
        const { isModalOpen, items, editedItems } = this.state;
        return (
                <div>
                <h3>Preselected Items:</h3>
                <ul>
                {items.map((item, index) => (
                            <li key={index}>
                            <input
                            type="text"
                            value={editedItems[index] || ''}
                            onChange={(event) => this.handleInputChange(event, index)}
                            />
                            </li>
                            ))}
                </ul>
                <button onClick={this.handleModalOpen}>Edit All</button>

                {isModalOpen && (
                        <div>
                        <h3>Edit Items:</h3>
                        {editedItems.map((editedItem, index) => (
                                    <div key={index}>
                                    <input
                                    type="text"
                                    value={editedItem}
                                    onChange={(event) => this.handleInputChange(event, index)}
                                    />
                                    </div>
                                    ))}
                        <button onClick={this.handleSaveItems}>Save</button>
                        <button onClick={this.handleModalClose}>Close</button>
                        </div>
                        )}
        </div>
            );
    }
}

export default MyComponent;

