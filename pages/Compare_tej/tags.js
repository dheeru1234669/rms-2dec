import React from 'react';
import { Header, Sidebar } from '../../../src';
import { Modal, ModalBody, Button } from 'reactstrap'
import CreateTagModal from '../component/modal_Create_Tag'
import RemoveModal from '../component_ExtraGroup/modal_remove';



export default class Tag extends React.Component{

	constructor(props){
		super(props);  
        this.state = {tags:[],current_id:'', isCreateTagModalOpen: false,confirm_modal:!1, isRemoveModalopen:false};     
	}

    async componentDidMount(){
        this.get_tag()            
    }   

    async get_tag(){
        var res = await app.get('/admin/tag');
        if(res.status)
        this.setState({tags:res.data})
    }

    openCreateTagModalOpen = () => {
        this.setState({ isCreateTagModalOpen: true });
      };
    
      closeCreateTagModalOpen = () => {
        this.setState({ isCreateTagModalOpen: false });
      };

      getcreateTagdata =(value) =>{
        console.log("valuefromchildModal", value)
        if (value='tej'){
        this.setState({ isCreateTagModalOpen: false });
        this.get_tag() 
        }
      }

      openRemoveModal=(id)=>{
        this.setState({isRemoveModalopen:true})
        this.setState({current_id:id})
      }

      closeRemoveModal=()=>{
        this.setState({isRemoveModalopen:false})
      }



    getRemovedata=async (value)=>{
       if(value==="Remove")
       {
        var res = await app.put('/admin/tag',{tag_id:this.state.current_id, action:'delete'});
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;			
        }
        if(res.status)
        {
            app.toast(res.message, 'success');
            this.get_tag()
        }
        this.setState({isRemoveModalopen:false}) 
    }       
    }

	render() {
        var {tags} = this.state
        const{isCreateTagModalOpen, isRemoveModalopen, current_id} =this.state
        // console.log("Welcome",tags)
		return(
		<>
            
            <div className="container-fluid">
            <div className='row'>
                <Header/>
            </div>
            <div className='row'>
                <div className='col-md-2'>
                    <Sidebar/>
                </div>
                <div className='col-lg-10 p-0'>
                    <div className='wraper pb-5'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='d-flex justify-content-between'>
                                    <div className='tag'>
                                    <h5 className='menu-item tags fw-bold mb-4 mt-4'>Tags</h5>
                                    </div>
                                    <div className='tag'>
                                    <h5 className='menu-item fw-bold mb-4 mt-4 text-muted a-links'><a href="./preferencetags">Preference Tags</a></h5>
                                    </div>
                                </div>
                                <input type="text" className="form-control date-time" placeholder="Search"/>
                                    <div>
                                    { tags.map( (tag_data,index) =>
                                        
                                        <div key={index} className='d-flex justify-content-between border-top mt-2'>
                                            <div className='item-type mt-1'>
                                        <span className='modal-titel text-muted mt-2'>{tag_data.name}</span>
                                            </div>
                                            <div className="popup-icon-delete" onClick={()=>this.openRemoveModal(tag_data.id)}>
                                                <img src="../../../assets/images/icon-delete.png" className="delete-page-icon"/>
                                            </div>
                                        </div>
                                        
                                    )}
                                    </div>
                                    </div>
                                <div className='col-sm-6 mb-4 mt-4'>
                                    <div className='btn-tags mb-4 mt-5'>
                                    <button className='menu-item btn-radius' data-bs-toggle="modal"  onClick={this.openCreateTagModalOpen}>Create tags<span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                                    </div>
                                </div>
                            </div>
            
                        </div>
                    </div>
                </div>  
            </div>

    {isCreateTagModalOpen && (
            <CreateTagModal isOpen={isCreateTagModalOpen} onClose={this.closeCreateTagModalOpen} onSubmit={this.getcreateTagdata} />
        )}

    {isRemoveModalopen &&(
        <RemoveModal isOpen={isRemoveModalopen} onClose={this.closeRemoveModal} data_from_parent={"Tag"} onSubmit={this.getRemovedata} />
    )

    }
	   	</>
    )}
}