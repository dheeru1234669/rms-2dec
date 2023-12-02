import React from 'react';
import ModifierAddItemModal from './modal_Add_Item_Modifier';
import AddModifierGroupModal from '../component_ModifierGroup/modal_Add_Modifier_Group';
import RemoveModal from '../component_ExtraGroup/modal_remove';


var M_args={};
export default class CreateModifierGroupModal extends React.Component {

    constructor(props){
        super(props);
        this.state={optionsArray:[], optionArray_item:[], current_option:'',
        item_to_add:"", item_to_addgroup:"",name_Modifier:'', option_id:'',option_index:'', ismodifier:0,
        isRemoveModalopen: false, current_index:-1,isdropdownOpen:false, isModifierAddItemModal: false, isModifierGroupAddModalOpen: false,
        group_index:-1, isgroupdropdownopen:false,isGroupAddModalOpen:false,group_option:'',isitemOpen:false, isgroupOpen:false, edit:false,
        data_parent:[]}
    }

    componentDidMount(){
        if(!this.hasMounted)  {
            this.hasMounted = true;
            console.log("Data From parent: ", this.props.data_frm_parent)
            this.setState({data_parent:this.props.data_frm_parent})
        }            
    } 

    //1. Start- Add Modifier- item, option,modifier group
    openModifierAddItemModal = (e) => {        
        const {name} = e.target
        if(name=="edit")
        {
            this.setState({edit:true})
        }
        console.log("Value: ", name)
        this.setState({ isModifierAddItemModal: true });
        this.setState({ optionArray_item :this.state.optionsArray.map(option => {
                if (!option.ismodifier) {
                  return option.label;
                }
                return null; // or any other value for items that don't meet the condition
              }).filter(option => option !== null)
          }); 
      };
    
      closeModifierAddItemModal = () => {
        this.setState({ isModifierAddItemModal: false });
      };

      getModifierData=(value)=>{
        var{ismodifier,add_item_array} = value
        this.setState({isModifierAddItemModal: false });
        this.setState({optionsArray: [...this.state.optionsArray, add_item_array[0] ]})
        this.setState({ismodifier})
          } 
    //1. End- Add Modifier- item, option,modifier group

    
    // 2. Start - Open Dropdown on click on item, option, modifier group
    togglemodifierDropdown= index => (event) => {
        this.setState((prevState) => ({ isdropdownOpen: !prevState.isdropdownOpen }));
        this.setState((prevState) => ({
              current_index: prevState.current_index === index ? null : index,
                  }));
    };
    // 2. End - Open Dropdown on click on item, option, modifier group

    //3. Start- item, option, modifier group---- Add modifier group
    openModifierGroupAddModal=(e,index)=>{
      this.setState({isModifierGroupAddModalOpen: true})
      this.setState({isdropdownOpen:false})
      this.setState({current_index:-1})
      this.setState({current_option:index})
      this.setState({item_to_add: e.target.name})   
    } 
    
    closeModifierGroupAddModal=()=>{
      this.setState({isModifierGroupAddModalOpen: false})
    }

    getModifierGroupdata=(valuefromAddModifiermodal)=>{
        const {current_option} =this.state
        this.setState({isModifierGroupAddModalOpen: false})
        const modifiedArray = [...this.state.optionsArray];
        if(modifiedArray[this.state.current_option].modifier && modifiedArray[this.state.current_option].modifier.length){
            modifiedArray[this.state.current_option].modifier.push(valuefromAddModifiermodal[0]);  
        }
        else{
            modifiedArray[this.state.current_option].modifier=valuefromAddModifiermodal;
        }
        this.setState((prevState) => { return { optionsArray: modifiedArray }; })     
    }
    //3. End- item, option, modifier group---- Add modifier group

    //6. Start - Open Dropdown on click on item, option, modifier group
    togglegroupDropdown= index => (event) => {
        this.setState((prevState) => ({ isgroupdropdownopen: !prevState.isgroupdropdownopen }));
        this.setState((prevState) => ({
            group_index: prevState.group_index === index ? null : index,
                  }));
    };
    //6. End - Open Dropdown on click on item, option, modifier group

    //7. Start- item, option, modifier group---- Add modifier group
    openGroupAddModal=(e,index,index2)=>{
        console.log("index: ", index)
        console.log("index2: ", index2)
        this.setState({isGroupAddModalOpen:true})
        this.setState({group_index:-1})
        this.setState({isgroupdropdownopen:false})
        this.setState({current_option:index})
        this.setState({group_option:index2})
        this.setState({item_to_addgroup:e.target.name})
       
      } 
      
    closeGroupAddModal=()=>{
        this.setState({isGroupAddModalOpen: false})
      }
  
