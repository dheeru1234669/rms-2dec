import React from 'react';
import CreateTagModal from './modal_Create_Tag'

export default class ExtraAddItemModal extends React.Component {
    state = {
        isExtraAddItemModal: false,        
      };

    constructor(props){
		super(props);  
        this.state = {tags:[], myArray:[], tag_value:''};     
	}
  
          

    
  render() {

    const { isOpen, onClose, value} = this.props;

    if (!isOpen) return null;

    return ( 
        <> 
        <div className="modal-overlay ">
            <div className="modal-dialog topheightmodal w-50 mx-auto">
                <div className="modal-content w-50 mx-auto ">                    
                   <div class="modal-header border border-0 pb-0">
                        <h3 className='heading text-dark'>Add Items</h3>
                        <button type="button" class="btn-close" onClick={onClose} data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div class="container"></div>
                    <div class="modal-body mt-0 pt-0">
                        <form>
                        <div className='row mt-2'>
                        <div className='col'>
                        <input type="text" class="form-control date-time" placeholder="Search for items" />
                        </div>
                        </div>
                        </form>
                    </div>
                    <div class="modal-footer border border-0">
                        <div className='d-flex justify-content-between'>
                            <div className='builder'>
                                <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                                <button className='menu-item right btn-radius green-btn'data-bs-toggle="modal" href="#FinalExtrasGroup">Add</button>
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
