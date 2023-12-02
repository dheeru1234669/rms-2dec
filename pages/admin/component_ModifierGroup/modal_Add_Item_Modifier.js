import React from 'react';
import Select, { components } from "react-select";


var selected_group_options=[];
export default class ModifierAddItemModal extends React.Component { 

    constructor(props){
        super(props)
        this.state={modifierOption:[],ismodifier:0, add_item:{display_name:''},add_item_array1:[],add_item_array3:[], add_option: [{item_id:"",varient_id:"",option:"", price:"",amount:"",map_modifier_group_id:""}], selectedOptions:[],
                    field1: '', field2: '', field3: '', activeField: '', parent_item_data:[],item_quantity:1 }
        this.items=[]
        this.api_items=[]
        this.modifiregroup=[]
    }


    componentDidMount(){
        this.state.parent_item_data=this.props.data_from_parent
        this.state.edit = this.props.edit
        console.log("Edit_Value: ", this.props.edit)
        this.get_items()
        this.get_modifiers_group()
        // if(this.props.edit)
        // this.handleedit()
    }

    
   
    async get_items(){
        const{parent_item_data} = this.state
        var res = await app.get('/admin/all-item');
        if (res.status){        
        this.setState({items:res.data.dropdown})
        this.setState({api_items:res.data.dropdown})
        if(!this.props.edit && parent_item_data.length>0)
        {
                const updatedoptions = res.data.dropdown.filter((option)=>!parent_item_data.includes(option.label))
                this.setState({items:updatedoptions})
                this.setState({api_items:updatedoptions})           
        }
        }
    }

    async get_modifiers_group(){
        var res = await app.get('/admin/modifier-group-for-item');
        if(res.status){
            this.setState({api_modifiregroup:res.data.dropdown})
            this.setState({modifiregroup:res.data.dropdown})
        if(selected_group_options.length > 0){
            const updatedgroups = res.data.dropdown.filter((option)=>!selected_group_options.includes(option.label))
            this.setState({modifiregroup:updatedgroups})
            this.setState({api_modifiregroup:updatedgroups})
        }            
      }
    } 

    CustomOption = (props) => (
        <components.Option {...props}>
        <div dangerouslySetInnerHTML={{ __html: props.data.name }} />
        </components.Option>
        );

        // handleedit(){
        //     const{parent_item_data,items} = this.state
        //     console.log("parent_item_data: ", typeof parent_item_data)
        //     this.setState({add_item_array1:items.filter((option)=>Object.entries(parent_item_data).includes(option.label))})
        // }

    handleItemChange=(selected_item)=> {
        this.setState({add_item_array1:[selected_item]})
        const updateditems = this.state.api_items.filter(option => {
            if(option.label!=selected_item.label)
            return option
            });
        this.setState({items:updateditems})   
        this.setState({ field1: selected_item, field2: '', field3: '', activeField: 'dropdown'});      
      }
    
      getItemAmount=(e)=>{
        // const{value}=e.target
        this.setState({item_quantity:e.target.value})

      }

