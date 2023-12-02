import React from 'react';

var args={};
export default class PreferenceTagModal extends React.Component {
    constructor(props){
        super(props);
        this.state={Nutritional_preferences:[], Allergen_preferences: [], selectedCheckboxes:[], is_loading:!1}
    }
    

    componentDidMount(){
        this.get_preferencetag()            
    } 

    async get_preferencetag(){
        var res = await app.get('/admin/prefernce-tag');
        if(res.status){
            console.log("check",res.data)
        this.setState({Nutritional_preferences:res.data.nutritional_preferences, Allergen_preferences: res.data.allergen_preferences})
    }
    }

    async handleSubmitTags(e){
        e.preventDefault()
        // alert("Same Page");
    const { selectedCheckboxes } = this.state;
    console.log('Selected Checkboxes:', selectedCheckboxes);        
        this.props.onSubmit(this.state.selectedCheckboxes)
    }

    handlePTCheckboxChange=(event)=>{
        const {name, value, checked} = event.target
        console.log("checked", name,value, checked)
        if(checked)
        {          
            args[value]=name
            this.setState({selectedCheckboxes:args})
        }
        else{
            console.log("value,name:",args, value, name)
            if(value){
            delete args[value];
            this.setState({selectedCheckboxes:args})
                    }
            }
    } 

    handleCancel(e){
        e.preventDefault()
        var args_to_parent = {}
        args_to_parent['is_close'] = 'close'
        this.props.onSubmit(args_to_parent)
    }

  render() {
    var Nutritional_preferences = this.state.Nutritional_preferences
    var Allergen_preferences = this.state.Allergen_preferences

    const { isOpen, onClose } = this.props;
    if (!isOpen) return null;
    return ( 
        <> 
        <div className="modal-overlay">
            <div className="modal-dialog topheightmodal w-50 mx-auto">
                <div className="modal-content w-75 mx-auto">
                    <div className="modal-header border border-0 pb-0">
                        <h3 className='heading text-dark'>Add customer preference tags</h3>
                        <button type="button" className="btn-close" onClick={(event)=>this.handleCancel(event)}></button>
                    </div>
                    <form method="post" onSubmit={(event)=>this.handleSubmitTags(event)}>
                    <div className="modal-body mt-0 pt-0">
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='Nutritional'>
                                    <h3 className="heading">Nutritional preferences</h3>
                                </div>
                                <hr className="m-0"></hr>
                                <div>
                                { Nutritional_preferences.map ( nutritionaltag_data =>
                                
                                <div key={nutritionaltag_data.id} className='row mt-1'>
                                    <ul className='preference-list'>
                                        <li className='preference-item'>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox"  id={nutritionaltag_data.id} name={nutritionaltag_data.name} value={nutritionaltag_data.id} onChange={this.handlePTCheckboxChange}/>
                                            </div>
                                        </li>
                                        <li className='preference-item'>
                                            <div className='cricle-img'>
                                                <img src="../../../assets/images/leaf.png" className='prefrence-img'/>
                                            </div>
                                        </li>
                                        <li className='preference-item'>
                                            <div className='modal-title preference-title'>{nutritionaltag_data.name}</div>
                                        </li>
                                    </ul>
                                </div>   
                            
                                )} 
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className='Nutritional'>
                                    <h3 className="heading">Allergen preferences</h3>
                                </div>
                                <hr className="m-0"></hr>
                                <div>
                                {Allergen_preferences.map ( allergentag_data =>
                                
                                <div key={allergentag_data.id} className='row mt-1'>
                                    <ul className='preference-list'>
                                        <li className='preference-item'>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id={allergentag_data.id} name={allergentag_data.name} value={allergentag_data.id} onChange={this.handlePTCheckboxChange}/>
                                            </div>
                                        </li>
                                        <li className='preference-item'>
                                            <div className='cricle-img'>
                                                <img src="../../../assets/images/leaf.png" className='prefrence-img'/>
                                            </div>
                                        </li>
                                        <li className='preference-item'>
                                            <div className='modal-title preference-title'>{allergentag_data.name}</div>
                                        </li>
                                    </ul>
                                </div>
                                
                                 )}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border border-0">
                        <div className='d-flex justify-content-between'>
                            <div className='tag'>
                                <button type="button" className='menu-item right btn-radius text-secondary border border-secondary' onClick={(event)=>this.handleCancel(event)}>Cancel</button>
                                {this.state.is_loading?
                                (<button className='menu-item right btn-radius pink-btn' >Wait...</button>
                                ):
                                (<button className='menu-item right btn-radius green-btn' >Apply</button>)}
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
