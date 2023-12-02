import React from 'react';


export default class ExtraGroupRemoveModal extends React.Component {

    constructor(props){
        super(props);
        this.state={remove_id:''}
    }
   
    componentDidMount(){
                
        const {data_from_Parent} = this.props        
        if(data_from_Parent){
            console.log("Parent_data: ", data_from_Parent)
        this.setState({remove_id:data_from_Parent}) 
             }  
        }
    

     async okProceed(){
        
        var res= await app.put('/admin/extras-group',{extras_group_id:this.state.remove_id, action:'delete'})
        console.log("res", res)
        if(!res.status)
            {
                app.toast(res.message, 'warning');
                return false;			
            }
        if(res.status)
        {
            console.log("check")
            app.toast(res.message, 'success');
            this.props.onSubmit("Remove")
        } 
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
                        <span className='cus-Drinks pt-4'>Extras Group</span>
                        <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    {/* <form method="post" onSubmit={(event)=>this.okProceed(event)}> */}
                    <div className="container"></div>
                    <div className="modal-body">
                        <p className='peragraph text-center pt-2'>Do you want to delete this Extras Group?</p>
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
