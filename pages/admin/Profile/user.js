import React from 'react'
import { Sidebar } from '../../../src';
import ProfileHeader from "../../../src/layouts/ProfileHeader";
import CreateUserModal from './modal_Create_User';

export default class user extends React.Component {

    constructor(props){
        super(props);  
        this.state = {users:[], data_user:[]};     
    }
    state = { isCreateUserModalOpen: false };

    async componentDidMount(){
        this.get_users()
    }

    async get_users(){
        var res = await app.get('/admin/profile-user');
        if(res.status)
        this.setState({users:res.data})
    }

      openCreateUserModal = (e,user_data) => {
        this.setState({ isCreateUserModalOpen: true });
        this.setState({data_user:user_data})
      };
    
      closeCreateUserModal = () => {
        this.setState({ isCreateUserModalOpen: false });
      };

      getCreateUserData =(value) =>{
        console.log("valuefromchildModal", value)
        if (value='Thank You'){
        this.setState({ isCreateUserModalOpen: false });
        this.get_users()
        }
      }
  
    render() {
        var {users} = this.state
        const{isCreateUserModalOpen} = this.state

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
                    <h5 className='menu-item fw-bold mb-4 mt-4'>Users</h5>
                    </div>
                    <div className='builder'>
                    <button className='menu-item btn-radius mb-4 mt-4' onClick={(event)=>this.openCreateUserModal(event)}>Create User<span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                    </div>
                </div>
                <div className='row'> 
                    { users.map( (user_data,index) =>                    
                    <div key={index} className='col-md-4'>
                        <div className="profile-box" data-bs-toggle="modal" href="#UpdateUserpop">
                            <div className="card-body">
                                <div className='d-flex justify-content-between'>
                                    <div className='rounded-cricle mt-2'>
                                        <span className="rounded-circle text-white">{user_data.short_name}</span>
                                    </div>
                                    <div className='rounded-button'>
                                        <button className='menu-item right btn-radius profile-btn green-Active-btn text-white w-100'>{user_data.role}</button>
                                        <br/>
                                        <button className='menu-item right btn-radius profile-green-btn green-Active-btn text-white w-100 mt-1'>{user_data.status}</button>
                                        <br/>
                                        <button className='menu-item right btn-radius profile-btn green-Active-btn text-white w-100 mt-1'onClick={(event)=>this.openCreateUserModal(event,user_data)}>Customize</button>
                                    </div>
                                </div>
                                <h2 className="heading text-secondary profile-heading">{user_data.name} {user_data.surname}</h2>
                                <span className="peragraph text-secondary profile-location mt-1">{user_data.locations}</span>
                                <p className="peragraph text-secondary pt-2 ">{user_data.dashboard_admin_section} </p>
                            </div>
                        </div>
                    </div>
                    
                    )}
               </div>
                </div>
            </div>
            </div>
        </div>
        
        {isCreateUserModalOpen && (
            <CreateUserModal isOpen={isCreateUserModalOpen} data_from_Parent={this.state.data_user} onClose={this.closeCreateUserModal} onSubmit={this.getCreateUserData} />
        )}
        </>
  )
}
}
