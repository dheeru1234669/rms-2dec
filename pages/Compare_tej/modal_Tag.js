import React from 'react';
import CreateTagModal from './modal_Create_Tag'

var T_args={};
export default class TagModal extends React.Component {

    constructor(props){
		super(props);  
        this.state = {tags:[], selectedCheckboxes:[], isCreateTagModalOpen: false,tag_value:'', is_loading:!1 };     
	}
    async componentDidMount(){
        this.get_tag()            
    }   

    async get_tag(){
        var res = await app.get('/admin/tag');
        if(res.status){
        this.setState({tags:res.data})
        }
        // console.log("tag_data1:", this.state.tags)  
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

      
        async handleSubmitTags(e){
            e.preventDefault()
            const { selectedCheckboxes } = this.state;
            console.log('Selected Checkboxes:', selectedCheckboxes);        
                this.props.onSubmit(this.state.selectedCheckboxes)
        }

        handleTagCheckboxChange = (event) => {
            const {name, value, checked} = event.target
        console.log("checked", name,value, checked)
        if(checked)
        {          
            T_args[value]=name
            this.setState({selectedCheckboxes:T_args})
        }
        else{
            console.log("value,name:",T_args, value, name)
            if(value){
            delete T_args[value];
            this.setState({selectedCheckboxes:T_args})
                    }
            }
            
          };

    
  render() {
    var {tags} = this.state
    const{isCreateTagModalOpen} =this.state
    // console.log("tag_data:", tags)
    const { isOpen, onClose, value} = this.props;

    if (!isOpen) return null;
 
    return ( 
        <> 
        <div className="modal-overlay ">
            <div className="modal-dialog topheightmodal w-75 mx-auto">
                <div className="modal-content w-50 mx-auto ">
                    <div className="modal-header border border-0 pb-0">
                        <h3 className='heading text-dark'>Add tags</h3>
                        <button  className="btn-close" onClick={onClose} data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <form method="post" onSubmit={(event)=>this.handleSubmitTags(event)}>
                    <div className="modal-body mt-0 pt-0">
                        <div className='add-tags'>
                            <div className='row'>                                
                                { this.state.is_loading?(<div className='col-md-6'>Wait...</div>):(tags.map( tag_data => 
                                <div key={tag_data.id} className='col-md-6'>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" name={tag_data.name} value={tag_data.id} onChange={this.handleTagCheckboxChange}/>
                                        <label className="form-check-label" htmlFor="check1"><span className='peragraph'>{tag_data.name}</span></label>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border border-0">
                        <div className='d-flex justify-content-between w-100'>
                            <div className='tag'>
                                <button type='button' className='menu-item btn-radius text-start' onClick={this.openCreateTagModalOpen}>Create tags
                                    <span className='btn-icon'>
                                        <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                    </span>
                                </button>
                                
                            </div>
                            <div className='tag'>
                                <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                                {/* <button className='menu-item right btn-radius green-btn'data-bs-toggle="modal" href="#Createitempop">Apply</button> */}
                                {
                                    this.state.is_loading ? 
                                    (<button type="button" className='menu-item right btn-radius pink-btn'>Wait...</button>                    
                                    ):
                                    (<button type="submit" className='menu-item right btn-radius green-btn'>Apply</button>)
                                }
                            </div>
                        </div>
                    </div> 
                    </form>
                </div>
            </div>
        </div>
        {isCreateTagModalOpen && (
            <CreateTagModal isOpen={isCreateTagModalOpen} onClose={this.closeCreateTagModalOpen} onSubmit={this.getcreateTagdata} />
        )}
           
            </>
    );
  }
}
