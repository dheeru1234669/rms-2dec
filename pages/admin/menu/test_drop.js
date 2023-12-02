import React from "react";
import Select, { components } from "react-select";
export default class typehead extends React.Component {
    constructor(props){
        super(props)
this.options = [
{ value: "1", label: "<strong>Option 1</strong>" , name:"<strong>Option 1</strong>"},
{ value: "2", label: "<em>Option 2</em>", name:'f2' },
{ value: "3", label: "<div className='top-value' >Potato</div><span className='dropdown-row'>100|s</span>", name:'f3' },
];


    }
    CustomOption = (props) => (
        <components.Option {...props}>
        <div dangerouslySetInnerHTML={{ __html: props.data.name }} />
        </components.Option>
        );

    sanitizeString = (str) => {
        str.replace( /(<([^>]+)>)/ig, '');
    };

    
    render() {
    return (
            <>
            <Select
            options={this.options}
            components={{ Option: this.CustomOption }}
            isSearchable
            />

            <input type="text"
                value={this.sanitizeString("<div className='top-value' >cock</div><span className='dropdown-row'>100|s</span>")}
                readOnly
            />

             <div
                   contentEditable
                         className="textbox"
                                     dangerouslySetInnerHTML={{ __html: this.options[2].label }}
                                         />
            </>
           );
};
}
