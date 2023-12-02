import React from 'react';


export default class ExtraGroupOptionRemoveModal extends React.Component {

    constructor(props){
        super(props);
    }   
    

     async okProceed(){        
        this.props.onSubmit("Remove")         
    }

    
  render() {

    const { isOpen, onClose} = this.props;
    if (!isOpen) return null;

    return ( 
        <> 
        <div className="modal-overlay ">
            <div className="modal-dialog topheightmodal w-50 mx-auto">
                <div className="modal-content w-50 mx-auto ">                    
                    <div className="modal-header border border-0">
                        <h3 className='heading text-dark'>Remove</h3>
                        <span className='cus-Drinks pt-4'>Extras Group Option</span>
                        <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    {/* <form method="post" onSubmit={(event)=>this.okProceed(event)}> */}
                    <div className="container"></div>
                    <div className="modal-body">
                        <p className='peragraph text-center pt-2'>Do you want to delete this Extras Group Option?</p>
                    </div>
                    <div className="modal-footer border border-0">
                        <div className='d-flex justify-content-between'>
                            <div className='builder'>
                                <button type='button' onClick={onClose} className='menu-item right btn-radius text-secondary border border-secondary'>Cancel</button>
                                <button type='submit' onClick={()=>this.okProceed()} className='menu-item right btn-radius green-btn'>Apply</button>
                            </div>
                        </div>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
           
            </>
    );
  }
}
