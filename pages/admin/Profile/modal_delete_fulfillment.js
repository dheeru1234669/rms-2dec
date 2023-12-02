import React from 'react';


export default class RemoveFulfillment extends React.Component {

    constructor(props){
        super(props);
        this.state={hasMounted:false, Parent_data:[]}
    }

    componentDidMount(){
        if(!this.hasMounted){        
        this.hasMounted = true;
        
        const {data_from_Parent} = this.props        
        if(data_from_Parent)
        this.setState({Parent_data:data_from_Parent})
        else
        this.setState({Parent_data:[]})
        }
    }

    async okProceed(){
        var id = this.state.Parent_data.id
        console.log("this", id)
        var res = await app.put('/admin/fulfilment-station',{fulfilment_id:id, action:'delete'});
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;			
        }
        if(res.status)
        {
            app.toast(res.message, 'success');
            this.props.onSubmit('tej')
        }        
    }

    render() {
        const { isOpen, onClose } = this.props;
    
 
    return (
    <> 
        <div className="modal-overlay" > 
            <div className="modal-dialog ">
                <div className="modal-content modal-lg ">
                    <div class="modal-header border border-0">
                        <h3 className='heading text-dark'>Remove</h3>
                        <span className='cus-Drinks pt-4'>Fulfillment Station</span>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={onClose} aria-hidden="true"></button>
                    </div>
                    <div class="container"></div>
                    <div class="modal-body">
                        <p className='peragraph text-center pt-2 mt-3'>Do you want to remove this Fulfillment Station?</p>
                    </div>
                    <div class="modal-footer border border-0">
                        <div className='d-flex justify-content-between'>
                            <div className='builder'>
                                <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                                <button className='menu-item right btn-radius green-btn' onClick={()=>this.okProceed()}>Apply</button>
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
