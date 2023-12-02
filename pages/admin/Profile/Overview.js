import React from "react";
import {Sidebar } from '../../../src';
import ProfileHeader from "../../../src/layouts/ProfileHeader";


export default class Overview extends React.Component{

    constructor(props){
        super(props);  
        this.state = {overview:[]};     
    }

    async componentDidMount(){
        this.get_overview()
    }

    async get_overview(){
        var res = await app.get('/admin/profile-overview');
        if(res.status)
        this.setState({overview:res.data})
    }

    render() {
        var {overview} = this.state

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
                <h5 className='menu-item fw-bold mb-4 mt-4'>Overview</h5>
                <div className="d-flex justify-content-start">
                    <div className="card card-item">
                    <div className="card-body">
                        <h4 className='menu-item fw-bold'>Current Locations</h4>
                        <sapn className="total-item fw-bold">{overview.current_locations}</sapn>
                    </div>
                    </div>
                    <div className="card">
                    <div className="card-body card-item">
                        <h4 className='menu-item fw-bold'>Current Admins</h4>
                        <sapn className="total-item fw-bold">{overview.current_admins}</sapn>
                    </div>
                    </div>
                </div>
                <div className="card sold-item">
                    <div className="card-body card-item">
                    <h4 className='menu-item fw-bold'>Total Users</h4>
                    <sapn className="total-item fw-bold">{overview.current_users} Users</sapn>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )}
}
