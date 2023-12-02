import React, { Component } from 'react';

export default class ModalCreate extends Component {

    constructor(props){
        super(props);
    }

    async componentDidMount(){
        this.get_extras()
    }

    async get_extras(){
        var res = await app.get('/admin/extras-group');
        if(res.status)
        this.setState({extras:res.data})

        //document.getElementById("opt").style.display = "none";
    }

    async handleExtrasGroup(e){
        e.preventDefault()
        var fd = new FormData(e.target)
        var res = await app.post('/admin/extras-group',fd);
        console.log("RES: ", res);
        if(!res.status)
        {
            app.toast(res.message, 'warning');
            return false;
        }
        if(res.status)
        {
            app.toast(res.message, 'success');
            this.props.onSubmit();
            //this.crtExtGrpToggleModal()
            //this.get_extras_group()
        }
    }

    render() {
    const { isOpen, onClose } = this.props;

    if (!isOpen) return null;

    return (
    <> 
<div className="modal-overlay" >
    <div className="modal-dialog w-75">
        <div className="modal-content mx-auto w-50">
            <div className="modal-header border border-0 pb-0">
                <h3 className='heading text-dark'>Add Extras Group</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-hidden="true" onClick={onClose}></button>
            </div>
            <div className="container"></div>
            <div className="modal-body mt-0 pt-0">
            <form method="post" onSubmit={(event)=>this.handleExtrasGroup(event)}>
                <div className='row mt-2'>
                    <div className='col'>
                        <span className='peragraph'>Name</span>
                        <input type="text" className="form-control date-time" placeholder="Would you like to add an additional side?" name="name" id="name"/>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col'>
                        <input type="text" className="form-control date-time" placeholder="Unique searchable name, not visible to clients" name="unique_name" id="unique_name"/>
                    </div>
                </div>
                <button className='btn-radius right mt-2'data-bs-toggle="modal" href="#AddModifierpop">Add modifier <span className='btn-icon'>
                <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                </span>
                </button>
                <div className="form-check mt-3">
                    <input className="form-check-input" type="checkbox" id="is_require" name="is_require" value="1" ></input>
                    <label className='date-time p-0'>Require customers to select an item?</label>
                </div>
                <div className="form mt-1">
                    <label className='date-time select-line p-0'>What is the maximum amount of items customers can select?</label>
                    <div className="customselect">
                        <select name="max_item_select" id="max_item_select">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                
                <div className="modal-footer border border-0">
                <div className='d-flex justify-content-between'>
                    <div className='builder'>
                        <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={onClose}>Cancel</button>
                        <button className='menu-item right btn-radius green-btn' data-bs-toggle="modal" href="#CreateGrouppop" type="submit">Add</button>
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
