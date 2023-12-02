import React from 'react';

export default class Modal_item_varient extends React.Component {

    constructor(props){
        super(props);
    }

    handleCancel(e){
        e.preventDefault()
        var args_to_parent = {}
        args_to_parent['fd_data'] = 'close'
        this.props.onSubmit(args_to_parent)
    }

    async handleSubmitAddVarient(e){
        e.preventDefault()
        const { isOpen, onClose, args} = this.props
        var fd = new FormData(e.target)
        fd.append("selected_varients", JSON.stringify(args.varients))

        var res = await app.post('/admin/isvalid-item-varient',fd)

        if(!res.status)
        {
            app.toast(res.message, 'warning')
            return false
        }
        else
        {
            var args_to_parent = {}
            args_to_parent['fd_data'] = res.data
            this.props.onSubmit(args_to_parent)  
        }

            

    }

    render() {
        const { isOpen, onClose} = this.props

        if (!isOpen) return null

    return(
            <>
            <div className='modal-overlay'>
            <div className="modal-dialog topheightmodal w-50 mx-auto">
            <form method="post" onSubmit={(event)=>this.handleSubmitAddVarient(event)}>
            <div className="modal-content mx-auto">
            <div className="modal-header border border-0 pb-0">
            <h3 className='heading text-dark'>Add Variant</h3>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-hidden="true" onClick={(event)=>this.handleCancel(event)}></button>
            </div><div className="container"></div>
            <div className="modal-body">
            
            <div className='row'>
            <div className='col-sm-2'>
            <span className='peragraph'>Price</span>
            <input type="text" name="price" className="form-control date-time" placeholder="price" />
            </div>
            <div className='col-sm-2'>
            <span className='peragraph'>Size</span>
            <input type="text" name="size" className="form-control date-time" placeholder="size" />
            </div>
            <div className='col-sm-5'>
            <label className="form-check-label">
            <span className='peragraph'>Stockcode/Barcode</span>
            </label>
            <input type="text" name="barcode" className="form-control date-time" placeholder="Stockcode/Barcode" />
            </div>
            <div className='col-sm-2'>
            <label className="form-check-label">
            <span className='peragraph'>UID</span>
            </label>
            <input type="text" name="uid" className="form-control date-time" placeholder="uid" />
            </div>
            </div>
            <div className="form-check mt-2">
            <input type="checkbox" className="form-check-input" name="is_diable_varient" value="1"/>
            <label className="form-check-label" htmlFor="check1"><span className='peragraph'>Disable variant </span></label>
            </div>
            
            </div>
            <div className="modal-footer border border-0">
            <div className='d-flex justify-content-between w-100'>
            <div className='builder'>
            <button className='menu-item right btn-radius pink-btn'>Delete</button>

            </div>
            <div className='builder'>
            <button type="button" className='menu-item right btn-radius text-secondary border border-secondary' onClick={(event)=>this.handleCancel(event)}>Cancel</button>
            <button className='menu-item right btn-radius green-btn'>Apply</button>
            </div>
            </div>
            </div>
            </div>
            </form>
            </div>
            </div>
            </>
            )

    }

}
