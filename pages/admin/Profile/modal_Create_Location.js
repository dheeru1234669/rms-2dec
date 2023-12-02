import React from 'react';


export default class CreateLocationModal extends React.Component {

    constructor(props){
        super(props);
        this.state={optionsArray:[], selected:[], preview_item_img:null, hasMounted:false, Parent_data:[]}
    }

    componentDidMount(){
        if(!this.hasMounted){        
        this.hasMounted = true;
        
        const {data_from_Parent} = this.props        
        if(data_from_Parent){
        this.setState({Parent_data:data_from_Parent})
        this.setState({ preview_item_img: data_from_Parent.img_mdfy });}
        else
        this.setState({Parent_data:[]})
        }
    }


    async handleCreateLocation(e){
        e.preventDefault()
        var fd = new FormData(e.target)
        if(this.props.data_from_Parent && this.props.data_from_Parent.id)
        fd.append('id', this.props.data_from_Parent.id);
        
        var res = await app.post('/admin/location',fd);
        console.log("RES: ", res);
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
    uploadLocationImage = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.setState({ preview_item_img: reader.result });
          };
          reader.readAsDataURL(file);
        }
      };

   removelocationimage=()=>{
    this.setState({preview_item_img:""})
      }

     
      handleUpdate(e){
        const {name,value}= e.target;
        this.setState({Parent_data:{[name]: value}});
        // this.setState((prevState) => ({Parent_data: {...prevState.Parent_data,info: {
        //     ...prevState.Parent_data.info,
        //     [name]: value
        //     }
        // this.setState(prevState => ({
        //     ...prevState, // Spread the previous state to preserve other keys
        //     [name]: value, // Update only the specific key
        //   }));         
    }

 

    render() {
    const { isOpen, onClose} = this.props;
    if (!isOpen) return null;
    const { preview_item_img, Parent_data } = this.state;
    console.log("data_from_Parent:", Parent_data)

    

    return (
    <> 
        <div className="modal-overlay" > 
            <div className="modal-dialog w-75">
                <div className="modal-content mx-auto w-50">
                    <div className="modal-header border border-0 pb-0">
                        <h3 className='heading text-dark'>{Parent_data.id?"Update Location":"Create Location"}</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-hidden="true" onClick={onClose}></button>
                    </div>
                    <form method="post" onSubmit={(event)=>this.handleCreateLocation(event)}>
                    <div className="modal-body mt-0 pt-0">
                        <div className="row mt-2">
                            <div className='col-md-6'>
                                <input type="text" className="form-control date-time"  value={Parent_data.name} onChange={(e)=>this.handleUpdate(e)} placeholder="Location Name" name="name" id="name"/>
                            </div>
                            <div className='col-md-6'>
                                <select className="form-select form-control date-time profile-location-drop" name="status" value={Parent_data.enabled} onChange={(e)=>this.handleUpdate(e)} id="enabled">
                                    <option value="1">Active</option>
                                    <option value="0">InActive</option>
                                </select>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='location-details'>
                                    {/* <input type='hidden' name='id' value={Parent_data.id} onChange={(e)=>this.handleUpdate(e)}/> */}
                                    <input type="text" className="form-control date-time" value={Parent_data.address_1} onChange={(e)=>this.handleUpdate(e)} placeholder="Address Line 1" name="address_1" id="address_1"/>
                                </div>
                                <div className='location-details mt-2'>
                                    <input type="text" className="form-control date-time" value={Parent_data.address_2} onChange={(e)=>this.handleUpdate(e)} placeholder="Address Line 2" name="address_2" id="address_2"/>
                                </div>
                                <div className='location-details mt-2'>
                                    <input type="text" className="form-control date-time" value={Parent_data.address_3} onChange={(e)=>this.handleUpdate(e)} placeholder="Address Line 3" name="address_3" id="address_3"/>
                                </div>
                                <div className='location-details mt-2'>
                                    <input type="text" className="form-control date-time" value={Parent_data.suburban} onChange={(e)=>this.handleUpdate(e)} placeholder="Suburb" name="suburban" id="suburban"/>
                                </div>
                                <div className='location-details mt-2'>
                                    <input type="text" className="form-control date-time" value={Parent_data.city} onChange={(e)=>this.handleUpdate(e)} placeholder="City" name="city" id="city"/>
                                </div>
                                <div className='location-details mt-2'>
                                    <input type="text" className="form-control date-time" value={Parent_data.postal_code} onChange={(e)=>this.handleUpdate(e)} placeholder="Postal Code" name="postal_code" id="postal_code"/>
                                </div>
                                <div className='location-details mt-2'>
                                    <input type="text" className="form-control date-time" value={Parent_data.state} onChange={(e)=>this.handleUpdate(e)} placeholder="Province/State" name="state" id="state"/>
                                </div>
                                <div className='location-details mt-2'>
                                    <select className="form-select form-control date-time profile-location-drop" value={Parent_data.country} onChange={(e)=>this.handleUpdate(e)} name="country" id="country">
                                        <option value="1">South Africa</option>
                                    </select>
                                </div>
                                <div className='location-details mt-2'>
                                    <input type="text" className="form-control date-time profile-location-input" value={Parent_data.phone_1} onChange={(e)=>this.handleUpdate(e)} placeholder="Contact Number 1" name="phone_1" id="phone_1"/>
                                </div>
                                <div className='location-details mt-2'>
                                    <input type="text" className="form-control date-time" value={Parent_data.phone_2} onChange={(e)=>this.handleUpdate(e)} placeholder="Contact Number 2" name="phone_2" id="phone_2"/>
                                </div>
                                <div className='location-details mt-2'>
                                    <input type="text" className="form-control date-time" value={Parent_data.email} onChange={(e)=>this.handleUpdate(e)} placeholder="Email Address" name="email" id="email"/>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="flex items-center justify-center w-full upload-docu border border-secondary"> 
                                    <label className="flex justify-content-center w-100">
                                        <div className="flex flex-col items-center justify-center upload-img">
                                        {   preview_item_img ?(                                      
                                            <img src={preview_item_img}  className="img_custom_size" />   
                                            ):(                               
                                            <p className=" text-sm tracking-wider text-center text-dark fw-bold text-secondary">Click to upload image</p>)}
                                        </div>
                                        <input type="file" className="opacity-0 img-size" name="image" id="image" onChange={this.uploadLocationImage}/>
                                    </label>
                                    <div className="popup-icon-delete">
                                        <img src="../../../assets/images/icon-delete.png" className="delete-pop-icon" onClick={this.removelocationimage}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border border-0">
                        <div className='d-flex'>
                            <div className='builder'>
                                <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                                <button className='menu-item right btn-radius green-btn' type="submit">Apply</button>
                            </div>
                        </div>
                    </div>
                    
                    </form>
                </div>
            </div>
        </div>
    </>
    );
  }
}
