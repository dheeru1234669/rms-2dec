import React from 'react';

export default class CreateTagModal extends React.Component {

    constructor(props){
		super(props);        
        this.state = {tags:[], name:'', is_loading:!1,tag_created:[]};      
	}
    
    async componentDidMount(){
        this.get_tag()            
    } 

    async get_tag(){
        var res = await app.get('/admin/tag');
        if(res.status)
        this.setState({tags:res.data})
    }

    async handleSubmitCreateTag(e){
        e.preventDefault()
        var tags_args =[]
        this.setState({is_loading:!this.state.is_loading})
        if(this.state.tag_created){
            tags_args=this.state.tag_created
        }
        else {
            tags_args = [{name:this.state.name}]
        }
        var res = await app.post('/admin/tag',{name:JSON.stringify(tags_args)});
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

    handletaginput=(e)=>{
        const{name, value}= e.target
        this.setState({[name]:value})
    }

    submittag=()=>{
        this.setState({tag_created:[...this.state.tag_created,{"name":this.state.name}]})
        this.setState({name:""})
    }
    handlechange=()=>{ }
    
 
    
  render() {
    const { isOpen, onClose } = this.props;
    const {tag_created,name} = this.state
    console.log("tag_created", tag_created)
    if (!isOpen) return null;

    return ( 
        <> 
        <div className="modal-overlay ">
            <div className="modal-dialog topheightmodal w-50 mx-auto">
                <div className="modal-content w-50 mx-auto ">
                <div className="modal-header border border-0 pb-0">
                        <h3 className='heading text-dark'>Create tags</h3>
                        <button type="button" onClick={onClose} className="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>                
                    </div>
                    <div className="modal-body mt-0 pt-0">
                    <form method="post" onSubmit={(event)=>this.handleSubmitCreateTag(event)}>
                        <div className="row mt-2">
                            <div className='col-lg-8'>
                                <label className="form-check-label">
                                <span className='peragraph'>Name</span>
                                </label>
                                {tag_created.length > 0?(
                                <input type="text" className="form-control date-time" placeholder="salad" name="name" value={name} 
                                onChange={(event)=>this.handletaginput(event)} />
                                ):(<input type="text" className="form-control date-time" placeholder="salad" name="name" value={name} 
                                onChange={(event)=>this.handletaginput(event)} required/>)}
                            </div>
                            <div className='col-sm-2 mt-3'>
                            <div className='popup-icon-delete'>
                            <img src="../../../assets/images/icon-plus.png" className="icon-plush" onClick={this.submittag} />
                            </div>
                            </div>
                        </div>
                        { tag_created && tag_created.map( (tag_data,index) =>
                        
                        <div key={index} className="row mt-2">
                            <div className='col-lg-8'>
                                <input type="text" className="form-control date-time" value={tag_data.name} onChange={this.handlechange}/>                            
                            </div>
                            <div className='col-sm-2'>
                                <div className='popup-icon-delete'>
                                    <img src="../../../assets/images/icon-delete.png" className="delete-popnopostion"/>
                                </div>
                            </div>
                        </div>                        
                        )}
                    
                        <div className="modal-footer border border-0">
                            <div className='d-flex justify-content-between'>
                                <div className='builder'>
                                <button type = "button" className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                                <button className='menu-item right btn-radius green-btn' type="submit" >Apply</button>
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
