import React from 'react';
import ExtraAddItemModal from './modal_Extra_Add_Item';


export default class CreateExtraGroupModal extends React.Component {
    state = {
        isExtraAddItemModal: false, dataArray:[]       
      };


      openExtraAddItemModal = () => {
        this.setState({ isExtraAddItemModal: true });
      };
    
      closeExtraAddItemModal = () => {
        this.setState({ isExtraAddItemModal: false });
      };
     

    
  render() {
    const { isOpen, onClose} = this.props;
    const {isExtraAddItemModal, dataArray} = this.state
    
    if (!isOpen) return null;

    return ( 
        <> 
        <div className="modal-overlay ">
            <div className="modal-dialog topheightmodal w-50 mx-auto">
                <div className="modal-content w-50 mx-auto ">
                    <div class="modal-header border border-0 pb-0">
                        <h3 className='heading text-dark'>Create Extras Group</h3>
                        <button type="button" class="btn-close" onClick={onClose} data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div class="container"></div>
                    <div class="modal-body mt-0 pt-0">
                        <from>
                            <div className='row mt-2'>
                                <div className='col'>
                                    <span className='peragraph'>Name</span>
                                    <input type="text" class="form-control date-time" placeholder="Would you like to add an additional side?" />
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col'>
                                    <input type="text" class="form-control date-time" placeholder="Unique searchable name, not visible to clients" />
                                </div>
                            </div>
                            <button className='btn-radius right mt-2'data-bs-toggle="modal" onClick={this.openExtraAddItemModal} >Add Item 
                                <span className='btn-icon'>
                                    <i class="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                            </button>
                                {isExtraAddItemModal && (
                                    <ExtraAddItemModal isOpen={isExtraAddItemModal} onClose={this.closeExtraAddItemModal}  />
                                )}

                            {dataArray && dataArray.length>0?(
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
                                                <input type="text" class="form-control date-time w-50" placeholder="23.90" />
                                            </span>
                                            <div className='edit-duplicate-icon'>
                                                <div className='ellipsis-icon'>
                                                    <div class="dropdown">
                                                        <button type="button" class="dropdown drop-down bg-white border border-0" data-bs-toggle="dropdown">
                                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li>
                                                                <a class="dropdown-item extra-item" href="#">Removes</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ):(
                            <div style={{ display: 'none' }}>Hidden content</div>  
                            )}
                        </from>
                    </div>
                    <div class="modal-footer border border-0">
                        <div className='d-flex justify-content-between'>
                            <div className='builder'>
                                <button className='menu-item right btn-radius text-secondary border border-secondary'>Cancel</button>
                                <button className='menu-item right btn-radius green-btn' data-bs-toggle="modal" href="#CreateGrouppop">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
           
            </>
    );
  }
}
