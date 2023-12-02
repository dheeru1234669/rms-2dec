import React from 'react';
import { Header, Sidebar } from '../../../src';
import CreateModifierGroupModal from '../component_ModifierGroup/modal_Create_Modifier_Group';



export default class Tag extends React.Component{

	constructor(props){
		super(props);  
        this.state = {modifiers_group_data:[],isdropdownOpen:false,current_index:-1, parent_data:[]}; 
         this.hasMounted = false;    
	}

    async componentDidMount(){
        if(!this.hasMounted)  {
            this.hasMounted = true;
        this.get_modifiers_menu()
        }            
    }   

    async get_modifiers_menu(){
        var res = await app.get('/admin/modifier-group');
        if(res.status)
        this.setState({modifiers_group_data:res.data.dropdown})
    }

    async handleModifierSearch(e){
        e.preventDefault();
        //alert(e.target.value);
        var q = e.target.value;
        if(q) {
        var fd = new FormData();
        fd.append("unique_name",q);
        var res = await app.post('/admin/modifier-group-search',fd);
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;
        }
        if(res.status)
        {
            this.setState({modifiers_group_data:res.data})
        }
        } else {
            this.get_modifiers_menu()
        }
    }

    openModifierGroupCreateModal=(e,data)=>{
        e.preventDefault();
        console.log("Data on parent: ", data)
        this.setState({isModifierGroupCreateModalOpen: true})
        this.setState((prevState) => ({ isdropdownOpen: !prevState.isdropdownOpen }));
        this.setState({parent_data:data})
    } 
      
    closeModifierGroupCreateModal=()=>{
        this.setState({isModifierGroupCreateModalOpen: false})
    }

    getCreateModifierGroupdata = (valuefromCreateModifiermodal)=>{
        this.setState({ isModifierGroupCreateModalOpen: false })
        this.get_modifiers_menu();
    }

    getModifierGroupID=(e,id,index,name)=>{
        e.preventDefault();
        this.setState({color_update:id})
        this.setState({data_item:this.state.modifiers_group_data[index].modifier_group_items_arr})  
        this.setState({group_name:name})      
      } 

    togglemodifierDropdown= index => (event) => {
        this.setState((prevState) => ({ isdropdownOpen: !prevState.isdropdownOpen }));
        this.setState((prevState) => ({
              current_index: prevState.current_index === index ? null : index,
                  }));
    };
 


	render() {
        
        var {modifiers_group_data, isModifierGroupCreateModalOpen,isdropdownOpen, data_item, group_name,current_index} = this.state
       
        const {parent_data} = this.state
        
		return(
		<>            
            <div className="container-fluid">
                <div className='row'>
                    <Header/>
                </div>
                <div className='row'>
                    <div className='col-md-2'>
                        <Sidebar/>
                    </div>
                    <div className='col-lg-10 p-0'>
                        <div className='wraper pb-5'>
                            <div className='row'>
                                <div className='col'>
                                    <div className='d-flex justify-content-between'>
                                        <div className='extra w-25'>
                                            <h5 className='menu-item tag fw-bold mb-4 mt-4'>Modifiers</h5>
                                            <input type="text" className="form-control date-time" placeholder="Search" onChange={(event)=>this.handleModifierSearch(event)}/>
                                        </div>
                                        <div className='extra'>
                                            <button type='button' className='menu-item btn-radius mb-4 mt-4' onClick={this.openModifierGroupCreateModal}>Create Modifier Group 
                                                <span className='btn-icon'>
                                                    <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    {modifiers_group_data.map((data,index)=>(
                                    <div key={index} className="card mt-2">
                                        <div className='edit-duplicate-icon' >
                                            <div className='ellipsis-icon'>
                                                <div className="dropdown">
                                                    <button type="button" className="dropdown drop-down bg-white border border-0" onClick={this.togglemodifierDropdown(index)}>
                                                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                    </button>
                                                    <ul className={`dropdown-menu  p-0 ${current_index == index && isdropdownOpen? ' show' : ''}`}>
                                                        <li>
                                                            <a key="edit" className="dropdown-item extra-item border border-bottom border border-top-0" onClick={(event)=>this.openModifierGroupCreateModal(event,data)}>Edit name</a>
                                                        </li>
                                                        <li>
                                                            <a name="duplicate" className="dropdown-item extra-item border border-bottom" >Duplicate</a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item extra-item border border-bottom border border-bottom-0" >Removes</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body p-2" onClick={(event)=>this.getModifierGroupID(event,data.label,index,data.name)} id={data.label}>
                                            
                                            <h3 className={`extras-title mb-0 ${this.state.color_update==data.label?'update':''}`}>{data.name}</h3>
                                            <div className='extra-item pt-0'>{data.unique_name}</div>
                                        </div>
                                    </div>
                                    ))}                                    
                                </div>
                                
                                {data_item!=null && data_item!=[] && data_item!=undefined && data_item.length>0?(
                                <div className='col-lg-8'>
                                    <div className='d-flex justify-content-between mt-4'>
                                        <div className='builder'>
                                            <button className='menu-item right btn-radius pink-btn' data-bs-toggle="modal" href="#myModal2">Delete</button>
                                        </div>
                                        <div className='builder'>
                                            <button className='btn-radius right mt-2'data-bs-toggle="modal" href="#ExtraAddItemspop">Add items 
                                                <span className='btn-icon'>
                                                    <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                            <button className='menu-item right btn-radius green-btn'>Apply</button>
                                        </div>
                                    </div>
                                    
                                    {data_item.map((items,index1)=>        
                                    <div key={index1} className='modifr-drop mt-3 '>          
                                    <div className='card p-2'>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className='right-extra d-flex'>
                                                    <span className='equal text-muted'>=</span>
                                                    <div className='extra-data'>
                                                        <h3 className='peragraph text-secondary mb-0'>{items.display_name}</h3>
                                                        <div className='extra-item pt-0'>Found In: {items.display_cat?items.display_cat:group_name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className='left-extra d-flex'>
                                                    <span className='input-extra justify-content-end'>
                                                    <h3 className='peragraph text-secondary mt-1'>{items.display_price}</h3>
                                                    </span>
                                                    <div className='edit-duplicate-icon'>
                                                        <div className='ellipsis-icon ellipsis-icon ellipsis-modify'>
                                                            <div className="dropdown">
                                                                <button type="button" className="dropdown drop-down dropright-icon bg-white border border-0" >
                                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                </button>
                                                                <ul className="dropdown-menu">
                                                                    {/* <li>
                                                                        <a className="dropdown-item extra-item border-border-0"data-bs-toggle="modal" name="edit" onClick={(e)=>this.openModifierAddItemModal(e)} >Edit name</a>
                                                                    </li> */}
                                                                    <li>
                                                                        <a className="dropdown-item extra-item  border-border-0"  >Add modifier group</a>
                                                                    </li>
                                                                    <li>
                                                                        <a className="dropdown-item extra-item border-border-0" >Remove</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {items.option_modifier_group_data && items.option_modifier_group_data.length>0 && items.option_modifier_group_data.map((group_item_option,number)=> 
                                            <div key={number} className='small-right-modifir ' >
                                                <div className='top-meal-modifr'>
                                                    <div className='row'>
                                                        <div className='card p-2 mt-2'>                                                            
                                                            <div className='row'>
                                                                <div className='col-sm-6'>
                                                                    <div className='right-extra d-flex'>
                                                                        <div className='extra-data'>
                                                                            <h3 className='peragraph text-secondary choose-text mb-0'>{group_item_option.display_name}</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-sm-6'>
                                                                    <div className='left-extra d-flex'>
                                                                        <span className='input-extra justify-content-end'>
                                                                            <h3 className='peragraph text-secondary choose-text mb-0'>{group_item_option.display_price}</h3>
                                                                        </span>
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>   
                                                        </div>                                              
                                                    </div>
                                                </div>
                                            </div>
                                            )}
                                    { items.option_modifier_group_data &&  items.option_modifier_group_data.modifier_group && items.option_modifier_group_data.modifier_group.map((group_item,index2)=>                                     
                                        <div key={index2} className='p-1'>
                                            <div className='d-flex justify-content-between'>
                                                {/* <div className='modifer_img'>
                                                    <i class= {`${isitemOpen?"fa fa-angle-down modifer_icon":"fa fa-angle-right modifer_icon"}`} aria-hidden="true"></i>
                                                </div> */}
                                                <div class="modifer_img"><i class="fa fa-angle-right modifer_icon" aria-hidden="true"></i></div>
                                                <div className='modifer_making_tab'>
                                                    <div className='card p-2 mt-2'>
                                                        <div className='row'>
                                                            <div className='col-sm-12'>
                                                                <div className='right-extra d-flex'>
                                                                    <span className='equal text-muted'>=</span>
                                                                    <div className='extra-data'>
                                                                        <h3 className='peragraph text-secondary choose-text mb-0 mt-1'>{items.option_modifier_group_data.group_options_name[group_item.map_modifier_group_id].name}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-sm-6'>
                                                                <div className='left-extra d-flex'>
                                                                    <span className='input-extra justify-content-end'>
                                                                        <h3 className='peragraph text-secondary choose-text mb-0 mt-1'></h3>
                                                                    </span>
                                                                    <div className='edit-duplicate-icon'>
                                                                        <div className='ellipsis-icon ellipsis-modify'>
                                                                            <div className="dropdown">
                                                                                <button type="button" className="dropdown drop-down dropright-icon bg-white border border-0">
                                                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                                </button>
                                                                                <ul className="dropdown-menu">
                                                                                    {/* <li>
                                                                                        <a className="dropdown-item extra-item border-border-0"data-bs-toggle="modal">Edit name</a>
                                                                                    </li> */}
                                                                                    <li>
                                                                                        <a className="dropdown-item extra-item  border-border-0" name='Add_to_item' >Add modifier group</a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a className="dropdown-item extra-item border-border-0">Remove</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 

                                            {items.option_modifier_group_data.group_options_name[group_item.map_modifier_group_id]?.options && items.option_modifier_group_data.group_options_name[group_item.map_modifier_group_id]?.options.map((option_item,index3)=>                                          
                                            <div key={index3} className='small-right-modifir '  >
                                                <div className='top-meal-modifr'>
                                                    <div className='row'>
                                                        <div className='card p-2 mt-2'>                                                            
                                                            <div className='row'>
                                                                <div className='col-sm-6'>
                                                                    <div className='right-extra d-flex'>
                                                                        <div className='extra-data'>
                                                                            <h3 className='peragraph text-secondary choose-text mb-0'>{option_item.display_name}</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-sm-6'>
                                                                    <div className='left-extra d-flex'>
                                                                        <span className='input-extra justify-content-end'>
                                                                            <h3 className='peragraph text-secondary choose-text mb-0'>{option_item.display_price}</h3>
                                                                        </span>
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>   
                                                        </div>                                              
                                                    </div>
                                                </div>
                                            </div>
                                            )}
                                            
                                            
                                            {group_item.children.length>0 &&                                        
                                                <div className='min_card_modifer'>
                                                    <div className='d-flex justify-content-between'>
                                                        {/* <div className='modifer_img_min' onClick={this.showgroupdata}>
                                                        <i class={`${isgroupOpen?"fa fa-angle-down modifer_icon":"fa fa-angle-right modifer_icon"}`} aria-hidden="true"></i>
                                                        </div> */}
                                                        <div class="modifer_img">
                                                        <i class="fa fa-angle-right modifer_icon modifer_img_min" aria-hidden="true"></i>
                                                        </div>
                                                        <div className='modifer_makingmin_tab'>
                                                            <div className='card p-2 mt-2'>
                                                                <div className='row'>
                                                                    <div className='col-lg-12'>
                                                                        <div className='right-extra d-flex'>
                                                                            <span className='equal text-muted'>=</span>
                                                                            <div className='extra-data'>
                                                                                <h3 className='peragraph text-secondary choose-text mb-0 mt-1'>{items.option_modifier_group_data.group_options_name[group_item.children[0]?.map_modifier_group_id]?.name}</h3>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> 

                                                    {items.option_modifier_group_data.group_options_name[group_item.children[0]?.map_modifier_group_id]?.options && items.option_modifier_group_data.group_options_name[group_item.children[0]?.map_modifier_group_id]?.options.map((suboption_item,index4)=>                                           
                                                    <div key={index4} className='small-right-modifir '  >
                                                        <div className='meal_small-modifr'>
                                                            <div className='row'>
                                                                <div className='card p-2 mt-2'>                                                            
                                                                    <div className='row'>
                                                                        <div className='col-sm-9'>
                                                                            <div className='right-extra d-flex'>
                                                                                <div className='extra-data'>
                                                                                    <h3 className='peragraph text-secondary choose-text mb-0'>{suboption_item.display_name}</h3>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-sm-3'>
                                                                            <div className='left-extra d-flex'>
                                                                                <span className='input-extra justify-content-end'>
                                                                                    <h3 className='peragraph text-secondary choose-text mb-0'>{suboption_item.display_price}</h3>
                                                                                </span>
                                                                                
                                                                            </div>
                                                                        </div>
                                                                    </div>   
                                                                </div>                                              
                                                            </div>
                                                        </div>
                                                    </div>
                                                    )}
                                                </div>                                       
                                            }


                                        </div>                                       
                                    )}                                 
                                </div> 
                            )}


                                    <div className="data_select mt-3 mb-1">
                                        <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something"></input>
                                        <label className='peragraph extra-data'>Require customers to select an item?</label>
                                    </div>
                                    <div className="data_select">
                                        <label className='modifer_label'>What is the maximum amount of items customers can select?</label>
                                        <div className="customselect">
                                            <select>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form data_select mt-4">
                                        <label className='modifer_label'>How many times can a customer select any single item?</label>
                                        <div className="customselect">
                                            <select>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* <form>
                                    <div class="form_data mt-3">
                                        <input class="form-check-input" type="checkbox" id="check1" name="option1" value="something"/>
                                    <label class="modifer_check">Require customers to select an item?</label>
                                    </div>
                                    <div class="form_data create-price"> <label class="date-time modifer_label p-0">What is the maximum amount of items customers can select?</label>
                                    <div class="customselect">1</div>
                                    </div>
                                    <div class="form_data create-price p-0 m-0"><label class="date-time modifer_label p-0" name="option3">How many times can a customer select any single item?</label>
                                    <select class="customselect">
                                      <option>1</option>
                                       <option>3</option>
                                       <option>4</option>
                                        </select>
                                    </div>
                                    </form> */}
                                </div>
                                 ):null} 

                            </div>
                        </div>
                    </div>
                </div>
            </div>  
 
 

 
    {isModifierGroupCreateModalOpen && (
    <CreateModifierGroupModal isOpen={isModifierGroupCreateModalOpen} onClose={this.closeModifierGroupCreateModal} data_frm_parent={parent_data} onSubmit={this.getCreateModifierGroupdata}/>
    )} 
   	</>
    )}
}
