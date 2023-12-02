import React from 'react'
import TableHeader from "../../../src/layouts/Table_Header";
import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from 'reactstrap'
import { Table_Header, Sidebar } from '../../../src';

export default class TableList extends React.Component {
    constructor(props){
        super(props);
        this.state = {tables:[], createtable_modal:!1, zone_dropdown:[], current_table:[], deleteTable_modal:!1}        
    }
    createtable_modalOpen(e,table_data){
        console.log("test==", table_data)
        if(table_data && table_data.id)
        {
        this.setState({current_id:table_data.id})
        this.setState({current_table:table_data})
        }
        else
        {
            this.setState({current_id:""})
            this.setState({current_table:[]})
         }	
        this.createtable_toggleModal()
    }

    deletetable_modalOpen(table_data){
        console.log("test==", table_data)
        this.setState({current_id:table_data.id})
        this.deleteTable_toggleModal()
    }

    createtable_toggleModal = () => { this.setState({createtable_modal:!this.state.createtable_modal}); };
    deleteTable_toggleModal = () => { this.setState({deleteTable_modal:!this.state.deleteTable_modal}); };
    async componentDidMount(){
        this.get_table_zone()
        this.get_table()       
    }   

    async get_table_zone(){
        var zone_res = await app.get('/admin/zone');
        if(zone_res.status)
        this.setState({zone_dropdown:zone_res.data})

        console.log("Api_data:", this.state.zone_dropdown)
    }
    async get_table(){
        var table_res = await app.get('/admin/table');
        if (table_res.status)
            this.setState({tables:table_res.data})
    }
    async handleSubmit(e){
        e.preventDefault()
        var fd = new FormData(e.target)
        console.log("FormData:", fd)
        var res = await app.post('/admin/table',fd);
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;			
        }
        if(res.status)
        {
            app.toast(res.message, 'success');
            this.createtable_toggleModal()
            this.get_table()
        }
    }

    async handleUpdate(e){
        const {name,value}= e.target;
        this.setState({current_table:{[name]: value}});         
    }

    async okProceed(){
        var id = this.state.current_id
        console.log("hello",id)
        var res = await app.put('/admin/table',{table_id:id, action:'delete'});
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;			
        }
        if(res.status)
        {
            app.toast(res.message, 'success');
            this.deleteTable_toggleModal()
            this.get_table()
        }        
    }
    

    render() {
        var {zone_dropdown, tables} = this.state
        
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
                                            <h5 className='menu-item fw-bold mb-4 mt-4'>Tables</h5>
                                            </div>
                                        </div>
                                        <div className='btn-tags mb-2'>
                                            <button className='menu-item btn-radius'data-bs-toggle="modal" onClick={(event)=>this.createtable_modalOpen(event)}>Create tables
                                                <span className='btn-icon'>
                                                    <i class="fa fa-plus fw-normal" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        {tables.map( table_data =>
                                        <div className='d-flex justify-content-between border-top mt-2'>
                                            <div className='table-items'>
                                                <div className='item-type mt-1'>
                                                    <span className='modal-titel text-muted mt-2'>{table_data.name}</span>
                                                </div>
                                            </div>
                                            <div className='table-items'>
                                                <div className='item-type mt-1'>
                                                    <span className='modal-titel text-muted mt-2'>{table_data.zone_name}</span>
                                                </div>
                                            </div>
                                            <div className='table-items'>
                                                <div class="popup-icon-delete">
                                                    <img src="../../../assets/images/edit.png" class="tables-edit-page-icon" onClick={(event)=>this.createtable_modalOpen(event,table_data)}/>
                                                    <img src="../../../assets/images/qr-icon.svg" class="tables-qr-page-icon" data-bs-toggle="modal" href="#Qrcode"/>
                                                    <img src="../../../assets/images/icon-delete.png" class="tables-delete-page-icon" onClick={(event)=>this.deletetable_modalOpen(table_data)}/>
                                                </div>
                                            </div>
                                        </div>
                                        )}                                                                                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
                </div>

    {/* Create and Edit Table Pop-up Modal---- Starts Here */}
    <Modal isOpen={this.state.createtable_modal}
            toggle={this.createtable_toggleModal}
            modalTransition={{ timeout: 200 }}
            className="cstModal"
            >
            <ModalBody>
            
            <div class="modal-header border border-0 pb-0">
                <h3 className='heading text-dark'>{this.state.current_id?"Edit Table":"Create Table"}</h3>
                <button type="button" onClick={this.createtable_toggleModal} class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body mt-0 pt-0">
                <form method="post" onSubmit={(event)=>this.handleSubmit(event)}>
                    <input type="hidden" name='id' value={this.state.current_table.id}/>
                    <div class="row mt-2">
                        <div className='col-lg-8'>
                            <label class="form-check-label">
                                <span className='peragraph'>Name</span>
                            </label>
                            <input type="text" class="form-control date-time" placeholder="Table 5" name="name" value={this.state.current_table.name} onChange={(e)=>this.handleUpdate(e)}/>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div className='col-lg-8'>
                            <select class="form-select date-time text-secondary" name="zone_id" value={this.state.current_table.zone_id} onChange={(e)=>this.handleUpdate(e)}>
                                <option>Select the zone</option>
                                {zone_dropdown.map((zone_data) => (
                                        <option value = {zone_data.id}>{zone_data.name}</option>
                                ))};                                    
                            </select>
                        </div>
                        <div className='col-sm-2'>
                            <div className='popup-icon-delete'>
                                <img src="../../../assets/images/icon-plus.png" class="table-plush-icon w-50"/>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div className='col-lg-8'>
                            <div className='d-flex justify-content-between tables-bordered'>
                                <div className='table-box'>
                                    <p>Table 1</p>
                                </div>
                                <div className='table-box-inside w-50'>
                                    <p className='text-start'>Inside 1</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-2'>
                            <div className='popup-icon-delete'>
                                <img src="../../../assets/images/icon-delete.png" class="delete-popnopostion"/>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div className='col-lg-8'>
                            <div className='d-flex justify-content-between tables-bordered'>
                                <div className='table-box'>
                                    <p>Table 2</p>
                                </div>
                                <div className='table-box-inside w-50'>
                                    <p className='text-start'>Inside 2</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-2'>
                            <div className='popup-icon-delete'>
                            <img src="../../../assets/images/icon-delete.png" class="delete-popnopostion"/>
                            </div>
                        </div>
                    </div>            
                    <div class="modal-footer border border-0">
                        <div className='d-flex justify-content-between'>
                            <div className='builder'>
                                <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={this.createtable_toggleModal}>Cancel</button>
                                <button className='menu-item right btn-radius green-btn'data-bs-toggle="modal" href="#Createitempop">Apply</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </ModalBody>
    </Modal>
    /* Create Table Pop-up Modal---- ENDS Here*/

    /* Delete Table Pop-up Modal---- Starts Here*/
    <Modal isOpen={this.state.deleteTable_modal}
            toggle={this.deleteTable_toggleModal}
            modalTransition={{ timeout: 200 }}
            className="cstModal"
            >
            <ModalBody>
            
            <div class="modal-header border border-0 pb-0">
                <h3 className='heading text-dark'>Delete</h3>
                <span className='cus-Drinks pt-4'>Table</span>
                <button type="button" class="btn-close" onClick={this.deleteTable_toggleModal} data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="container"></div>
            <div class="modal-body">
                <p className='peragraph text-center pt-2'>Do you want to delete this Table?</p>
            </div>
            <div class="modal-footer border border-0">
                <div className='d-flex justify-content-between'>
                    <div className='builder'>
                        <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={this.deleteTable_toggleModal}>Cancel</button>
                        <button className='menu-item right btn-radius green-btn' onClick={()=>this.okProceed()}>Apply</button>
                    </div>
                </div>
            </div>
                
            </ModalBody>
    </Modal>
    /* Delete Table Pop-up Modal---- ENDS Here*/

            </>
        )
    }
}