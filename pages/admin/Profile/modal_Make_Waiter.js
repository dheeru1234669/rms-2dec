import React from "react";

var A_args={};
export default class AddWaiterModal extends React.Component {
  constructor(props){
    super(props);
    this.state={email:"", password:"",mobile:'', passport:''}
  }

  async handleSubmit(e){
    e.preventDefault() 
    var args={}
    args['email']=this.state.email
    args['password']=this.state.password     
    args['mobile']=this.state.mobile     
    args['passport']=this.state.passport     
    this.props.onSubmit(args)
}  

  handleReset = () => {
    this.setState({
      email: '',
      password: '',
      mobile:'', 
      passport:''
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { isOpen, onClose } = this.props;
    if (!isOpen) return null;
    const {  email, password,mobile,passport } = this.state;

    return (
      <>
        <div className="modal-overlay">
          <div className="modal-dialog w-75">
            <div className="modal-content mx-auto w-50">
              <div className="modal-header border border-0 pb-0">
                <h3 className='heading text-dark'>Add Waiter Details</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={onClose} aria-hidden="true"></button>
              </div>
              <form method="post" onSubmit={(event)=>this.handleSubmit(event)}>
                <div className="modal-body mt-0 pt-0">
                  <div>
                    <div className="row mt-2">
                      <div className='col-md-5'>
                        <span className="peragraph">Web ordering app login details</span>
                        <input type="email" name="email" value={email} className="form-control date-time" placeholder="Email" onChange={(e)=>this.handleChange(e)} />
                      </div>
                      <div className='col-md-5 mt-4'>
                        <div className="create-price ">
                          <input type="text" name="password" value={password} className="form-control date-time" placeholder="*********" onChange={(e)=>this.handleChange(e)} />
                          <i className="fa fa-eye-slash profile-eyes-icon" aria-hidden="true"></i>
                        </div>       
                      </div>                  
                    </div> 
                    <div className="row mt-1">
                      <div className='col-md-5'>
                        <input type="text" name="mobile" value={mobile} className="form-control date-time" placeholder="Contact Number" onChange={(e)=>this.handleChange(e)} />
                      </div>
                      <div className='col-md-5 mt-1'>
                        <div className="create-price ">
                          <input type="text" name="passport" value={passport} className="form-control date-time" placeholder="ID Number / Passport Number" onChange={(e)=>this.handleChange(e)} />
                        </div>       
                      </div>
                      <div className='col-md-2 mt-1'>
                        <div className='builder d-flex justify-content-end'>
                          <button type="button" className="menu-item right btn-radius pink-btn" onClick={this.handleReset}>Reset</button>
                        </div>
                      </div>
                    </div>
                  </div>

              
              
            </div>
            <div className="modal-footer border border-0">
              <div className='d-flex '>
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
      </>
    );
  }
}
