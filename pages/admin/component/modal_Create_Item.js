import React from 'react';
import PreferenceTagModal from './modal_PreferenceTag';
import TagModal from './modal_Tag';

export default class CreateitemModal extends React.Component {

    state = {
        
        isPreferenceTagModalOpen: false,
        isTagModalOpen: false,
        tagname:[], preferencename:[]
      };
    

      openPreferenceTagModal = () => {
        this.setState({ isPreferenceTagModalOpen: true });        
      };
    
      closePreferenceTagModal = () => {
        this.setState({ isPreferenceTagModalOpen: false });
      };
    
      openTagModal = () => {
        this.setState({ isTagModalOpen: true });
      };
    
      closeTagModal = () => {
        this.setState({ isTagModalOpen: false });
      };
    
      getTagdata =(valuefromTagModal) =>{
        console.log("valuefromTagModal", valuefromTagModal)
        this.setState({tagname: valuefromTagModal})
        this.setState({ isTagModalOpen: false });  
      }

      getPreferenceTagdata=(valuefromPreferenceTagdata) =>{
        console.log("valuefromPreferenceTagdata: ", valuefromPreferenceTagdata)
        this.setState({preferencename: valuefromPreferenceTagdata})
        this.setState({ isPreferenceTagModalOpen: false });
      }

    handlePreferenceTagRemove = (event,key)=> {
        var deletePreferenceTagval = this.state.preferencename
        delete deletePreferenceTagval[key];
        this.setState({preferencename:deletePreferenceTagval})        
    }

