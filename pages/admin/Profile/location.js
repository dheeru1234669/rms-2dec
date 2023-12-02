import React from 'react';
import { Sidebar } from '../../../src';
import ProfileHeader from "../../../src/layouts/ProfileHeader";
import CreateLocationModal from './modal_Create_Location';


export default class Locations extends React.Component{

    constructor(props){
        super(props);  
        this.state = {locations:[], data_location:[]};     
    }
    state = { isCreateLocationModal: false };

      openCreateLocationModal = (e,location_data) => {
        this.setState({ isCreateLocationModal: true });
        this.setState({data_location:location_data})

      }; 
    
      closeCreateLocationModal = () => {
        this.setState({ isCreateLocationModal: false });
      };

    async componentDidMount(){
        this.get_locations()
    }

    async get_locations(){
        var res = await app.get('/admin/location');
        if(res.status)
        this.setState({locations:res.data})
    }

    getCreateLocationData =(value) =>{
        console.log("valuefromchildModal", value)
        if (value='tej'){
        this.setState({ isCreateLocationModal: false });
        this.get_locations() 
        }
      }

    render() {
        var {locations} = this.state;
        const {isCreateLocationModal} = this.state;

        return(
        <>
        <div className="container-fluid">
            <div className='row'>
            <ProfileHeader/>
            </div>
            <div className='row'>
            <div className='col-md-2'>
                <Sidebar/>
            </div>
            <div className='col-lg-10 p-0'>
                <div className='wraper'>
                <div className="d-flex justify-content-between">
                    <div className='builder'>
                    <h5 className='menu-item fw-bold mt-4'>Locations</h5>
                    </div>
                    <div className='builder'>
                    <button className='menu-item btn-radius mt-4' onClick={(event)=>this.openCreateLocationModal(event)}>Create Location<span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                    </div>
                </div>
                <div className='row'> 
                    { locations.map( location_data =>
                    
                    <div key={location_data.id} className='col-md-4'>
                        <div className="profile-box profile-user-location" data-bs-toggle="modal" href="#UpdateUserpop">
                        <div className="card-body">
                        <div className='d-flex justify-content-between'>
                            <div className='rounded-cricle mt-2'>
                            <span className="profile-toro text-white"><img src={location_data.img_mdfy} className="profile-toro-icon"/></span>
                            </div>
                            <div className='rounded-button'>
                            <button className='menu-item right btn-radius profile-green-btn green-Active-btn text-white w-100 mt-2'>Active</button>
                            <br></br>
                            <button className='menu-item right btn-radius profile-btn green-Active-btn text-white w-100'onClick={(event)=>this.openCreateLocationModal(event,location_data)}>Customize</button>
                            </div>
                        </div>
                        <h2 className="heading text-secondary profile-heading">{location_data.name}</h2>
                        <div className='d-flex justify-content-between mt-3'>
                            <div className='profile-details'> 
                            <p className='profile-data'>{location_data.address_1},<br/>
                                {location_data.address_2},<br/>
                                {location_data.address_3},<br/>
                                {location_data.city},<br/>
                                {location_data.country},<br/>
                                {location_data.postal_code},<br/>
                                {location_data.email}
                            </p>
                            </div>
                            <div className='profile-details'>
                            <p className='profile-data'>{location_data.phone_1} <br/>{location_data.phone_2}</p>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                    
                    )}

                </div>
                </div>
            </div>
            </div>
        </div>
        {isCreateLocationModal && (
            <CreateLocationModal isOpen={isCreateLocationModal} data_from_Parent={this.state.data_location} onClose={this.closeCreateLocationModal} onSubmit={this.getCreateLocationData} />
        )}
        </>
    )}
}
