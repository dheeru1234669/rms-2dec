import React from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from 'reactstrap';


function menupop(){
        return(
                <Modal isOpen={this.state.modal}
                toggle={this.toggleModal}
                modalTransition={{ timeout: 200 }}
                className="cstModal"
                >
                <ModalBody>
                <button type="button" onClick={this.toggleModal} className="cst-close" data-bs-dismiss="modal">&times;</button>
                <div className='text-left mt-3 mb-3'>
                <h5>Are you sure?</h5>
                </div>

                <div className='text-right mb-2'>
                <Button type="button" className="btn btn-success btn-save" onClick={()=>this.okProceed()}> &nbsp; OK &nbsp; </Button>&nbsp; &nbsp;<Button type="button" className="btn btn-danger btn-save" onClick={()=>this.toggleModal()}> &nbsp; Cancel &nbsp; </Button>
                </div>
                </ModalBody>
                </Modal>

              )
    }


export default menupop;
