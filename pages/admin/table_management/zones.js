import React from 'react'
import TableHeader from "../../../src/layouts/Table_Header";
import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from 'reactstrap'
// import { Modal } from 'bootstrap'

import { Table_Header, Sidebar } from '../../../src';

export default class TableZones extends React.Component {
    constructor(props){
        super(props);
        this.state = {zones:[], createzone_modal:!1, deletezone_modal:!1, current_zone:[]}        
    }

    async componentDidMount(){
        this.get_zone()            
    }   

    async get_zone(){
        var res = await app.get('/admin/zone');
        if(res.status)
        this.setState({zones:res.data})

        console.log("Api_data:", this.state.zones)
    }

    async okProceed(){
        var id = this.state.current_id
        console.log("hello",id)
        var res = await app.put('/admin/zone',{zone_id:id, action:'delete'});
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;			
        }
        if(res.status)
        {
            app.toast(res.message, 'success');
            this.deletezone_toggleModal()
            this.get_zone()
        }        
    }

    async handleSubmit(e){
        e.preventDefault()
        var fd = new FormData(e.target)
        var res = await app.post('/admin/zone',fd);
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;			
        }
        if(res.status)
        {
            app.toast(res.message, 'success');
            this.createzone_toggleModal()
            this.get_zone()
        }
    }

    async handleUpdate(e){
        const {name,value}= e.target;
        this.setState({current_zone:{[name]: value}});         
    }

    createzone_modalOpen(e,zone_data){
        console.log("test==", zone_data)
        if(zone_data && zone_data.id)
        {
        this.setState({current_id:zone_data.id})
        this.setState({current_zone:zone_data})
        }
        else
        {
            this.setState({current_id:""}) 
            this.setState({current_zone:[]})
        }	
        this.createzone_toggleModal()
    }    

    deletezone_modalOpen(zone_data){
        console.log("test==", zone_data)
        this.setState({current_id:zone_data.id})
        this.deletezone_toggleModal()
    }

    createzone_toggleModal = () => { this.setState({createzone_modal:!this.state.createzone_modal}); };
    deletezone_toggleModal = () => { this.setState({deletezone_modal:!this.state.deletezone_modal}); };
    
render () {  
    var {zones} = this.state
    console.log("Zone_data: ", zones) 
  return (
    <>
        <div className="container-fluid">
            <div className='row'>
            <TableHeader/>
            </div>
            <div className='row'>
                <div className='col-md-2'>
                    <Sidebar/>
                </div>
                <div className='col-lg-10 p-0'>
                    <div className='wraper pb-5'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='d-flex justify-content-between'>
                                    <div className='tag'>
                                    <h5 className='menu-item fw-bold mb-4 mt-4'>Zones</h5>
                                    </div>
                                </div>
                                <div className='btn-tags mb-4'>
                                    <button className='menu-item btn-radius' data-bs-toggle="modal" onClick={(event)=>this.createzone_modalOpen(event)}>Create zones
                                        <span className='btn-icon'>
                                            <i class="fa fa-plus fw-normal" aria-hidden="true">
                                            </i>
                                        </span>
                                    </button>
                                </div>
                                <div>
                                { zones.map( zone_data =>
                                <div className='d-flex justify-content-between border-top mt-2'>
                                    <div className='item-type mt-1'>
                                    <span className='modal-titel text-muted mt-2'>{zone_data.name}</span>
                                    </div>
                                    <div class="popup-icon-delete">
                                        <img src="../../../assets/images/icon-delete.png" class="delete-page-icon" onClick={(event)=>this.deletezone_modalOpen(zone_data)}/>
                                        <img src="../../../assets/images/edit.png" class="edit-page-icon" onClick={(event)=>this.createzone_modalOpen(event,zone_data)}/>
                                    </div>
                                </div>
                                )}
                                </div>  
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        </div>

    {/* Create and Edit Zone Pop-up Modal---- Starts Here */}
    <Modal isOpen={this.state.createzone_modal}
            toggle={this.createzone_toggleModal}
            modalTransition={{ timeout: 200 }}
            className="cstModal"
            >
            <ModalBody>
            
                <div class="modal-header border border-0 pb-0">
                    <h3 className='heading text-dark'>{this.state.current_id?"Edit Zone":"Create Zone"}</h3>
                    <button type="button" onClick={this.createzone_toggleModal} className="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>                
                </div>
                <div class="modal-body mt-0 pt-0">
                    <form method="post" onSubmit={(event)=>this.handleSubmit(event)}>
                        <input type="hidden" name='id' value={this.state.current_zone.id}/>
                        <div class="row mt-2">
                            <div className='col-lg-8'>
                                <label className="form-check-label">
                                    <span className='peragraph'>Name</span>
                                </label>
                                <input type="text" class="form-control date-time" placeholder="Inside 1" name="name" value={this.state.current_zone.name} onChange={(e)=>this.handleUpdate(e)} required/>
                            </div>
                            <div className='col-sm-2 mt-3'>
                                <div className='popup-icon-delete'>
                                    <img src="../../../assets/images/icon-plus.png" class="icon-plush"/>
                                </div>
                            </div>
                        </div>                    
                        <div class="modal-footer border border-0">
                            <div className='d-flex justify-content-between'>
                                <div className='builder'>
                                <button type = "button" className='menu-item right btn-radius text-secondary border border-secondary' onClick={this.toggleModal}>Cancel</button>
                                <button className='menu-item right btn-radius green-btn' type="submit" >Apply</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div> 
            </ModalBody>
    </Modal>
    /* Create Zone Pop-up Modal---- ENDS Here*/

    

    /* Delete Zone Pop-up Modal---- Starts Here*/
    <Modal isOpen={this.state.deletezone_modal}
            toggle={this.deletezone_toggleModal}
            modalTransition={{ timeout: 200 }}
            className="cstModal"
            >
            <ModalBody>
            
            <div class="modal-header border border-0">
                <h3 className='heading text-dark'>Delete</h3>
                <span className='cus-Drinks pt-4'>Zone</span>
                <button type="button" class="btn-close" onClick={this.deletezone_toggleModal} data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="container"></div>
            <div class="modal-body">
                <p className='peragraph text-center pt-2'>Do you want to delete this Zone?</p>
            </div>
            <div class="modal-footer border border-0">
                <div className='d-flex justify-content-between'>
                    <div className='builder'>
                        <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={this.deletezone_toggleModal}>Cancel</button>
                        <button className='menu-item right btn-radius green-btn' onClick={()=>this.okProceed()}>Apply</button>
                    </div>
                </div>
            </div>
                
            </ModalBody>
    </Modal>
    /* Delete Zone Pop-up Modal---- ENDS Here*/

    </>
      
  )
}
}
