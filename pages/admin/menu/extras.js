import React from 'react';
import { Button,Container,Row,Col } from 'react-bootstrap';
import { Header, Sidebar } from '../../../src';
import { Modal, ModalBody } from 'reactstrap'
import ModalCreate from '../component_ExtraGroup/modal_Create_Extra_Group'



export default class Tag extends React.Component{

	constructor(props){
		super(props);  
        this.state = {extras_group_data:[], extra_data:[],extras_group_item_data:[], data_item:[],color_update:"",isExtraGroupCreateModalOpen:false, modal:!1, isOpen: false , confirm_modal:!1, current_index:-1};     
	}

    async componentDidMount(){
        this.get_extras_menu()            
    }   

    async get_extras_menu(){
        var res = await app.get('/admin/extras-group');
        if(res.status)
        // this.setState({extras_group_data:res.data.results})
        this.setState({extras_group_data:res.data.dropdown})
        // this.setState({extras_group_item_data:res.data.dropdown})
        // console.log("Explore Group Data: ", this.state.extras_group_data)
    }
    //toggleDropdown = () => {
    toggleDropdown= index => (event) => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
        //this.setState({current_index:index})
        this.setState((prevState) => ({
              current_index: prevState.current_index === index ? null : index,
                  }));
    };

    openExtraGroupCreateModal=(e,data)=>{
        this.setState({isExtraGroupCreateModalOpen: true})
        // console.log("extra_data: ", data)
        this.setState({extra_data:data})
      } 
      
      closeExtraGroupCreateModal=()=>{
        this.setState({isExtraGroupCreateModalOpen: false})
      }

      getExtraGroupcreatedata=(value)=>{
        // e.preventDefault();
        if(value==="data"){
        this.get_extras_menu();
        this.setState({isExtraGroupCreateModalOpen: false})
      }}

      getExtraGroupID=(e,id)=>{
        e.preventDefault();
        console.log("check_id:", id)
        this.setState({color_update:id})
        this.setState({data_item:this.state.extras_group_item_data.filter((item)=>  id===item.label)})
        console.log("data_item1: ", this.state.data_item)
        
      }  
   



	render() {
        
        var {extras_group_data, isExtraGroupCreateModalOpen, extras_group_item_data, data_item, extra_data, current_index} = this.state
        console.log("Welcome",extras_group_data)
        console.log("Welcome_data_id",extras_group_item_data)
        console.log("data_item: ", data_item)
        var extra_item_data = data_item.extra_group_items
        if(data_item[0])
        console.log("extra_item_data: ", data_item[0].extra_group_items)
        console.log("extra_data: ", this.state.extra_data)
        
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
                                            <h5 className='menu-item tag fw-bold mb-4 mt-4'>Extras</h5>
                                            <input type="text" className="form-control date-time" placeholder="Search" />
                                        </div>
                                        <div className='extra'>
                                            <button type='button' className='menu-item btn-radius mb-4 mt-4' onClick={this.openExtraGroupCreateModal}>Create Extras Group 
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
                                    {extras_group_data.map((data,index)=>(
                                    <div key={index} className="card mt-4">
                                        <div className='edit-duplicate-icon' >
                                            <div className='ellipsis-icon'>
                                                <div className="dropdown">
                                                    <button type="button" className="dropdown drop-down bg-white border border-0" onClick={this.toggleDropdown(index)}>
                                                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                    </button>
                                                    <ul className={`dropdown-menu${current_index == index ? ' show' : ''}`}>
                                                        <li>
                                                            <a className="dropdown-item extra-item border border-bottom border border-top-0" onClick={(event)=>this.openExtraGroupCreateModal(event,data)}>Edit name</a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item extra-item border border-bottom" data-bs-toggle="modal" href="#CreateExtragroup">Duplicate</a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item extra-item border border-bottom border border-bottom-0" data-bs-toggle="modal" href="#ModifierRemovepop">Removes</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body p-2" onClick={(event)=>this.getExtraGroupID(event,data.label)} id={data.label}>
                                            
                                            <h3 className={`extras-title mb-0 ${this.state.color_update==data.label?'update':''}`}>{data.name}</h3>
                                            <div className='extra-item pt-0'>{data.unique_name}</div>
                                        </div>
                                    </div>
                                    ))}
                                    
                                </div>
                                

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
                                    <div className='card p-2 mt-4'>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className='right-extra d-flex'>
                                                    <span className='equal text-muted'>=</span>
                                                    <div className='extra-data'>
                                                        <h3 className='peragraph text-secondary mb-0'>Baked Potato</h3>
                                                        <div className='extra-item pt-0'>Mains sides extras </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className='left-extra d-flex'>
                                                    <span className='input-extra justify-content-end'>
                                                        <input type="text" className="form-control date-time w-50" placeholder="23.90" />
                                                    </span>
                                                    <div className='edit-duplicate-icon'>
                                                        <div className='ellipsis-icon'>
                                                            <div className="dropdown">
                                                                <button type="button" className="dropdown drop-down bg-white border border-0" data-bs-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                </button>
                                                                <ul className="dropdown-menu">
                                                                    <li>
                                                                        <a className="dropdown-item extra-item border border-bottom border border-top-0" data-bs-toggle="modal" href="#CreateExtragroup">Edit name</a>
                                                                    </li>
                                                                    
                                                                    <li>
                                                                        <a className="dropdown-item extra-item border border-bottom border border-bottom-0" data-bs-toggle="modal" href="#ModifierRemovepop">Removes</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card p-2 mt-2'>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className='right-extra d-flex'>
                                                    <span className='equal text-muted'>=</span>
                                                    <div className='extra-data'>
                                                        <h3 className='peragraph text-secondary mb-0'>House Salad</h3>
                                                        <div className='extra-item pt-0'>Mains sides extras </div>
                                                    </div>
                                                    </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className='left-extra d-flex'>
                                                    <span className='input-extra justify-content-end'>
                                                        <input type="text" className="form-control date-time w-50" placeholder="23.90" />
                                                    </span>
                                                    <div className='edit-duplicate-icon'>
                                                        <div className='ellipsis-icon'>
                                                            <div className="dropdown">
                                                                <button type="button" className="dropdown drop-down bg-white border border-0" data-bs-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                </button>
                                                                <ul className="dropdown-menu">
                                                                    <li>
                                                                        <a className="dropdown-item extra-item border border-bottom border border-top-0" data-bs-toggle="modal" href="#CreateExtragroup">Edit name</a>
                                                                    </li>
                                                                    <li>
                                                                        <a className="dropdown-item extra-item border border-bottom border border-bottom-0" data-bs-toggle="modal" href="#ModifierRemovepop">Removes</a>
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
                        </div>
                    </div>
                </div>
            </div>  
 
 

    {/* Delete Modal Start*/}
    <Modal isOpen={this.state.confirm_modal}
               toggle={this.confirm_toggleModal}
               modalTransition={{ timeout: 200 }}
                className="cstModal"
                >
               <ModalBody>
               <button type="button" onClick={this.confirm_toggleModal} className="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                <div className='text-left mt-3 mb-3'>
                    <h5>Are you sure?</h5>
                </div>

                <div className='text-right mb-2'>
                    <Button type="button" className="btn btn-danger btn-save" onClick={()=>this.confirm_toggleModal()}> Cancel </Button>
                    <Button type="button" className="btn btn-success btn-save" onClick={()=>this.okProceed()}> OK </Button>
                    
					</div>
               </ModalBody>
    </Modal>
    {/* Delete Modal Closed*/}
    {isExtraGroupCreateModalOpen && (
    <ModalCreate isOpen={isExtraGroupCreateModalOpen} onClose={this.closeExtraGroupCreateModal} onSubmit={this.getExtraGroupcreatedata} data_from_Parent={extra_data}/>
)} 
        
	   	</>
    )}
}
