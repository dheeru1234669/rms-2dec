import React from 'react';
import Select, { components } from "react-select";

var T_args={};
export default class AddModifierGroupModal extends React.Component {
  constructor(props){
    super(props);
        
    this.state={selectedOptions:[] , selectedCheckboxes:[], data_from_Parent:""}
    this.modifiregroup=[]
   
  }

  componentDidMount(){
    
    const {data_from_Parent} = this.props 
    console.log("Parent_data: ", data_from_Parent)       
        if(data_from_Parent){            
        this.setState({data_from_Parent}) 
         }  
         setTimeout(() => {
          this.get_modifiers_group()
        }, 1000);
        //  this.get_modifiers_group()
  }

  CustomOption = (props) => (
    <components.Option {...props}>
    <div dangerouslySetInnerHTML={{ __html: props.data.name }} />
    </components.Option>
    );

  async get_modifiers_group(){
    console.log("Parent_item_data:", this.state.data_from_Parent)
    var url = this.state.data_from_Parent=="Add_to_item"?'/admin/modifier-group-for-item':'/admin/modifier-group'
    console.log("URL_Value", url)
    var res = await app.get(url);
    if(res.status){
    this.setState({modifiregroup:res.data.dropdown})
    console.log("Extra_API_Data: ",this.state.modifiregroup)
  }
}

    handleChange=(e)=>{
      console.log("Data_checked")
    }


  // Function triggered on selection
  handleModifierSelect=(selectedOptions)=> {
    console.log("SelectedValue", selectedOptions.label)
    // this.setState({selectedOptions})
    this.setState({selectedOptions: [...this.state.selectedOptions, {name:selectedOptions.name, label:selectedOptions.label, 
      display_option:selectedOptions.modifier_group_items, display_option_arr: selectedOptions.modifier_group_items_arr}]} )
  }

  handleCheckbox = (event) => {
    const {name, value, checked} = event.target
console.log("checked", name,value, checked)
if(checked)
{          
    T_args[value]=name
    this.setState({selectedOptions:T_args})
}
else{
    console.log("value,name:",T_args, value, name)
    if(value){
    delete T_args[value];
    this.setState({selectedOptions:T_args})
            }
    }
    
  };

  handleSubmitAddModifier=(e)=>{
    // alert("Check");
    e.preventDefault()
    const { selectedOptions } = this.state;
    console.log('Selected:', selectedOptions);        
    this.props.onSubmit(this.state.selectedOptions)
  }


       
  render() {
    const { isOpen, isClose} = this.props;    
    if (!isOpen) return null;
    var{modifiregroup, selectedOptions }= this.state
    console.log("selectedOptions_type: ",typeof selectedOptions)
    console.log("API_Data: ", this.state.modifiregroup)

    return ( 
        <> 
            <div className="modal-overlay ">
              <div className="modal-dialog topheightmodal w-50 mx-auto">
                <div className="modal-content w-50 mx-auto ">
                  <div className="modal-header border border-0 pb-0">
                    <h3 className='heading text-dark'>Add Modifier Group</h3>
                    <button type="button" className="btn-close" onClick={isClose} data-bs-dismiss="modal" aria-hidden="true"></button>
                  </div>
                  <form method="post" onSubmit={(event)=>this.handleSubmitAddModifier(event)}>
                  <div className="modal-body mt-0 pt-0">
                    <div className="form-group mt-3">
                      <div className='col'>
                        <div className="dropdown-container">
                          <Select
                            key={modifiregroup}
                            options={modifiregroup}
                            components={{ Option: this.CustomOption }}
                            placeholder="Select Modifier Group"
                            value={""}
                            name="all_colors"
                            onChange={this.handleModifierSelect}
                            isSearchable={true}
                          />
                        </div>
                      </div>
                    </div>

                    {selectedOptions.map((row_wise,index)=>(
                    <div key= {index} className='row mt-2'>
                      <div className='col-sm-1 mt-4'>
                        <input type="checkbox" className="form-check-input" defaultChecked={true} onChange={this.handleCheckbox} id="check1" name={row_wise.name} value={row_wise.label}/>
                      </div>
                      <div className='col-sm-6'>
                        <label className="form-check-label">
                          <span className='peragraph'>Extras group name</span>
                        </label>
                        <input type="text" className="form-control date-time" onChange={this.handleChange} placeholder="Make that a meal?" value={row_wise.name} />
                      </div>
                      <div className='col-sm-5'>
                        <label className="form-check-label">
                          <span className='peragraph'>Options</span>
                        </label>
                        <div className="customselect w-100 h-50">
                          <select className='add-modify-select'>
                            <option>{row_wise.display_option}</option>
                          </select>
                        </div>                        
                      </div>
                    </div>
                    ))}
                  </div>
                  <div className="modal-footer border border-0">
                    <div className='d-flex justify-content-between'>
                      <div className='tag'>
                        <button className='menu-item right btn-radius text-secondary border border-secondary'>Cancel</button>
                        <button className='menu-item right btn-radius green-btn'data-bs-toggle="modal" href="#Createitempop" type='submit'>Apply</button>
                      </div>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
           
            </>
    );
  }
}