        handleChange=(e)=> {
            const { name, value } = e.target;
            this.setState((prevState) => ({add_item: {...prevState.add_item,[name]: value}}));
            this.setState({ field1: '', field2: e.target.value, field3: '', activeField: 'input'});
        }

        
        handleModifierSelect=(selected_group)=> {
            this.setState({add_item_array3:[selected_group]})
            this.setState({ismodifier:1})
            const updatedgroups = this.state.api_modifiregroup.filter(option => {
                if(option.label!=selected_group.label)
                return option
                });
            this.setState({modifiregroup:updatedgroups})   
            this.setState({ field1: '', field2: '', field3: selected_group, activeField: 'select'});    
          }
            
        
        handleDelete = index => () => {
            this.setState({add_item_array1:[]})
            this.setState({items:this.state.api_items})
            }
    
 
     handlesubmitAddModifier=(e)=>
    {        
        e.preventDefault()
        const { add_item_array1}= this.state;
        const { add_item}= this.state;
        const { add_item_array3}= this.state;
        console.log("Add_item: ", add_item)
        var add_item_array = [];
        if(add_item)
        add_item_array.push(add_item)    

        var args={}
        if(add_item_array1.length>0){
            args['add_item_array'] = add_item_array1
        }
        else if(add_item && add_item.display_name){
            args['add_item_array']=add_item_array
        }
        else if (add_item_array3.length>0){
            args['add_item_array']=add_item_array3
        }
        args['item_quantity']=this.state.item_quantity
        args['ismodifier']= this.state.ismodifier
        this.props.onSubmit(args)        
    }  



    
  render() {

    const { isOpen, onClose} = this.props;
    var{items, add_item, add_item_array1, add_item_array3, modifiregroup, selectedOptions,parent_item_data}= this.state
    const isDropdownDisabled = this.state.field2 !== '' || this.state.field3 !== '';
    const isInputDisabled = this.state.field1 !== '' || this.state.field3 !== '';
    const isSelectDisabled = this.state.field1 !== '' || this.state.field2 !== '';
    console.log("parent_item_data: ", parent_item_data)
    console.log("items: ", items)
    if (!isOpen) return null;
    
    return ( 
        <> 
        <div className="modal-overlay ">
            <div className="modal-dialog topheightmodal w-50 mx-auto">
                <div className="modal-content w-50 mx-auto ">                    
                    <div className="modal-header border border-0 pb-0">
                        <h3 className='heading text-dark'>Add Modifier</h3>
                        <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div className="container"></div>
                    <div className="modal-body">
                        <form method='post' onSubmit={(event)=>this.handlesubmitAddModifier(event)}>
                            
                            {/* // 1. To select item from already listed Items. */}
                            <div className="modal-body mt-0 pt-0" >
                                <div className="form-group main-select-box mt-3">
                                    <div className='col' >
                                        <div className="dropdown-container">
                                        <Select
                                            key={items}
                                            options={items}
                                            components={{ Option: this.CustomOption }}
                                            placeholder="Select Item"
                                            value={''}
                                            onChange={this.handleItemChange}
                                            isSearchable={true}
                                            isDisabled={isDropdownDisabled}
                                        /> 
                                        </div>
                                    </div>
                                </div>
                                   
                                {add_item_array1 && add_item_array1.map((row_wise,index)=>(
                                 <div key={index} className='row'>
                                    <div className='col-sm-9'>
                                        <div className="modicoca-card d-flex p-1">
                                            <div className="waiter-heading extra-data">
                                                <div className='top-value coca-value'>{row_wise.display_name}</div>
                                                <span className="dropdown-row">{row_wise.display_price}|{row_wise.display_cat}</span>                                    
                                                <img src='../../../assets/images/icon-delete.png'  onClick={this.handleDelete(index)} className='modifir-popdelete'/> 
                                            </div>
                                        </div>              
                                    </div>
                                    <div className='col-sm-3'>
                                        <label className="form-check-label">
                                            <span className='peragraph'>Amount</span>
                                        </label>
                                        <input type="text" className="form-control date-time mt-2" name='item_quantity' onChange={this.getItemAmount} placeholder="1" />
                                    </div>
                                </div>
                                ))}                         
                            </div>

                            <p className='modif-or text-center pt-1'>OR</p>

                            {/* // 2. Add a new option by creating a new data */}
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <span className='peragraph'>Add option</span>
                                    <input type="text" className="form-control date-time" name="display_name" disabled={isInputDisabled} onChange={this.handleChange} placeholder="Eg. Yes (fries and a drink)" />
                                </div>
                                <div className='col-sm-3'>
                                    <label className="form-check-label">
                                        <span className='peragraph'>Price</span>
                                    </label>
                                    <input type="text" className="form-control date-time"  name="display_price" disabled={isInputDisabled} onChange={this.handleChange} placeholder="00.00" />
                                </div>
                                <div className='col-sm-3'>
                                    <label className="form-check-label">
                                        <span className='peragraph'>Amount</span>
                                    </label>
                                    <div className="customselect w-100 h-50">
                                        <select className='add-modify-select' name="amount" onChange={this.handleChange} disabled={isInputDisabled}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>                        
                                </div>
                            </div>
                            <p className='modif-or text-center pt-1'>OR</p> 

                            {/* //3. Add a modifier group.                                */}
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
                                            onChange={this.handleModifierSelect}
                                            isSearchable={true}
                                            isDisabled={isSelectDisabled}
                                        />
                                        </div>
                                    </div>
                                </div>

                                {add_item_array3 && add_item_array3.map((row_wise,index)=>(
                                <div key= {index} className='row mt-2'>
                                   
                                    <div className='col-sm-6'>
                                        <label className="form-check-label">
                                            <span className='peragraph'>Modifiers group name</span>
                                        </label>
                                        <input type="text" className="form-control date-time" onChange={this.handleChange} placeholder="Make that a meal?" value={row_wise.name} />
                                    </div>
                                    <div className='col-sm-5'>
                                        <label className="form-check-label">
                                            <span className='peragraph'>Options</span>
                                        </label>
                                        <div className="customselect w-100 h-50">
                                            <select className='add-modify-select'>
                                                <option>{row_wise.modifier_group_items}</option>
                                            </select>
                                        </div>                        
                                    </div>
                                </div>
                                ))}
                            </div>   

                            <div className="modal-footer border border-0">
                                <div className='d-flex justify-content-between'>
                                    <div className='builder'>
                                        <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                                        <button type="submit" className='menu-item right btn-radius green-btn'  >Add</button>
                                    </div>
                                </div>
                            </div>
                        </form>                     
                    </div>               
                </div>
            </div>
        </div>
           
            </>
    );
  }
}
