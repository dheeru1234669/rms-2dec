import React, { Component } from 'react';

export default class createitem_pop extends Component {

render() {
const { isOpen, onClose } = this.props;
if (!isOpen) return null;

return (
<>
<div className='modal-overlay'>
  <div class="modal fade px-3" id="Createitempop">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header border border-0 pb-0">
            <div className='d-flex justify-content-between w-100'>
              <div className='item-create'>
                <h3 className='heading text-dark'>Create Item</h3>
              </div>
              <div className='item-customize'>
                <h3 className='heading text-dark text-justify'>Customize Item</h3>
              </div>
              <div className='item-create'>
                <button type="button" class="btn-close large-close" data-bs-dismiss="modal" aria-hidden="true"></button>
              </div>
            </div>
          </div>
          <div className='modal-body pt-0 border border-0'>
            <div class="container-fuild">
              <div class="row gutters">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="row gutters">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="rounded-lg shadow-xl w-75">
                        <div class="flex items-center justify-center w-full upload-docu border border-secondary">
                          <i class="fa fa-info" aria-hidden="true"></i>
                          <label class="flex justify-content-center w-100">
                            <div class="flex flex-col items-center justify-center upload-img">
                              <p class=" text-sm tracking-wider text-center text-dark fw-bold text-secondary"> Click to upload image</p>
                            </div>
                            <input type="file" class="opacity-0" />
                          </label>
                          <div className='popup-icon-delete'>
            <img src="../assest/images/icon-delete.png" class="delete-pop-icon"/>
            </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="row mt-2">
                          <div className='col-sm-4'>
                            <input type="text" class="form-control date-time" placeholder="5449000131812" />
                          </div>
                          <div className='col-sm-5'>
                            <input type="text" class="form-control date-time" placeholder="5449000131812" />
                          </div>
                          <div class="col-3 col-lg-3 text-end d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            <button className='btn-radius'>Recipe</button>
                          </div>
                        </div>
                      </div>
                      <div class="form-group mt-2">
                        <input type="text" class="form-control date-time" placeholder="Product Name" />
                      </div>
                      <div className='row mt-2'>
                        <div className='col-sm-6'>
                          <input type="text" class="form-control date-time" placeholder="Category" />
                        </div>
                        <div className='col-sm-6'>
                          <input type="text" class="form-control date-time" placeholder="Fulfilled by, eg. Grill Chef" />
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div className='col-sm-4'>
                          <label class="form-check-label">
                            <span className='peragraph'>Price</span>
                          </label>
                          <input type="text" class="form-control date-time" placeholder="00.00" />
                        </div>
                        <div className='col-sm-4'>
                          <label class="form-check-label">
                            <span className='peragraph'>Size</span>
                          </label>
                          <input type="text" class="form-control date-time" placeholder="00/Small" />
                        </div>
                        <div class="col-4 col-lg-4 mt-3 pt-2 text-right d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          <button className='btn-radius'data-bs-toggle="modal" href="#CreatePriceVariationspop">Price Variations</button>
                        </div>
                      </div>
                      <button className='menu-item btn-radius mt-2'data-bs-toggle="modal" href="#AddVariantpop">Add Variant <span className='btn-icon'><i class="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                      <div class="row mt-2">
                        <div className='col'>
                          <label class="form-check-label">
                            <span className='peragraph'>Short description</span>
                          </label>
                          <input type="text" class="form-control date-time" placeholder="eg. A classic cheeseburger" />
                        </div>
                        </div>
                        <div class="row mt-2">
                        <div className='col'>
                          <label class="form-check-label">
                            <span className='peragraph'>Long description</span>
                          </label>
                          <textarea type="text" class="form-control date-time" placeholder="eg. A classic cheeseburger" />
                        </div>
                        </div>
                        <div class="row mt-2">
                        <div className='col d-flex justify-content-between'>
                          <div className='form'>
                        <button className='menu-item btn-radius mt-2'data-bs-toggle="modal" href="#CreateVisibilitypop">Visibility</button>
                        </div>
                        <div class="form-check mt-2">
                       <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"/>
                      <label class="form-check-label" for="check1"><span className='peragraph'>Out of stock </span></label>
                      </div>
                      <div class="form-check mt-2">
                       <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"/>
                      <label class="form-check-label" for="check1"><span className='peragraph'>Disable item</span></label>
                      </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <div className='row mt-3'>
                          <div className='d-flex justify-content-between'>
                            <div className='col-sm-10'>
                              <h3 className='modal-titel mb-0'>Add modifier group</h3>
                              <button className='menu-item btn-radius'data-bs-toggle="modal" href="#CreateGrouppop">Create Modifier Group <span className='btn-icon'>
                                  <i class="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                            <div className='col-sm-2 text-end pt-3'>
                              <button className='btn-radius text-end'data-bs-toggle="modal" href="#AddModifierGrouppop">Add <span className='btn-icon'>
                                  <i class="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='row mt-1'>
                          <div className='d-flex justify-content-between'>
                            <div className='col-sm-10 Customize-section'>
                            <h3 className='modal-titel mb-0 pb-1 mt-2'>Add tags</h3>
                          <input type="text" class="form-control date-time" placeholder="eg. A classic cheeseburger" />
                            </div>
                            <div className='col-sm-2 text-end pt-3 mt-2'>
                              <button className='btn-radius text-end'data-bs-toggle="modal" href="#Addtagspop">Add <span className='btn-icon'>
                                  <i class="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='row mt-2'>
                          <div className='d-flex justify-content-between'>
                            <div className='col-sm-10 Customize-section'>
                            <h3 className='modal-titel mb-0 pb-1 mt-2'>Add customer preference tags</h3>
                          <input type="text" class="form-control date-time" placeholder="eg. A classic cheeseburger" />
                            </div>
                            <div className='col-sm-2 text-end pt-3 mt-2'>
                              <button className='btn-radius text-end'data-bs-toggle="modal" href="#Addpreferencetagspop">Add <span className='btn-icon'>
                                  <i class="fa fa-plus fw-normal" aria-hidden="true"></i>
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
                                  <i class="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                            <div className='col-sm-2 text-end pt-3'>
                              <button className='btn-radius text-end'data-bs-toggle="modal" href="#AddModifierGrouppop">Add <span className='btn-icon'>
                                  <i class="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='d-flex justify-content-end mt-4'>
                     
                      <div className='builder btn-bottom'>
                     <button className='menu-item right btn-radius text-secondary border border-secondary'>Cancel</button>
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

  
</div>

</>
);
}
}
