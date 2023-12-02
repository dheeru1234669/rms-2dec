import React from 'react';

export default class CreateFulfillmentModal extends React.Component {

    constructor(props){
		super(props);        
        this.state = {fulfillment:[], is_loading:!1,Parent_data:[]};      
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
    
    

    async handleSubmitCreateFulfillment(e){
        e.preventDefault()
        this.setState({is_loading:!this.state.is_loading})
        var fd = new FormData(e.target)
        if(this.props.data_from_Parent && this.props.data_from_Parent.id){
        fd.append('id', this.props.data_from_Parent.id);
        fd.append('action','update');
        }
        var res = await app.put('/admin/fulfilment-station',fd);
        if(!res.status)
        {
            this.setState({is_loading:!this.state.is_loading})
            app.toast(res.message, 'warning');
            return false;			
        }
        if(res.status)
        {
            this.setState({is_loading:!this.state.is_loading})
            app.toast(res.message, 'success');            
            console.log("SuccessResop:")
            this.props.onSubmit('tej')
        }
    }

    handleUpdate(e){
        const {name,value}= e.target;
        this.setState({Parent_data:{[name]: value}});         
    }

    
 
    
  render() {
    const { isOpen, onClose, data_from_Parent } = this.props;
    console.log("data_from_Parent:", this.props.data_from_Parent)
    if (!isOpen) return null;
    const { Parent_data } = this.state;

    return ( 
        <> 
        <div className="modal-overlay ">
            <div className="modal-dialog topheightmodal w-50 mx-auto">
                <div className="modal-content w-50 mx-auto ">
                    <div className="modal-header border border-0 pb-0">
                        <h3 className='heading text-dark'>{Parent_data?"Update Fulfilment Station":"Create Fulfilment Station"}</h3>
                        <button type="button" onClick={onClose} className="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>                
                    </div>
                    <div className="modal-body mt-0 pt-0">
                    <form method="post" onSubmit={(event)=>this.handleSubmitCreateFulfillment(event)}>
                        <div className="row mt-2">
                            <div className='col-lg-8'>
                                <label className="form-check-label">
                                    <span className='peragraph'>Name</span>
                                </label>
                                <input type="text" className="form-control date-time" value={Parent_data.name} onChange={(e)=>this.handleUpdate(e)} name="name" required/>
                            </div>                                            
                            <div className="modal-footer border border-0">
                                <div className='d-flex justify-content-between'>
                                    <div className='builder '>
                                        <button type = "button" className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                                        {
                                            this.state.is_loading ? 
                                            (<button type="button" className='menu-item right btn-radius pink-btn'>Wait...</button>                    
                                        ):
                                            (<button type="submit" className='menu-item right btn-radius green-btn'>Apply</button>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
           
            </>
    );
  }
}
