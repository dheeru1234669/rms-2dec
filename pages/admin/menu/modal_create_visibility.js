import React from 'react';

export default class Modal_create_visibility extends React.Component {

    constructor(props){
        super(props);
        this.state = {showMe:false, show_hide_item:0, timeBasedArr:[{id:"", day_id:"", from:"", end:""}], time_base_visibility_arr:[], is_hidden:!1, days_arr:[], from_arr:[], is_loading:!1}
        this.hasMounted = false;
    }

    componentDidMount(){
        if(!this.hasMounted){
            this.hasMounted = true
            const {args} = this.props
            var {days_arr, from_arr, db_visibility} = args
            console.log("db_visibility: ", db_visibility)
            this.setState({days_arr, from_arr})
            if(db_visibility != undefined)
            {
                if(db_visibility.visibility_arr && db_visibility.visibility_arr.length > 0)
                {
                    this.setState({timeBasedArr:db_visibility.visibility_arr})
                    if(db_visibility.item_data && db_visibility.item_data[0])
                    {
                        var show_hide_item = db_visibility.item_data[0].show_hide_item
                        var showMe = (show_hide_item === '1' || show_hide_item === '2');
                        this.setState({show_hide_item:show_hide_item})
                        this.setState({ showMe })
                    }

                }
            }


        }
    }

    showHide = (event) => {
        const {name, value} = event.target
        const showMe = (value === '1' || value === '2'); 
        this.setState({ showMe })
        this.setState({show_hide_item:event.target.value})
    }

    getIsHidden = (event) => {
        this.setState({is_hidden: !this.state.is_hidden})
    }

    handleTimeBaseAdd = () =>{
    this.setState({timeBasedArr: [...this.state.timeBasedArr, {id:"", day_id:"", from:"", end:""}]} )
    }

    handleTimeBaseRemove = index => (event) => {
            const deleteval = [...this.state.timeBasedArr]
            deleteval.splice(index, 1)
            //let rows = [...this.state.timeBasedArr.filter(x, i => console.log("xxxx===", x, i))];
            this.setState({timeBasedArr:deleteval})

    }

    handleChange = index => (event) => {
        const {name,value}= event.target;
        const list = [...this.state.timeBasedArr]
        list[index][name] = value
        this.setState({time_base_visibility_arr:list})
    }

    async handleSubmitvarients(e){
        e.preventDefault()
        this.setState({is_loading:!this.state.is_loading })
        var fd = new FormData(e.target)
        fd.append("time_base_visibility", JSON.stringify(this.state.time_base_visibility_arr));

        var res = await app.post('/admin/isvalid-create-visibility',fd);

        if(!res.status)
        {
            this.setState({is_loading:!this.state.is_loading })
            app.toast(res.message, 'warning');
            return false;
        }

        if(res.status)
        {
            this.setState({is_loading:!this.state.is_loading })
            var args = {}
            args['time_base_visibility_arr'] = this.state.time_base_visibility_arr
            args['show_hide_item'] = this.state.show_hide_item
           
            this.props.onSubmit(args) 
        }
    }

    handleCancel(e){
        e.preventDefault()
        var args_to_parent = {}
        args_to_parent['is_close'] = 'close'
        this.props.onSubmit(args_to_parent)
    }

    render() {
        const { isOpen, onClose, args} = this.props;
        var {timeBasedArr, days_arr, from_arr, show_hide_item} = this.state;
        console.log("visibilityArr", timeBasedArr)

        if (!isOpen) return null;

        return( 
                <>
                <div className='modal-overlay'>
                <div className="modal-dialog topheightmodal w-50 mx-auto">
                <form method="post" onSubmit={(event)=>this.handleSubmitvarients(event)}>
                <div className="modal-content w-75 mx-auto">
                <div className="modal-header border border-0 pb-0">
                <h3 className='heading text-dark'>Visibility</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-hidden="true" onClick={(event)=>this.handleCancel(event)}></button>
                </div>
                <div className="container"></div>
                <div className="modal-body mt-0 pt-0">
                <div className='row mt-2'>
                <div className='col'>
                <div className="form-check mt-2">
                <input type="radio" className="form-check-input" name="show_hide_item" id="hiddn_based" value="1" checked ={show_hide_item == 1 ? true : false}  onChange={this.showHide}/>
                <label className="form-check-label" htmlFor="hiddn_based"><span className='peragraph'>Hidden item</span></label>
                </div>
                <div className="form-check">
                <input type="radio" className="form-check-input" id="time_based" name="show_hide_item" value="2" checked ={show_hide_item == 2 ? true : false} onChange={this.showHide} />
                <label className="form-check-label" htmlFor="time_based"><span className='peragraph'>Enable time based visibility</span></label>
                </div>
                <div style={{display: this.state.showMe?"block":"none"}} className='add-tags'>
                {timeBasedArr.map((visiblty_row, index) => (
                <div className='row' key={index}>
                    <div className='col-md-4'>
                        <label className="form-check-label"><span className='peragraph'>Day</span></label>
                        <select className="form-select date-time" name="day_id" value={visiblty_row.day_id} onChange={this.handleChange(index)}>
                        <option value="">-Select-</option>
                        {days_arr.map((row_wise) => {
                                return (<option key={row_wise.id} value={row_wise.id}>{row_wise.name}</option>
                                       )})}
                        </select>
                    </div>
                
                    <div className='col-md-3'>
                        <label className="form-check-label">
                        <span className='peragraph'>From</span>
                        </label>
                        <select className="form-select date-time" name="from" value={visiblty_row.from} onChange={this.handleChange(index)} >
                        <option value="">-Select-</option>
                        {from_arr.map((row_wise) => {
                        return (<option key={row_wise.id} value={row_wise.id}>{row_wise.name}</option>
                        )})}
                        </select>
                    </div>
                
                    <div className='col-md-3'>
                    <label className="form-check-label">
                    <span className='peragraph'>End</span>
                    </label>
                
                    <select className="form-select date-time" name="end" value={visiblty_row.end} onChange={this.handleChange(index)}>
                    <option value="">-Select-</option>
                    {from_arr.map((row_wise) => {
                    return (<option key={row_wise.id} value={row_wise.id}>{row_wise.name}</option>
                    )})}
                                                                                                                                                                                                                                 </select>

                    </div>
                    {
                        timeBasedArr.length !== 1  &&
                            <div className="col-md-2">
                            <label className="form-check-label"><span className='peragraph'></span>
                            </label>
                            <div className="popup-icon-delete"><img src="../../../assets/images/icon-delete.png" className="delete-popnopostion" onClick={this.handleTimeBaseRemove(index)} /></div></div>
                    }
                    </div> 
                    ))
                    }
                    </div>
                    {
                    (timeBasedArr.length < 8 && this.state.showMe) &&
                    <button className='btn-radius mt-2' onClick={this.handleTimeBaseAdd}>Add<span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>                     
                    }
                </div>
                </div>
                </div>
                <div className="modal-footer border border-0">
                <div className='d-flex justify-content-between'>
                <div className='builder'>
                <button type="button" className='menu-item right btn-radius text-secondary border border-secondary' onClick={(event)=>this.handleCancel(event)}>Cancel</button>
                {
                this.state.is_loading ?
                (
                    <button type="button" className='menu-item right btn-radius pink-btn'>Wait...</button>
                ):
                (
                    <button type="submit" className='menu-item right btn-radius green-btn'>Apply</button>
                )
                }

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
