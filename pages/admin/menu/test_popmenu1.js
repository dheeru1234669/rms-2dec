import React, { Component } from 'react';

class DropdownMenu extends Component {
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
                <div className="dropdown">
                <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                onClick={this.toggleDropdown}
                >
                {this.state.selectedOption}
                </button>
                <div
                className={`dropdown-menu${this.state.isOpen ? ' show' : ''}`}
                aria-labelledby="dropdownMenuButton"
                >
                {options.map((option) => (
                            <button
                            key={option}
                            className={`dropdown-item${this.state.selectedOption === option ? ' active' : ''}`}
                            onClick={() => this.handleOptionSelect(option)}
                            >
                            {option}
                            </button>
                            ))}
        </div>
            </div>
            );
    }
}

export default DropdownMenu;

