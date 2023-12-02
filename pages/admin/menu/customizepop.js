function menupop(){
  
    return(
      <div className='pop'>
    <div class="modal fade px-3" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content p-2">
          <div class="modal-header border border-0 pb-0">
          <h3 className='heading text-dark'>Customize</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body border border-0 pt-1 pb-0">
              <input type="email" class="form-control date-time w-50"placeholder="Drinks"/>
              </div>
          <div class="modal-body border border-0">
          <div class="flex justify-center h-screen items-center">
<div class="rounded-lg shadow-xl bg-gray-50 md:w-1/2 w-[360px]">
        <div class="flex items-center justify-center w-full upload-docu border border-secondary">
            <label class="flex justify-content-center w-100">
                <div class="flex flex-col items-center justify-center mt-3 upload-img">
                    <p class=" text-sm tracking-wider text-center text-dark fw-bold text-secondary">
                    Click to upload image</p>
                </div>
                <input type="file" class="opacity-0" />
            </label>
            <div className='popup-icon-delete'>
            <img src="../assest/images/icon-delete.png" class="delete-pop-icon"/>
            </div>
    </div>
    <p className='peragraph pt-2'>Header image should be 1600px X 350px and in
.png or .jpeg images.</p>
<div class="form-check">
<input type="radio" class="form-check-input" id="radio1" name="optradio" value="option1" checked/><span className='peragraph'>Use an image header</span>
<label class="form-check-label" for="radio1"></label>
</div>
<div class="form-check">
<input type="radio" class="form-check-input" id="radio2" name="optradio" value="option2"/><span className='peragraph'>Use text as header</span>
<label class="form-check-label" for="radio2"></label>
</div>
<hr></hr>
<form action="/action_page.php">
<div class="form-check">
  <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"/>
  <label class="form-check-label" for="check1"><span className='peragraph'>Hidden category (items are still usable) </span></label>
</div>
<div class="form-check">
  <input type="checkbox" class="form-check-input" id="check2" name="option2" value="something"/>
  <label class="form-check-label" for="check2"><span className='peragraph'>Enable time based visibility</span></label>
</div>
<div className='row'>
  <div className='col-sm-6'>
  <label class="form-check-label"><span className='peragraph'>Enable time based visibility</span></label>
  <select class="form-select date-time">
<option>Every Day</option>
<option>One Day</option>
</select>
  </div>
  <div className='col-sm-3'>
  <label class="form-check-label"><span className='peragraph'>Start</span></label>
  <input type="text" class="form-control date-time" placeholder="00:00"/>
    </div>
    <div className='col-sm-3'>
    <label class="form-check-label"><span className='peragraph'>End</span></label>
    <input type="text" class="form-control date-time" placeholder="00:00"/>
    </div>
</div>
</form>
</div>
</div>
<button className='btn-radius mt-2'>Add<span className='btn-icon'><i class="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
<div className='d-flex justify-content-between mt-4'>
<div className='builder'>
<button className='menu-item right btn-radius pink-btn'data-bs-toggle="modal" href="#myModal2">Delete</button>

</div>
<div className='builder'>
<button className='menu-item right btn-radius text-secondary border border-secondary'>Cancel</button>
<button className='menu-item right btn-radius green-btn'>Apply</button>
</div>
</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  
        

        );
    }
    
    
    export default menupop;
