import React from 'react';
import AddAdminModal from './modal_Make_Admin';
import AddWaiterModal from './modal_Make_Waiter';
import CreateFulfillmentModal from './modal_Create_fulfillment';
import CreateLocationModal from './modal_Create_Location';
import RemoveFulfillment from './modal_delete_fulfillment';

var L_args={};
export default class CreateUserModal extends React.Component {
    constructor(props){
        super(props);  
        this.state = {locations:[],pages:[], sections:[], fulfilments:[],  data_fulfillment:[], data_location:[], admin_detail:[], waiter_detail:[],
            selectedCheckboxes:{Loc:[], Dash:[], fulfilment:[], Admin_checked:[], Waiter_checked:[],Dash_Main:''}, checkedItems:[], hasMounted:false, Parent_data:{loc_ids:[], dash_ids:[],fulfillment_ids:[]} };     
    }
    state = { isAddAdminModalOpen: false, isCreateFulfillmentModalOpen:false, isAddWaiterModalOpen:false,isCreateLocationModal: false, isRemoveFulfillmentModal: false};
 
    async componentDidMount(){ 
        this.get_locations()
        this.get_sections() 
        this.get_fulfillment()
            if(!this.hasMounted){        
            this.hasMounted = true;
            
            const {data_from_Parent} = this.props        
            if(data_from_Parent){
            this.setState({Parent_data:data_from_Parent})
            }
        }
        }
    
    async get_locations(){
        var res = await app.get('/admin/location');
        if(res.status)
        this.setState({locations:res.data})
    }

    async get_sections(){
        var res = await app.get('/admin/pages');
        if(res.status)
        this.setState({sections:res.data})
    }
    async get_fulfillment(){
        var res = await app.get('/admin/fulfilment-station');
        if(res.status)
        this.setState({fulfilments:res.data})
    }

    openAddAdminModal = () => {
        this.setState({ isAddAdminModalOpen: true });
      };
    
    closeAddAdminModal = () => {
        this.setState({ isAddAdminModalOpen: false });
      };

      openAddWaiterModal = () => {
        this.setState({ isAddWaiterModalOpen: true });
      };
    
    closeAddWaiterModal = () => {
        this.setState({ isAddWaiterModalOpen: false });
      };

      openCreateFulfillmentModal = (e,fulfilment_data) => {
        this.setState({ isCreateFulfillmentModalOpen: true });
        this.setState({data_fulfillment:fulfilment_data})
      };
    
    closeCreateFulfillmentModal = () => {
        this.setState({ isCreateFulfillmentModalOpen: false });
      };

      openRemoveFulfillment = (e,fulfilment_data) => {
        this.setState({ isRemoveFulfillmentModal: true });
        this.setState({data_fulfillment:fulfilment_data})
      };
    
      closeRemoveFulfillmentModal = () => {
        this.setState({ isRemoveFulfillmentModal: false });
      };

      getRemoveFulfillmentData=(from_child)=>{
        console.log("data from child: ", from_child)
        if("tej"===from_child){}
        this.get_fulfillment()
        this.setState({ isRemoveFulfillmentModal: false }); 
      }  

      openCreateLocationModal = (e,location_data) => {
        this.setState({ isCreateLocationModal: true });
        this.setState({data_location:location_data})
      };
    
      closeCreateLocationModal = () => {
        this.setState({ isCreateLocationModal: false });
      };

