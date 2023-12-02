import React, { Component } from 'react';
import ExtraAddItemModal from './modal_Extra_Add_Item'; 
import ExtraGroupOptionRemoveModal from '../component_ExtraGroup/modal_Remove_ExtraGroupOption';

export default class ModalCreate extends Component {

    constructor(props){
        super(props);
        this.state={child_data:[], Parent_data:[], remove_id:[], isOpen: false , 
            current_index:-1, isExtraGroupOptionRemoveModalopen: false, option_id:'', option_index:''}
    }
    
    componentDidMount(){
        this.get_extras()

        if(!this.hasMounted){        
        this.hasMounted = true;
        console.log("Item_Data:", this.props)
        const {data_from_Parent} = this.props        
        if(data_from_Parent){
           
        this.setState({Parent_data:data_from_Parent}) 
        
        // this.setState({child_data:data_from_Parent.extra_group_items_arr}) 
        }  
        }
    }
    state = {
        isExtraAddItemModal: false, dataArray:[]       
      };

      openExtraAddItemModal = () => {
        this.setState({ isExtraAddItemModal: true });
      };
    
      closeExtraAddItemModal = () => {
        this.setState({ isExtraAddItemModal: false });
      };

    async get_extras(){
        var res = await app.get('/admin/extras-group');
        if(res.status)
        this.setState({extras:res.data})

        //document.getElementById("opt").style.display = "none";
    } 