      getGroupdata=(valuefromAddModifiermodal)=>{
        const {current_option,group_option} =this.state
        this.setState({isGroupAddModalOpen: false})
        const modifiedArray = [...this.state.optionsArray];
        if(modifiedArray[current_option].modifier[group_option].groupdata && modifiedArray[current_option].modifier[group_option].groupdata.length){
            modifiedArray[current_option].modifier[group_option].groupdata.push(valuefromAddModifiermodal[0]);  
        }
        else{
            modifiedArray[current_option].modifier[group_option].groupdata=valuefromAddModifiermodal;
        }
        this.setState((prevState) => { return { optionsArray: modifiedArray }; })
             
      }
    //7. End- item, option, modifier group---- Add modifier group
     
    //4. Start- item, option, modifier group---- Remove
    openRemoveModal=(e,index,option_id)=>{
        this.setState({isRemoveModalopen: true}) 
        this.setState({option_index:index})
        this.setState({option_id:option_id})
        this.setState({isdropdownOpen:false})
        this.setState({current_index:-1})
    }

    closeRemoveModal=()=>{
        this.setState({isRemoveModalopen: false})
    }

    handleDelete = async (value) => {
        if(value==='Remove'){        
            this.setState({isExtraGroupOptionRemoveModalopen: false})
            this.setState({isRemoveModalopen: false})
            this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
            const deleteval = [...this.state.optionsArray]
            deleteval.splice(this.state.option_index, 1)
            this.setState({optionsArray:deleteval})
        }
    }
    //4. End- item, option, modifier group---- Remove

