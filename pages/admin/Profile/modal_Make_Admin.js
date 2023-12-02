import React from "react";

var A_args={};
export default class AddAdminModal extends React.Component {
  constructor(props){
    super(props);
    this.state={email:"", password:"", selectedCheckboxes:[],
    sections_Admin:[],}
  }

  async componentDidMount(){ 
    this.get_sections()
    }

async get_sections(){
    var res = await app.get('/admin/admin-section');
    if(res.status)
    this.setState({sections_Admin:res.data})
}

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  async handleSubmit(e){
    e.preventDefault()
    // alert("Same Page");
    const { selectedCheckboxes } = this.state;
    console.log('Selected Checkboxes:', selectedCheckboxes); 
    var args={}
    args['email']=this.state.email
    args['password']=this.state.password
    args['admin_section']=this.state.selectedCheckboxes      
    this.props.onSubmit(args)
}

  handleCheckboxChange = (event) => {
    const {name, value, checked} = event.target
    console.log("checked", name,value, checked)
    if(checked)
    {          
      A_args[value]=name
        this.setState({selectedCheckboxes:A_args})
    }
    else{
        console.log("value,name:",A_args, value, name)
        if(value){
        delete A_args[value];
        this.setState({selectedCheckboxes:A_args})
                }
        }
        
      };

  handleReset = () => {
    this.setState({
      email: '',
      password: '',
    });
  };

  render() {
    const { isOpen, onClose } = this.props;
    if (!isOpen) return null;
    const {  email, password, sections_Admin,selectedCheckboxes } = this.state;
    console.log("selectedCheckboxes: ", selectedCheckboxes)

    return (
      <>
        <div className="modal-overlay">
          <div className="modal-dialog w-75">
            <div className="modal-content mx-auto w-50">
              <div className="modal-header border border-0 pb-0">
                <h3 className='heading text-dark'>Add Admin Details</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={onClose} aria-hidden="true"></button>
              </div>
              <form method="post" onSubmit={(event)=>this.handleSubmit(event)}>
              <div className="modal-body mt-0 pt-0">
              
                <div className="row mt-2">
                  <div className='col-md-5'>
                    <span className="peragraph">Admin panel login details</span>
                    <input type="email" name="email" value={email} className="form-control date-time" placeholder="Email" onChange={(e)=>this.handleChange(e)} />
                  </div>
                  <div className='col-md-5 mt-4'>
                    <div className="create-price ">
                      <input type="text" name="password" value={password} className="form-control date-time" placeholder="*********" onChange={(e)=>this.handleChange(e)} />
                      <i className="fa fa-eye-slash profile-eyes-icon" aria-hidden="true"></i>
                    </div>       
                  </div>
                  <div className='col-md-2 mt-4'>
                    <div className='builder d-flex justify-content-end'>
                      <button type="button" className="menu-item right btn-radius pink-btn" onClick={this.handleReset}>Reset</button>
                    </div>
                  </div>
                </div> 

              <hr></hr>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <h6 className='profile-location mt-4'>Set admin sections access</h6>
                      {sections_Admin.map((admin_data)=>
                      <div key={admin_data.id} className="card mt-2">
                        <div className="right-extra d-flex">
                          <span className="equal text-muted dragdrop-icon">=</span>
                          <div className="form-check profile-check-btn">
                            <input className="form-check-input" type="checkbox" id="profile-checks" name={admin_data.name} value={admin_data.id} onChange={this.handleCheckboxChange}/>
                          </div>
                          <div className="extra-data">
                            <h3 className='peragraph text-secondary profile-heading mb-0 mt-1'>{admin_data.name}</h3>
                          </div>
                        </div>
                      </div>
                    
                    )}           
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
