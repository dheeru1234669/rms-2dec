import React from 'react';
import Select, { components } from "react-select";


export default class ExtraAddItemModal extends React.Component {
   

    constructor(props){
        super(props);
        this.state={selectedOptions:[] }
        this.items=[]
       
      }
    
    componentDidMount(){
        this.get_items()
    }
   
    async get_items(){
        var res = await app.get('/admin/all-item');
        if (res.status){
        this.setState({items:res.data.dropdown})
        console.log("Item_Data:", this.state.items)
        }
    }

    CustomOption = (props) => (
        <components.Option {...props}>
        <div dangerouslySetInnerHTML={{ __html: props.data.name }} />
        </components.Option>
        );

    handleSelect=(selectedOptions)=> {
        console.log("SelectedValue", selectedOptions.label)
        // this.setState({selectedOptions})
        this.setState({selectedOptions: [...this.state.selectedOptions, {name:selectedOptions.name, label:selectedOptions.label,display_cat:selectedOptions.display_cat,
             display_name:selectedOptions.display_name, display_price:selectedOptions.display_price, display_size:selectedOptions.display_size, varient_id:selectedOptions.varient_id, selectedOptions}]} )
      }

      handleChange=(e)=>{
        console.log("Data_checked")
      }

      handleDelete = index => () => {
        const deleteval = [...this.state.selectedOptions]
        deleteval.splice(index, 1)
        this.setState({selectedOptions:deleteval})
        }
        
        handleSubmitExtraItem(e){
            e.preventDefault()
            const { selectedOptions } = this.state;
            console.log('Selected:', selectedOptions);        
                this.props.onSubmit(this.state.selectedOptions)
        }
          

    
  render() {

    const { isOpen, onClose, value} = this.props;

    if (!isOpen) return null;
    var{items, selectedOptions}= this.state
    console.log("Item_API_Data: ", this.state.items)
    console.log("selectedOptions: ", selectedOptions)

    return ( 
        <> 
        <div className="modal-overlay ">
            <div className="modal-dialog topheightmodal w-50 mx-auto">
                <div className="modal-content w-50 mx-auto ">                    
                   <div className="modal-header border border-0 pb-0">
                        <h3 className='heading text-dark'>Add Items</h3>
                        <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <form method="post" onSubmit={(event)=>this.handleSubmitExtraItem(event)}>
                    <div className="container"></div>
                        <div className="modal-body mt-0 pt-0">
                            <div className="form-group main-select-box mt-3">
                                <div className='col'>
                                    <div className="dropdown-container">
                                    <Select
                                        key={items}
                                        options={items}
                                        components={{ Option: this.CustomOption }}
                                        placeholder="Select Item"
                                        value={''}
                                        name="all_colors"
                                        onChange={this.handleSelect}
                                        isSearchable={true}
                                    />
                                    </div>
                                </div>
                            </div>
                            {/* <div className='row mt-2'>
                                <div className='col-sm-1 mt-4'>
                                    <input type="checkbox" className="form-check-input" id="check1" name="option1" value="something"/>
                                </div>
                                <div className='col-sm-6'>
                                    <label className="form-check-label">
                                        <span className='peragraph'>Extras group name</span>
                                    </label>
                                    <input type="text" className="form-control date-time" onChange={this.handleChange} placeholder="Make that a meal?" value={this.state.selectedOptions.label}/>
                                </div>
                                <div className='col-sm-5'>
                                    <label className="form-check-label">
                                        <span className='peragraph'>Options</span>
                                    </label>
                                    <div className="customselect w-100 h-50">
                                        <select className='add-modify-select'>
                                            <option>Yes, (fries and a drink), N</option>
                                        </select>
					                </div>    
                                </div>
                            </div> */}

                            
                             {selectedOptions.map((row_wise,index)=>(
                            <div key={row_wise.label} className="dropdown-row dropdown-item border border-1 item-border">
                                {/* <div contentEditable className="textbox" dangerouslySetInnerHTML={{ __html: row_wise.name }}/> */}
                                <div className='top-value'>{row_wise.display_name}</div>
                                <span className="dropdown-row">{row_wise.display_price}|{row_wise.display_size}</span>
                                
                                <img src='../../../assets/images/icon-delete.png'  onClick={this.handleDelete(index)} className='extra-item-delete'/> 
                            </div>
                             ))}
                             {/* ):(
                            <div style={{ display: 'none' }}>Hidden content</div>  
                            )}  */}
                        </div>
                    <div className="modal-footer border border-0">
                        <div className='d-flex justify-content-between'>
                            <div className='builder'>
                                <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                                <button className='menu-item right btn-radius green-btn' type="submit">Add</button>
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