    //5. Start- Submit- Complete form submit.
    async handleModifierGroup(e){
        e.preventDefault()
        var fd = new FormData(e.target)
        fd.append('map_other_group', this.state.ismodifier)
        fd.append('options', JSON.stringify(this.state.optionsArray));
        var res = await app.post('/admin/modifier-group ',fd);
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;
        }
        if(res.status)
        {
            app.toast(res.message, 'success');
            this.props.onSubmit("data");
        }
    }   

    getModifierName=(e)=>{
        this.setState({name_Modifier:e.target.value})
    }
    //5. End- Submit- Complete form submit.

    showitemdata = (e) => {
        this.setState((prevState) => ({
          isitemOpen: !prevState.isitemOpen,
        }));
    };

    showgroupdata=(e)=> {
        this.setState((prevState) => ({
            isgroupOpen: !prevState.isgroupOpen,
          }));
    }

    render() {
    const { isOpen, onClose } = this.props;
    const {isModifierAddItemModal, optionsArray, optionArray_item,isRemoveModalopen, current_index, isModifierGroupAddModalOpen, name_Modifier, 
            current_option, item_to_add, item_to_addgroup, isdropdownOpen,group_index,isgroupdropdownopen,
            edit, isGroupAddModalOpen, isitemOpen, isgroupOpen, data_parent} = this.state
    if (!isOpen) return null;
    console.log("optionsArray: ",optionsArray)

    return (
    <> 
        <div className="modal-overlay" >
            <div className="modal-dialog w-75">
                <div className="modal-content mx-auto w-50">
                    <div className="modal-header border border-0 pb-0">
                        <h3 className='heading text-dark'>{data_parent?"Edit Modifier Group":"Create Modifier Group"}</h3>
                        <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div className="container"></div>
                    <div className='scrolbar-group h-auto'>
                    <div className="modal-body mt-0 pt-0">
                            <form method="post" onSubmit={(event)=>this.handleModifierGroup(event)}>
                            <div className='row mt-2'>
                                <div className='col'>
                                    <span className='peragraph'>Name</span>
                                    <input type="text" name='name' className="form-control date-time"  onChange={(e)=>this.getModifierName(e)} placeholder="Would you like to add an additional side?" />
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col'>
                                    <input type="text" className="form-control date-time" name="unique_name"  onChange={(e)=>this.getModifierName(e)} placeholder="Unique searchable name, not visible to clients" />
                                    {current_option?(
                                        <input type='hidden' name="Item_Modifier_Group" value='attached' />
                                    ):null}
                                </div>
                            </div>
                            <button className='btn-radius right mt-2'type="button" name="create" onClick={this.openModifierAddItemModal}>Add modifier 
                                <span className='btn-icon'>
                                    <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                            </button>

                            {optionsArray.map((data,index)=>         
                                <div key={index} className='modifr-drop mt-3'>          
                                    <div className='card p-2'>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className='right-extra d-flex'>
                                                    <span className='equal text-muted'>=</span>
                                                    <div className='extra-data'>
                                                        <h3 className='peragraph text-secondary mb-0'>{data.display_name}</h3>
                                                        <div className='extra-item pt-0'>Found In: {data.display_cat?data.display_cat:name_Modifier}</div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className='left-extra d-flex'>
                                                    <span className='input-extra justify-content-end'>
                                                    <h3 className='peragraph text-secondary mt-1'>{data.display_price}</h3>
                                                    </span>
                                                    <div className='edit-duplicate-icon'>
                                                        <div className='ellipsis-icon ellipsis-icon ellipsis-modify'>
                                                            <div className="dropdown">
                                                                <button type="button" className="dropdown drop-down dropright-icon bg-white border border-0" onClick={this.togglemodifierDropdown(index)}>
                                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                </button>
                                                                <ul className={`dropdown-menu dropdown-modal p-0 ${current_index == index && isdropdownOpen? ' show' : ''}`}>
                                                                    {/* <li>
                                                                        <a className="dropdown-item extra-item border-border-0"data-bs-toggle="modal" name="edit" onClick={(e)=>this.openModifierAddItemModal(e)} >Edit name</a>
                                                                    </li> */}
                                                                    <li>
                                                                        <a className="dropdown-item extra-item  border-border-0" name='Add_to_item' onClick={(event)=>this.openModifierGroupAddModal(event,index)}>Add modifier group</a>
                                                                    </li>
                                                                    <li>
                                                                        <a className="dropdown-item extra-item border-border-0" onClick={(event)=>this.openRemoveModal(event,index,data.id)}>Remove</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {data.modifier_group_items_arr && data.modifier_group_items_arr.map((groupitem,index1)=>
                                        <div key={index1} className='small-right-modifir'>
                                            <div className='small-itemmodifr'>
                                                <div className='row'>
                                                    <div className='card p-2 mt-2'>                                                            
                                                        <div key={index} className='row'>
                                                            <div className='col-sm-6'>
                                                                <div className='right-extra d-flex'>
                                                                    <div className='extra-data'>
                                                                        <h3 className='peragraph text-secondary choose-text mb-0'>{groupitem.display_name}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-sm-6'>
                                                                <div className='left-extra d-flex'>
                                                                    <span className='input-extra justify-content-end'>
                                                                        <h3 className='peragraph text-secondary choose-text mb-0'>{groupitem.display_price}</h3>
                                                                    </span>                                                                        
                                                                </div>
                                                            </div>
                                                        </div>                                       
                                                    </div>                                              
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {data.modifier ? (data.modifier).map( (modifier,index2)=>                                        
                                        <div key={index2} className='p-1'>
                                            <div className='d-flex justify-content-between'>
                                                <div className='modifer_img' onClick={this.showitemdata}>
                                                    <i class={`${isitemOpen?"fa fa-angle-down modifer_icon":"fa fa-angle-right modifer_icon"}`} aria-hidden="true"></i>
                                                </div>
                                                <div className='modifer_tab'>
                                                    <div className='card p-2 mt-2'>
                                                        <div className='row'>
                                                            <div className='col-sm-12'>
                                                                <div className='right-extra d-flex'>
                                                                    <span className='equal text-muted'>=</span>
                                                                    <div className='extra-data'>
                                                                        <h3 className='peragraph text-secondary choose-text mb-0 mt-1'>{modifier.name}</h3>
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
                                                                                <button type="button" className="dropdown drop-down dropright-icon bg-white border border-0" onClick={this.togglegroupDropdown(index2)}>
                                                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                                </button>
                                                                                <ul className={`dropdown-menu dropdown-modal p-0 ${group_index == index2 && isgroupdropdownopen? ' show' : ''}`}>
                                                                                    {/* <li>
                                                                                        <a className="dropdown-item extra-item border-border-0"data-bs-toggle="modal">Edit name</a>
                                                                                    </li> */}
                                                                                    <li>
                                                                                        <a className="dropdown-item extra-item  border-border-0" name='Add_to_item' onClick={(event)=>this.openGroupAddModal(event,index,index2)}>Add modifier group</a>
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

                                            {isitemOpen && modifier.display_option_arr? modifier.display_option_arr.map((optionitem,index3)=>                                           
                                            <div key={index3} className='small-right-modifir '  >
                                                <div className='small-modifr'>
                                                    <div className='row'>
                                                        <div className='card p-2 mt-2'>                                                            
                                                            <div className='row'>
                                                                <div className='col-sm-6'>
                                                                    <div className='right-extra d-flex'>
                                                                        <div className='extra-data'>
                                                                            <h3 className='peragraph text-secondary choose-text mb-0'>{optionitem.display_name}</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-sm-6'>
                                                                    <div className='left-extra d-flex'>
                                                                        <span className='input-extra justify-content-end'>
                                                                            <h3 className='peragraph text-secondary choose-text mb-0'>{optionitem.display_price}</h3>
                                                                        </span>
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>   
                                                        </div>                                              
                                                    </div>
                                                </div>
                                            </div>
                                            ):null}
                                            
                                            
                                            {modifier.groupdata ? (modifier.groupdata).map( (groupmodifier,index5)=>                                        
                                                <div key={index5} className='p-1 min_card_modifer'>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='modifer_img_min' onClick={this.showgroupdata}>
                                                        <i class={`${isgroupOpen?"fa fa-angle-down modifer_icon":"fa fa-angle-right modifer_icon"}`} aria-hidden="true"></i>
                                                        </div>
                                                        <div className='min_modifer_tab'>
                                                            <div className='card p-2 mt-2'>
                                                                <div className='row'>
                                                                    <div className='col-lg-12'>
                                                                        <div className='right-extra d-flex'>
                                                                            <span className='equal text-muted'>=</span>
                                                                            <div className='extra-data'>
                                                                                <h3 className='peragraph text-secondary choose-text mb-0 mt-1'>{groupmodifier.name}</h3>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className='col-sm-6'>
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
                                                                                        <ul className={`dropdown-menu dropdown-modal p-0 ${group_index == index5 && isgroupdropdownopen? ' show' : ''}`}>
                                                                                            <li>
                                                                                                <a className="dropdown-item extra-item border-border-0"data-bs-toggle="modal">Edit name</a>
                                                                                            </li>
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
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> 

                                                    {isgroupOpen && groupmodifier.display_option_arr? groupmodifier.display_option_arr.map((groupitem,index6)=>                                           
                                                    <div key={index6} className='small-right-modifir '  >
                                                        <div className='small-modifr'>
                                                            <div className='row'>
                                                                <div className='card p-2 mt-2'>                                                            
                                                                    <div className='row'>
                                                                        <div className='col-sm-9'>
                                                                            <div className='right-extra d-flex'>
                                                                                <div className='extra-data'>
                                                                                    <h3 className='peragraph text-secondary choose-text mb-0'>{groupitem.display_name}</h3>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-sm-3'>
                                                                            <div className='left-extra d-flex'>
                                                                                <span className='input-extra justify-content-end'>
                                                                                    <h3 className='peragraph text-secondary choose-text mb-0'>{groupitem.display_price}</h3>
                                                                                </span>
                                                                                
                                                                            </div>
                                                                        </div>
                                                                    </div>   
                                                                </div>                                              
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ):null}
                                                </div>                                       
                                            ):null}


                                        </div>                                       
                                    ):null}                                 
                                </div> 
                            )}
                            
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" onChange={this.handleTagCheckboxChange}></input>
                                <label className='date-time p-0'>Require customers to select an item?</label>
                            </div>
                            <div className="form mt-1">
                                <label className='date-time select-line p-0' name="option2">What is the maximum amount of items customers can select?</label>
                                <div className="customselect">1
                                    {/* <select>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select> */}
                                </div>
                            </div>
                            <div className="form mt-2">
                                <label className='date-time select-line p-0' name="option3">How many times can a customer select any single item?</label>
                                <div className="customselect">1
                                    {/* <select>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select> */}
                                </div>
                            </div>            
                            <div className="modal-footer border border-0">
                                <div className='d-flex justify-content-between'>
                                    <div className='builder'>
                                        <button type='button' className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                                        <button type='submit' className='menu-item right btn-radius green-btn' data-bs-toggle="modal" href="#CreateGrouppop">Add</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        {isModifierAddItemModal && (
            <ModifierAddItemModal isOpen={isModifierAddItemModal} onClose={this.closeModifierAddItemModal} data_from_parent={optionArray_item} edit={edit} onSubmit={this.getModifierData} />
        )}

        {isModifierGroupAddModalOpen && (
            <AddModifierGroupModal isOpen={isModifierGroupAddModalOpen} data_from_Parent={item_to_add} onClose={this.closeModifierGroupAddModal} onSubmit={this.getModifierGroupdata}/>
        )}

        {isGroupAddModalOpen && (
            <AddModifierGroupModal isOpen={isGroupAddModalOpen} data_from_Parent={item_to_addgroup} onClose={this.closeGroupAddModal} onSubmit={this.getGroupdata}/>
        )}

        {isRemoveModalopen &&(
        <RemoveModal isOpen={isRemoveModalopen} onClose={this.closeRemoveModal} data_from_parent={"Extras Group Option"} onSubmit={this.handleDelete} />
        )}
    </>
    );
  }
}
