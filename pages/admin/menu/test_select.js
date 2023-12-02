import React from "react";
import Select from "react-select";

export default class typehead extends React.Component {

    constructor(props){
        super(props)
            this.state={selectedOptions:{ value: "green", label: "Green" }}
        this.optionList = [
        { value: "red", label: "Red" },
        { value: "green", label: "Green" },
        { value: "yellow", label: "Yellow" },
        { value: "blue", label: "Blue" },
        { value: "white", label: "White" }
        ]

    }



    handleSelect = (selectedOptions)=>{
        console.log("selff=== ", selectedOptions)
        this.setState({selectedOptions});
    }
    render(){
        return (
                <div className="app">
                <h2>Choose your color</h2>
                <div className="dropdown-container">

                <Select
                options={this.optionList}
                placeholder="Select color"
                value={this.state.selectedOptions}
                name="all_colors"
                onChange={this.handleSelect}
                isSearchable={true}
                />
                
                </div>
                </div>
               );
    }
}
