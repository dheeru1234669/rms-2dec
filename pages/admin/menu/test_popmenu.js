import React, { Component } from 'react';

class SmallDropdownMenu extends Component {
    constructor() {
        super();
        this.state = {
isOpen: false,
        selectedOption: 'Option 1',
        };
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    };

    handleOptionSelect = (option) => {
        this.setState({ selectedOption: option, isOpen: false });
    };

    render() {
        const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

        return (
                <div>
                <div className="dropdown-container">
                <button className="dropdown-button" onClick={this.toggleDropdown}>
                {this.state.selectedOption}
                </button>
                {this.state.isOpen && (
                        <ul className="dropdown-list">
                        {options.map((option) => (
                                    <li key={option} onClick={() => this.handleOptionSelect(option)}>
                                    {option}
                                    </li>
                                    ))}
                        </ul>
                        )}
                </div>
                </div>
               );
    }
}

export default SmallDropdownMenu;

