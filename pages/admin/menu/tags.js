import React from 'react';
import { Header, Sidebar } from '../../../src';
import { Modal, ModalBody, Button } from 'reactstrap'



export default class Tag extends React.Component{

	constructor(props){
		super(props);  
        this.state = {tags:[], modal:!1, confirm_modal:!1};     
	}

    async componentDidMount(){
        this.get_tag()            
    }   

    async get_tag(){
        var res = await app.get('/admin/tag');
        if(res.status)
        this.setState({tags:res.data})
    }

    async okProceed(){
        var id = this.state.current_id
        console.log("this", id)
        var res = await app.put('/admin/tag',{tag_id:id, action:'delete'});
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;			
        }
        if(res.status)
        {
            app.toast(res.message, 'success');
            this.confirm_toggleModal()
            this.get_tag()
        }        
    }

    async handleSubmit(e){
        e.preventDefault()
        var fd = new FormData(e.target)
        var res = await app.post('/admin/tag',fd);
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;			
        }
        if(res.status)
        {
            app.toast(res.message, 'success');
            this.toggleModal()
            this.get_tag()
        }
    }

    modelOpen(e){
        console.log("test==")
        this.toggleModal(e)
    }
    confirmmodelOpen(tag_data){
        console.log("test==", tag_data)
        this.setState({current_id:tag_data.id})
        this.confirm_toggleModal()
    }
                        
   toggleModal = () => { this.setState({modal:!this.state.modal}); };
   confirm_toggleModal = () => { this.setState({confirm_modal:!this.state.confirm_modal}); };
   



	render() {
        var {tags} = this.state
        console.log("Welcome",tags)
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
                            <div className='col-sm-6'>
                                <div className='d-flex justify-content-between'>
                                    <div className='tag'>
                                    <h5 className='menu-item tags fw-bold mb-4 mt-4'>Tags</h5>
                                    </div>
                                    <div className='tag'>
                                    <h5 className='menu-item fw-bold mb-4 mt-4 text-muted a-links'><a href="./preferencetags">Preference Tags</a></h5>
                                    </div>
                                </div>
                                <input type="text" className="form-control date-time" placeholder="Search"/>
                                    <div>
                                    { tags.map( tag_data =>
                                        
                                        <div className='d-flex justify-content-between border-top mt-2'>
                                            <div className='item-type mt-1'>
                                        <span className='modal-titel text-muted mt-2'>{tag_data.name}</span>
                                            </div>
                                            <div className="popup-icon-delete" onClick={()=>this.confirmmodelOpen(tag_data)}><img src="../../../assets/images/icon-delete.png" className="delete-page-icon"/></div>
                                        </div>
                                        
                                    )}
                                    </div>
                                    </div>
                                <div className='col-sm-6 mb-4 mt-4'>
                                    <div className='btn-tags mb-4 mt-5'>
                                    <button className='menu-item btn-radius' data-bs-toggle="modal"  onClick={(event)=>this.modelOpen(event)}>Create tags<span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                                    </div>
                                </div>
                            </div>
            
                        </div>
                    </div>
                </div>  
            </div>

    {/* Create Category Modal */}    
        <Modal isOpen={this.state.modal}
            toggle={this.toggleModal}
            modalTransition={{ timeout: 200 }}
            className="cstModal">

            <ModalBody>
                    <div class="modal-header border border-0 pb-0">
                        <h3 className='heading text-dark'>Create tags</h3>
                        {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button> */}
                        <button type="button" onClick={this.toggleModal} className="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>                
                    </div>
                    <div class="modal-body mt-0 pt-0">
                    <form method="post" onSubmit={(event)=>this.handleSubmit(event)}>
                        <div class="row mt-2">
                            <div className='col-lg-8'>
                                <label className="form-check-label">
                                <span className='peragraph'>Name</span>
                                </label>
                                <input type="text" class="form-control date-time" placeholder="salad" name="name" required/>
                            </div>
                            <div className='col-sm-2 mt-3'>
                            <div className='popup-icon-delete'>
                            <img src="../../../assets/images/icon-plus.png" class="icon-plush"/>
                            </div>
                            </div>
                        </div>
                        {/* <div className="row mt-2">
                            <div className='col-lg-8'>
                                <input type="text" class="form-control date-time" placeholder="breakfast" />
                            
                            </div>
                            <div className='col-sm-2'>
                                <div className='popup-icon-delete'>
                                    <img src="../../../assets/images/icon-delete.png" class="delete-popnopostion"/>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div className='col-lg-8'>
                                <input type="text" class="form-control date-time" placeholder="alcohol-free" />
                            </div>
                            <div className='col-sm-2'>
                                <div className='popup-icon-delete'>
                                    <img src="../../../assets/images/icon-delete.png" class="delete-popnopostion"/>
                                </div>
                            </div>
                        </div>  */}
                    
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
    {/* End add/edit Tags */}

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
        
	   	</>
    )}
}