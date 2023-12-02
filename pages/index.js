import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { withRouter } from 'next/router';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {value:'', is_loading:!1};
    }	

    async handleSubmit(e){
        e.preventDefault()
        this.setState({is_loading:!this.state.is_loading })
        var fd = new FormData(e.target)
        var res = await app.post('/admin/login',fd);
        if(!res.status)
        {
            this.setState({is_loading:!this.state.is_loading })
            app.toast(res.message, 'warning');
            return false;			
        }


        if(res.status)
        {
            sessionStorage.setItem('rms_token',res.data.token);
            sessionStorage.setItem('rms_admin_info',JSON.stringify(res.data));
            e.target.reset();
            //location.href = 'admin/dashboard';
            await this.props.router.push('admin/dashboard');
            this.setState({is_loading:!this.state.is_loading })
        }

    }

    render(){
        return(
                <>
                <div className="container-fluid background-image">
                <div className='row'>
                <div className="container">
                {/*<h1 className="form-heading">login Form</h1>*/}
                <div className='container'>
                <div className='row'>
                <div className='col-md-5 mx-auto p-3'>
                <div className="login-form">
                <div className="main-div mx-auto">
                <div className="panel">
                </div>
                <form method="post" onSubmit={(event)=>this.handleSubmit(event)}>
                <div className="form-group">
                <input type="email" className="form-control" placeholder="Email Address" id="email" aria-describedby="email" name="email" required/>
                </div>
                <div className="form-group">
                <input type="password" className="form-control" id="password" name="password" placeholder="Password"/>
                </div>

                { 
                    this.state.is_loading ? 
                    (
                        <button type="button" className='btn btn-primary'>Wait...</button>
                    ):
                    (
                    <button type="submit" className='btn btn-primary'>Apply</button>
                    )
                    } 

                </form>
                </div>
                </div></div></div>
                </div>
                </div>
                </div>
                </div>
                </>
                )
                } 

}
export default withRouter(Home);
