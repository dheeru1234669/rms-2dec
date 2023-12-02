import React from 'react';
import Select, { components } from "react-select";

var T_args={}; var selected_item_option = []
export default class ExtraGroupAddModal extends React.Component {
  constructor(props){
    super(props);
    this.state={selectedOptions:[], extrasgroup:[]}   
  }

  componentDidMount(){
    this.get_extras_group() 
  } 

  CustomOption = (props) => (
    <components.Option {...props}>
    <div dangerouslySetInnerHTML={{ __html: props.data.name }} />
    </components.Option>
    );

  async get_extras_group(){
    var res = await app.get('/admin/extras-group');
    if(res.status){
    this.setState({extrasgroup:res.data.dropdown})

    if(selected_item_option.length > 0){
    const updatedoptions = res.data.dropdown.filter((option)=>!selected_item_option.includes(option.label))
    console.log("ttt", updatedoptions);
    this.setState({extrasgroup:updatedoptions})
  }

  }
}

    handleChange=(e)=>{
      console.log("Data_checked")
    }

   handleSelect=(selected)=> {
    selected_item_option.push(selected.label)
    this.setState({selectedOptions: [...this.state.selectedOptions, {name:selected.name, label:selected.label, 
      display_name:selected.display_name, display_price:selected.display_price, display_size:selected.display_size, 
      display_option:selected.extra_group_items, checked:true}]})
      const updatedoptions = this.state.extrasgroup.filter(option => {
        if(!selected_item_option.includes(option.label))
        return option
        });
      console.log("updatedoptions:",updatedoptions)
      this.setState({extrasgroup:updatedoptions})
  }

  handleCheckboxChange = (value) => {
    console.log("checked", value)
    this.setState((prevState)=>({
      selectedOptions:prevState.selectedOptions.map((item)=> 
      item.label === value?{...item, checked:!item.checked}:item),
    }), this.handleRemoveUncheckedItems);
  }

  handleRemoveUncheckedItems = () => {
    this.setState((prevState) => ({
      selectedOptions: prevState.selectedOptions.filter((item) => item.checked),
    }));
  };

  handleSubmitAddExtra=(e)=>{
    e.preventDefault()
    const { selectedOptions } = this.state;       
    this.props.onSubmit(this.state.selectedOptions)
  }


       
  render() {
    const { isOpen, isClose} = this.props;    
    if (!isOpen) return null;
    var{extrasgroup, selectedOptions }= this.state
    console.log("selectedOptions_type: ",typeof selectedOptions)

  
    return ( 
        <> 
            <div className="modal-overlay ">
              <div className="modal-dialog topheightmodal w-50 mx-auto">
                <div className="modal-content w-50 mx-auto ">
                  <div className="modal-header border border-0 pb-0">
                    <h3 className='heading text-dark'>Add Extras Group</h3>
                    <button type="button" className="btn-close" onClick={isClose} data-bs-dismiss="modal" aria-hidden="true"></button>
                  </div>
                  <form method="post" onSubmit={(event)=>this.handleSubmitAddExtra(event)}>
                  <div className="modal-body mt-0 pt-0">
                    <div className="form-group mt-3">
                      <div className='col'>
                        <div className="dropdown-container">
                          <Select
                            key={extrasgroup}
                            options={extrasgroup}
                            components={{ Option: this.CustomOption }}
                            placeholder="Select Extra Group"
                            value={""}
                            name="all_colors"
                            onChange={this.handleSelect}
                            isSearchable={true}
                          />
                        </div>
                      </div>
                    </div>

                    {selectedOptions && selectedOptions.map((row_wise,index)=>(
                    <div key= {index} className='row mt-2'>
                      <div className='col-sm-1 mt-4'>
                        <input type="checkbox" className="form-check-input" onChange={()=>this.handleCheckboxChange(row_wise.label)} id="check1" name={row_wise.name} value={row_wise.label} checked={true}/>
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
                        <button type='button' className='menu-item right btn-radius text-secondary border border-secondary' onClick={isClose}>Cancel</button>
                        <button className='menu-item right btn-radius green-btn' type='submit'>Apply</button>
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