      getCreateLocationData =(value) =>{
        console.log("valuefromchildModal", value)
        if (value='tej'){
        this.setState({ isCreateLocationModal: false });
        this.get_locations() 
        }
      }

    
    async handleCreateUser(e){
        e.preventDefault()
        var fd = new FormData(e.target)
        console.log("state:", this.state)
        // console.log("Admin_detail:", this.state.admin_detail.email, this.state.selectedCheckboxes.Admin)
        // return false;
        fd.append('user_section', JSON.stringify(this.state.selectedCheckboxes));
        if(this.state.admin_detail.email && this.state.selectedCheckboxes.Admin===true){
            fd.append('admin_detail', JSON.stringify(this.state.admin_detail));
            }
        if(this.state.waiter_detail.email && this.state.selectedCheckboxes.Waiter===true){
            fd.append('waiter_detail', JSON.stringify(this.state.waiter_detail));
            }   
        var res = await app.post('/admin/profile-user',fd);
        console.log("RES: ", res);
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;
        }
        if(res.status)
        {
            app.toast(res.message, 'success');
            this.props.onSubmit("Thank You")
        }
    }

    handleLocationCheckboxChange = (event,category) => {
        const { value, checked } = event.target;
        console.log("checkbox Data: ", category,value, checked)
            // console.log("Category Value: ", category)
            // value=! value
            this.setState((prevState) => {
                    if(checked) { 
                    if(category === "Dash_Main"){
                    return{selectedCheckboxes: {...prevState.selectedCheckboxes,[category]: value}};
                    }
                    else{
                    return {selectedCheckboxes: {...prevState.selectedCheckboxes,[category]: 
                    [...prevState.selectedCheckboxes[category], value],[value]: true}};
                    }
                    } else {
                    const { [value]: _, ...newCheckedItems } = prevState.selectedCheckboxes;            
                    return {selectedCheckboxes: {...newCheckedItems,[category]: newCheckedItems[category].filter(item => item !== value)}};
                    }
                    });        
    };

    getAdminInfo=(from_child)=>{
    console.log("data from child: ", from_child)
    this.setState({admin_detail:from_child})
    this.setState({ isAddAdminModalOpen: false });  
    }

    getWaiterInfo=(from_child)=>{
        console.log("data from child: ", from_child)
        this.setState({waiter_detail:from_child})
        this.setState({ isAddWaiterModalOpen: false });  
        }

    getAFulfillmentInfo=(from_child)=>{
        this.setState({ isCreateFulfillmentModalOpen: false });
        this.get_fulfillment()
    }

    handleUpdate(e){
        const {name,value}= e.target;
        // this.setState({Parent_data:{[name]: value}});   
        // this.setState({ Parent_data: {...this.state.Parent_data, [name]: value} }) 
        this.setState((prevState) => ({
            Parent_data: {
              ...prevState.Parent_data,
              [name]: value
            }
          }));
    }

    render() { 
    const { isOpen, onClose } = this.props;
    const{isAddAdminModalOpen, isCreateLocationModal, waiter_detail, isCreateFulfillmentModalOpen, Parent_data, isRemoveFulfillmentModal, isAddWaiterModalOpen} = this.state
    if (!isOpen) return null;
    var {locations,selectedCheckboxes, sections, fulfilments, admin_detail} = this.state
   console.log("selectedCheckboxes: ", selectedCheckboxes)  
   console.log("Parent_data: ", Parent_data) 
   console.log("sections:", sections) 

    

    return (
    <> 
        <div className="modal-overlay" >
            <div className="modal-dialog w-75">
                <div className="modal-content mx-auto w-75">
                    <div className="modal-header border border-0 pb-0"> 
                        <h3 className='heading text-dark'>{Parent_data.id?"Update User":"Create User"}</h3>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form method="post" onSubmit={(event)=>this.handleCreateUser(event)}>
                    <div className="modal-body mt-0 pt-0">                        
                        <div className="row mt-2">
                        
                            <div className='col-md-5'>
                            <input type="text" className="form-control date-time" value={Parent_data.name} onChange={(e)=>this.handleUpdate(e)} placeholder="Name" name="name" id="name"/>
                            </div>
                            <div className='col-md-5'>
                            <input type="text" className="form-control date-time" value={Parent_data.surname} onChange={(e)=>this.handleUpdate(e)} placeholder="Surname" name="surname" id="surname"/>
                            </div>
                            <div className='col-md-2'>
                               
                                <div className='profile-radio side-box'data-bs-toggle="modal" >
                                <button type='button' className='menu-item btn-radius main-admin mb-4 mt-4 border border-0' onClick={(event)=>this.openAddWaiterModal(event)}>Add Waiter</button>
                                <span className='create-price admin-check'>
                                <input type="checkbox" id="profile-check" className='form-check-input  profile-radio mt-0' name="Waiter" value="Waiter" onChange={(event)=>this.handleLocationCheckboxChange(event,"Waiter_checked")} />
                                </span>
                                </div> 
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className='col-md-5'>
                            <input type="text" className="form-control date-time" value={Parent_data.pass_code} onChange={(e)=>this.handleUpdate(e)} placeholder="Pass Pin" name="pass_code" id="pass_code"/>
                            </div>
                            <div className='col-md-5' >
                                <select className="form-select date-time" name="status" id="status">
                                    <option>Active</option>
                                    <option>One Day</option>
                                </select>
                            </div>
                            <div className='col-md-2'>
                               
                                <div className='profile-radio side-box'data-bs-toggle="modal" href="#AddAdminDetails">
                                <button type='button' className='menu-item btn-radius main-admin mb-4 mt-4 border border-0' onClick={(event)=>this.openAddAdminModal(event)}>Add Admin</button>
                                <span className='create-price admin-check'>
                                <input type="checkbox" id="profile-check" className='form-check-input  profile-radio mt-0' name="Admin" value="Admin" onChange={(event)=>this.handleLocationCheckboxChange(event,"Admin_checked")}/>
                                </span>
                                </div> 
                            </div>
                        </div>        
                        <hr></hr>
                        <div className="scrollbar">
                        <div className='row'>
                            <div className='col-md-6'>
                                <h6 className='profile-location'>Location</h6>                                
                                { locations.map( (location_data) =>                                    
                                    <div key={location_data.name} className='row'>
                                        <div  className='col-lg-11'>
                                            <div className="card mt-2">
                                                <div className="right-extra d-flex">                        
                                                    <span className="equal text-muted dragdrop-icon">=</span> 
                                                    <div  className="form-check profile-check-btn">
                                                        <input className="form-check-input" type="checkbox" value={location_data.id} name={location_data.name} 
                                                        onChange={(event)=>this.handleLocationCheckboxChange(event,"Loc")}  />
                                                    </div>
                                                    <div className="extra-data">
                                                        <h3 className='peragraph text-secondary profile-heading mb-0 mt-1'>{location_data.name}</h3>
                                                    </div>
                                                </div>
                                            </div>                                       
                                        </div>
                                        <div className='col-lg-1 mt-2'>
                                            <div className="popup-icon-delete">
                                                <img src="../../../assets/images/edit.png" onClick={(event)=>this.openCreateLocationModal(event,location_data)} className="update-icon"/>
                                            </div>
                                        </div>
                                    </div> 
                                        )}
                                    <button type="button" className="menu-item btn-radius mt-2" onClick={(event)=>this.openCreateLocationModal(event)}>Add a new location
                                        <span className="btn-icon">
                                            <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                        
                                    <div className='col-lg-12'>
                                        <h6 className='profile-location mt-4'>Dashboards & Sections</h6>
                                        {sections.map((section_data)=>
                                        <>
                                        <div key={section_data.name} className="card mt-2">
                                            <div className="right-extra d-flex">
                                                <span className="equal text-muted dragdrop-icon">=</span>
                                                <div className="form-check profile-check-btn">
                                                    <input className="form-check-input" type="checkbox" name={section_data.name} value={section_data.id} 
                                                    onChange={(event)=>this.handleLocationCheckboxChange(event,"Dash")} />
                                                </div>
                                                <div className="extra-data">
                                                    <h3 className='peragraph text-secondary profile-heading mb-0 mt-1'>{section_data.name}</h3>
                                                </div>
                                                {selectedCheckboxes.Dash.includes(section_data.id.toString())?(
                                                
                                                    <div className='d-flex justify-content-end text-end w-100'>
                                                        <label className='peragraph text-secondary profile-heading'>Main</label>
                                                        <div className="form-check profile-check-btn mt-0">
                                                            <input className="form-check-input" type="radio"  name="option1" value={section_data.id} 
                                                            onChange={(event)=>this.handleLocationCheckboxChange(event,"Dash_Main")} />
                                                        </div>
                                                    </div>
                                                ):''}
                                                
                                            </div>
                                        </div> 
                                        </>
                                        )}
                                                                            
                                    </div>
                            </div>
                            
                            <div className='col-md-6'>
                                <h6 className='profile-location'>Fulfilment Station</h6>
                                  {fulfilments.map((fulfilment_data)=>                             
                                <div key={fulfilment_data.name} className='row'>
                                    <div className='col-lg-10'>
                                        <div className="card mt-2">
                                            <div className="right-extra d-flex">
                                                <span className="equal text-muted dragdrop-icon">=</span>
                                                <div className="form-check profile-check-btn">
                                                    <input className="form-check-input" type="checkbox" name={fulfilment_data.name} value={fulfilment_data.id} 
                                                    onChange={(event)=>this.handleLocationCheckboxChange(event,"fulfilment")} />
                                                </div>
                                                <div className="extra-data">
                                                    <h3 className='peragraph text-secondary profile-heading mb-0 mt-1'>{fulfilment_data.name}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-2 mt-2'>
                                        <div className='d-flex justify-content-between profile-edit-delete'>
                                            <div className='popup-icon-delete'>
                                                <img src="../../../assets/images/edit.png" onClick={(event)=>this.openCreateFulfillmentModal(event,fulfilment_data)} className="update-icon"/>
                                            </div>
                                            <div className='popup-icon-delete'>
                                                <img src="../../../assets/images/icon-delete.png" onClick={(event)=>this.openRemoveFulfillment(event,fulfilment_data)} className='update-icon'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )} 
                                <button type = "button" className="menu-item btn-radius mt-2" data-bs-toggle="modal" onClick={(event)=>this.openCreateFulfillmentModal(event)} href="#Createzones">Add a new fulfilment station
                                    <span className="btn-icon">	
                                        <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                        </div> 
                        </div>   
                    </div> 
                    <div className="modal-footer border border-0">
                        <div className='d-flex justify-content-between w-100'>
                            <div className='builder'>
                                <button className="menu-item right btn-radius pink-btn">Delete</button>
                            </div>
                            <div className='builder'>
                                <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                                <button className='menu-item right btn-radius green-btn'>Apply</button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        {isAddAdminModalOpen && (
            <AddAdminModal isOpen={isAddAdminModalOpen} onClose={this.closeAddAdminModal}  onSubmit={this.getAdminInfo}/>
        )}

        {isAddWaiterModalOpen && (
            <AddWaiterModal isOpen={isAddWaiterModalOpen} onClose={this.closeAddWaiterModal}  onSubmit={this.getWaiterInfo}/>
        )}
       
        {isCreateFulfillmentModalOpen && (
            <CreateFulfillmentModal isOpen={isCreateFulfillmentModalOpen} data_from_Parent={this.state.data_fulfillment} onClose={this.closeCreateFulfillmentModal}  onSubmit={this.getAFulfillmentInfo}/>
        )}

        {isCreateLocationModal && (
            <CreateLocationModal isOpen={isCreateLocationModal} data_from_Parent={this.state.data_location} onClose={this.closeCreateLocationModal} onSubmit={this.getCreateLocationData} />
        )}

        {isRemoveFulfillmentModal && (
            <RemoveFulfillment isOpen={isRemoveFulfillmentModal} data_from_Parent={this.state.data_fulfillment} onClose={this.closeRemoveFulfillmentModal} onSubmit={this.getRemoveFulfillmentData} />
        )}
    </>
    );
  }
}