    async handleExtrasGroup(e){
        e.preventDefault()
        var fd = new FormData(e.target)
        console.log("child_data_Updated: ", this.state.child_data)
        fd.append('options', JSON.stringify(this.state.child_data));
        fd.append('remove_options', JSON.stringify(this.state.remove_id));
        var res = await app.post('/admin/extras-group',fd);
        console.log("RES: ", res);
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;
        }
        if(res.status)
        {
            app.toast(res.message, 'success');
            this.props.onSubmit("data");
            this.get_extras()
        }
    }

    

    togglegroupDropdown= index => (event) => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
        this.setState((prevState) => ({
              current_index: prevState.current_index === index ? null : index,
                  }));
    };

    getExtraAddItemData=(value)=>{
        console.log("Extra Add Item Data:", value)   
        this.setState({child_data: value.concat(this.state.child_data)})
            this.closeExtraAddItemModal();
    }

    openExtraGroupOptionRemoveModal=(e,index,option_id)=>{
        this.setState({isExtraGroupOptionRemoveModalopen: true}) 
        console.log("option_id: ", option_id)
        console.log("index: ", index)
        this.setState({option_index:index})
        this.setState({option_id:option_id})
        // this.setState({remove_option: remove})              
      } 
      
      closeExtraGroupOptionRemoveModal=()=>{
        this.setState({isExtraGroupOptionRemoveModalopen: false})
      }

      handleDelete = async (value) => {
        console.log("data:", value)
        if(value==='Remove'){        
            var res =  await app.post('/admin/remove-options',{'remove_options': this.state.option_id});
            this.setState({isExtraGroupOptionRemoveModalopen: false})
            console.log("index:", res)
            console.log("index:", this.state.option_index)
            const deleteval = [...this.state.child_data]
            deleteval.splice(this.state.option_index, 1)
            this.setState({child_data:deleteval})
        }
    }

    handleChange=(e)=>{
        console.log("data:",e.target.value)
        const {name,value}= e.target;
        // this.setState({Parent_data:{[name]: value}});
        this.setState((prevState) => ({ Parent_data: {...prevState.Parent_data, [name]: value } }));
    }

    render() {
    const { isOpen, onClose,  } = this.props;
    const {isExtraAddItemModal, dataArray, child_data, Parent_data, current_index,remove_id, isExtraGroupOptionRemoveModalopen } = this.state
    console.log("child_data: ", this.state.child_data)
    console.log("Parent_data1: ", this.state.Parent_data)
    if (!isOpen) return null;
    console.log("remove_id: ", remove_id)
    // console.log("Parent_data2: ", data_from_Parent)

    return (
    <> 
        <div className="modal-overlay" >
            <div className="modal-dialog w-75">
                <div className="modal-content mx-auto w-50">
                    <div className="modal-header border border-0 pb-0">
                        <h3 className='heading text-dark'>{Parent_data.label ? (Parent_data.duplicate ? "Duplicate Extras Group" : "Update Extras Group") : "Add Extras Group"}</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-hidden="true" onClick={onClose}></button>
                    </div>
                    <div className="container"></div>
                    <div className="modal-body mt-0 pt-0">
                        <form method="post" onSubmit={(event)=>this.handleExtrasGroup(event)}>
                            <div className='row mt-2'>
                                <div className='col'>
                                    <span className='peragraph'>Name</span>
                                    <input type="text" className="form-control date-time" placeholder="Would you like to add an additional side?" value={Parent_data.name} name="name" id={Parent_data.label} onChange={(e)=>this.handleChange(e)}/>
                                    <input type="hidden" value={Parent_data.label} onChange={this.handleChange} name=""/> 
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col'>
                                    <input type="text" className="form-control date-time" placeholder="Unique searchable name, not visible to clients" value={Parent_data.unique_name} onChange={this.handleChange} name="unique_name" id={Parent_data.label}/>
                                    <input type="hidden"  value={Parent_data?Parent_data.label:""} onChange={this.handleChange} name="id" />
                                    <input type="hidden"  value={Parent_data?Parent_data.duplicate:""} onChange={this.handleChange} name="duplicate" />

                                </div>
                            </div>
                            <button className='btn-radius right mt-2' onClick={this.openExtraAddItemModal} type='button' >Add Item 
                                <span className='btn-icon'>
                                    <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                            </button>
                            

                            {/* {dataArray && dataArray.length>0?( */}
                            {child_data && child_data.map((data,index)=>
                            <div key={index} className='card p-2 mt-2'>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <div className='right-extra d-flex'>
                                            <span className='equal text-muted'>=</span>
                                            <div className='extra-data'>
                                                <h3 className='peragraph top-value text-secondary mb-0'>{data.display_name}</h3>
                                                <div className='extra-item pt-0'>Found in: {data.display_cat}</div>
                                                <input type="hidden" value={data.id} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className='left-extra d-flex'>
                                            <span className='input-extra justify-content-end'>
                                                {/* <input type="text" className="form-control date-time w-50" placeholder="23.90" /> */}
                                                <h3 className='peragraph text-secondary mb-0'>{data.display_price}</h3>
                                            </span>
                                            <div className='edit-duplicate-icon'>
                                                <div className='ellipsis-icon'>
                                                <div className="dropdown">
                                                    <button type="button" className="dropdown drop-down bg-white border border-0" onClick={this.togglegroupDropdown(index)}>
                                                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                    </button>
                                                    <ul className={`dropdown-menu${current_index == index ? ' show' : ''}`}>
                                                        <li>
                                                            <button type='button' className="dropdown-item extra-item border border-bottom border border-bottom-0" value={data.id}  onClick={(event)=>this.openExtraGroupOptionRemoveModal(event,index,data.id)}>Remove</button>
                                                            
                                                        </li>
                                                    </ul>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}

                            {/* ):(
                            <div style={{ display: 'none' }}>Hidden content</div>  
                            )} */}
                            <div className="modal-footer border border-0">
                                <div className='d-flex justify-content-between'>
                                    <div className='builder'>
                                        <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                                        <button className='menu-item right btn-radius green-btn' data-bs-toggle="modal" href="#CreateGrouppop" type="submit">{Parent_data.label?"Update":"Add"}</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {isExtraAddItemModal && (
            <ExtraAddItemModal isOpen={isExtraAddItemModal} onClose={this.closeExtraAddItemModal} onSubmit={this.getExtraAddItemData} />
        )}

        {isExtraGroupOptionRemoveModalopen && (
            <ExtraGroupOptionRemoveModal isOpen={isExtraGroupOptionRemoveModalopen} onClose={this.closeExtraGroupOptionRemoveModal} onSubmit={this.handleDelete} />
        )}
    </>
    );
  }
}