    handleTagRemove = (event,key)=> {
        var deleteTagval = this.state.tagname
        delete deleteTagval[key];
        this.setState({tagname:deleteTagval})        
    }

render() {
    const {  isPreferenceTagModalOpen, isTagModalOpen, tagname, preferencename } = this.state;
    const { isOpen, onClose } = this.props;
    

    if (!isOpen) return null;

return (
        <>
        <div className='modal-overlay'>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header border border-0 pb-0">
                        <div className='d-flex justify-content-between w-100'>
                            <div className='item-create'>
                                <h3 className='heading text-dark'>Create Item</h3>
                            </div>
                            <div className='item-customize'>
                                <h3 className='heading text-dark text-justify'>Customize Item</h3>
                            </div> 
                            <div className='item-create'>
                                <button type="button" className="btn-close large-close" onClick={onClose} data-bs-dismiss="modal" aria-hidden="true"></button>
                            </div>
                        </div>
                    </div>
                    <div className='modal-body pt-0 border border-0'>
                        <div className="container-fuild">
                            <div className="row gutters">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="row gutters">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="rounded-lg shadow-xl w-75">
                                                <div className="flex items-center justify-center w-full upload-docu border border-secondary">
                                                    <i className="fa fa-info" aria-hidden="true"></i>
                                                    <label className="flex justify-content-center w-100">
                                                        <div className="flex flex-col items-center justify-center upload-img">
                                                            <p className=" text-sm tracking-wider text-center text-dark fw-bold text-secondary"> Click to upload image</p>
                                                        </div>
                                                        <input type="file" className="opacity-0" />
                                                    </label>
                                                    <div className='popup-icon-delete'>
                                                        <img src="../../../assets/images/icon-delete.png" className="delete-pop-icon" />
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row mt-2">
                                                    <div className='col-sm-4'>
                                                        <input type="text" className="form-control date-time" placeholder="5449000131812" />
                                                    </div>
                                                    <div className='col-sm-5'>
                                                        <input type="text" className="form-control date-time" placeholder="5449000131812" />
                                                    </div>
                                                    <div className="col-3 col-lg-3 text-end d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                                        <button className='btn-radius'>Recipe</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mt-2">
                                                <input type="text" className="form-control date-time" placeholder="Product Name" />
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col-sm-6'>
                                                    <input type="text" className="form-control date-time" placeholder="Category" />
                                                </div>
                                                <div className='col-sm-6'>
                                                    <input type="text" className="form-control date-time" placeholder="Fulfilled by, eg. Grill Chef" />
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className='col-sm-4'>
                                                    <label className="form-check-label">
                                                        <span className='peragraph'>Price</span>
                                                    </label>
                                                    <input type="text" className="form-control date-time" placeholder="00.00" />
                                                </div>
                                                <div className='col-sm-4'>
                                                    <label className="form-check-label">
                                                        <span className='peragraph'>Size</span>
                                                    </label>
                                                    <input type="text" className="form-control date-time" placeholder="00/Small" />
                                                </div>
                                                <div className="col-4 col-lg-4 mt-3 pt-2 text-right d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                                    <button className='btn-radius'data-bs-toggle="modal" href="#CreatePriceVariationspop">Price Variations</button>
                                                </div>
                                            </div>
                                            <button className='menu-item btn-radius mt-2'data-bs-toggle="modal" href="#AddVariantpop">Add Variant <span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                                            <div className="row mt-2">
                                                <div className='col'>
                                                    <label className="form-check-label">
                                                        <span className='peragraph'>Short description</span>
                                                    </label>
                                                    <input type="text" className="form-control date-time" placeholder="eg. A classic cheeseburger" />
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className='col'>
                                                    <label className="form-check-label">
                                                        <span className='peragraph'>Long description</span>
                                                    </label>
                                                    <textarea type="text" className="form-control date-time" placeholder="eg. A classic cheeseburger" />
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className='col d-flex justify-content-between'>
                                                    <div className='form'>
                                                        <button className='menu-item btn-radius mt-2'data-bs-toggle="modal" href="#CreateVisibilitypop">Visibility</button>
                                                    </div>
                                                    <div className="form-check mt-2">
                                                        <input type="checkbox" className="form-check-input" id="check1" name="option1" value="something"/>
                                                        <label className="form-check-label" htmlFor="check1"><span className='peragraph'>Out of stock </span></label>
                                                    </div>
                                                    <div className="form-check mt-2">
                                                        <input type="checkbox" className="form-check-input" id="check1" name="option1" value="something"/>
                                                        <label className="form-check-label" htmlFor="check1"><span className='peragraph'>Disable item</span></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <div className='row mt-3'>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='col-sm-10'>
                                                            <h3 className='modal-titel mb-0'>Add modifier group</h3>
                                                            <button className='menu-item btn-radius'data-bs-toggle="modal" href="#CreateGrouppop">Create Modifier Group <span className='btn-icon'>
                                                                <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className='col-sm-2 text-end pt-3'>
                                                            <button className='btn-radius text-end'data-bs-toggle="modal" href="#AddModifierGrouppop">Add <span className='btn-icon'>
                                                                <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row mt-1'>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='col-sm-10 Customize-section'>
                                                            <h3 className='modal-titel mb-0 pb-1 mt-2'>Add tags</h3>
                                                            <div className="displaytag-container">                                                                
                                                            {Object.keys(tagname).map((key) => (
                                                                    <div key={key} className="displaytag">
                                                                        <span className="tag">{tagname[key]}
                                                                            <span className="tag-close-icon" value={tagname[key]} onClick={(event)=>this.handleTagRemove(event,key)}> x </span>
                                                                        </span>
                                                                    </div>
                                                                ))}                                                                
                                                            </div>
                                                        </div>  
                                                        <div className='col-sm-2 text-end pt-3 mt-2'>
                                                            <button className='btn-radius text-end'data-bs-toggle="modal" onClick={this.openTagModal}>Add <span className='btn-icon'>
                                                                <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                                                </span>
                                                            </button>
                                                              
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row mt-2'>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='col-sm-10 Customize-section'>
                                                            <h3 className='modal-titel mb-0 pb-1 mt-2'>Add customer preference tags</h3>
                                                            <div className="displaytag-container">  
                                                            {Object.keys(preferencename).map((key) => (                                                                                                                         
                                                                    <div key={key} className="displaytag">
                                                                        <span className="tag">{preferencename[key]}
                                                                            <span className="tag-close-icon" value={preferencename[key]} onClick={(event)=>this.handlePreferenceTagRemove(event,key)}> x </span>
                                                                        </span>
                                                                    </div>
                                                                ))}                                                                
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-2 text-end pt-3 mt-2'>
                                                            <button className='btn-radius text-end'data-bs-toggle="modal" onClick={this.openPreferenceTagModal}>Add <span className='btn-icon'>
                                                                <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                                                </span>
                                                            </button>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row mt-3'>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='col-sm-10'>
                                                            <h3 className='modal-titel mb-0'>Add extras group</h3>

                                                            <button className='menu-item btn-radius'>Create Modifier Group <span className='btn-icon'>
                                                                <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className='col-sm-2 text-end pt-3'>
                                                        <button className='btn-radius text-end'data-bs-toggle="modal" href="#AddModifierGrouppop">Add <span className='btn-icon'>
                                                            <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                                            </span>
                                                        </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-end mt-4'>
                                                    <div className='builder btn-bottom'>
                                                        <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                                                        <button className='menu-item right btn-radius green-btn'>Apply</button>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>  
                            {isTagModalOpen &&(
                                <TagModal isOpen={isTagModalOpen} onClose={this.closeTagModal} onSubmit={this.getTagdata}/>
                            )}

                            {isPreferenceTagModalOpen && (
                                <PreferenceTagModal isOpen={isPreferenceTagModalOpen} onClose={this.closePreferenceTagModal} onSubmit={this.getPreferenceTagdata} />
                            )}

</>
)
}
}
