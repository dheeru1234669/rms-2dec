import React from 'react'

export default class Modal_item_price_variation extends React.Component {
    constructor(props){        
        super(props);
        this.state = {showException:!1, day_exception_arr:[{id:"", day:"", price:""}], day_exception_added_arr:[], time_exception_arr:[{id:"", day:"", price:"", start:"", end:""}], days_arr:[], from_arr:[], is_loading:!1}
        this.hasMounted = false;
    }

    componentDidMount(){
        if(!this.hasMounted){
            this.hasMounted = true;
            const {args} = this.props

            var {days_arr, from_arr, db_day_excpton, db_time_excpton} = args

            this.setState({days_arr, from_arr})
            var varient_dtl = args.varients[args.clicked_variation_index] ? args.varients[args.clicked_variation_index] : ''
            if(varient_dtl && varient_dtl.id)
            {
                
                this.setState({showException:1})
                if(db_day_excpton.price_day[varient_dtl.id])
                this.setState({day_exception_arr:db_day_excpton.price_day[varient_dtl.id]}) 

                if(db_time_excpton.price_time[varient_dtl.id])
                this.setState({time_exception_arr:db_time_excpton.price_time[varient_dtl.id]}) 
            }


        }
    }

    showHideVariation = (e) => {
        this.setState({showException:!this.state.showException})
    }

    handleChange = index => (event) => {
        const {name,value}= event.target;
        const { isOpen, onClose, args} = this.props
        var {days_arr, from_arr, db_day_excpton} = args

        const list = [...this.state.day_exception_arr]
        list[index][name] = value

        this.setState({day_exception_added_arr:list})
        
    }

    handleChangeForTime = index => (event) => {
        const {name,value}= event.target;
        const list = [...this.state.time_exception_arr]
        list[index][name] = value
        this.setState({time_exception_added_arr:list})
    }



    handleDayBaseAdd = (e) =>{
        const { isOpen, onClose, args} = this.props

        var {days_arr, from_arr, db_day_excpton} = args

        if(e.target.value == 'time_excp')
        this.setState({time_exception_arr: [...this.state.time_exception_arr, {id:"", day:"", price:"", start:"", end:""}]} )
        else
        this.setState({day_exception_arr: [...this.state.day_exception_arr, {id:"", day:"", price:""}]} )
    }

    handleDayBaseRemove = index => () => {
            const deleteval = [...this.state.day_exception_arr]
            deleteval.splice(index, 1)
            this.setState({day_exception_arr:deleteval})
    }

    handleTimeBaseRemove = index => () => {
            const deleteval = [...this.state.time_exception_arr]
            deleteval.splice(index, 1)
            this.setState({time_exception_arr:deleteval})
        
    }

    async handleSubmitPriceVariation(e){
        e.preventDefault()
        this.setState({is_loading:!this.state.is_loading })
        var fd = new FormData(e.target)
        fd.append("day_exception_added_arr", JSON.stringify(this.state.day_exception_added_arr))
        fd.append("time_exception_added_arr", JSON.stringify(this.state.time_exception_added_arr))

        var res = await app.post('/admin/isvalid-price-variation',fd)

        if(!res.status)
        {
            this.setState({is_loading:!this.state.is_loading })
            app.toast(res.message, 'warning')
            return false
        }
        else
        {
            this.setState({is_loading:!this.state.is_loading })
            var args = {}
            var forprice_size = res.data.for_price+'#|#'+res.data.for_size
            args['price_variations'] = {[forprice_size]:[{'day_wise':this.state.day_exception_added_arr}, {'time_wise':this.state.time_exception_added_arr}] }

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
        const { isOpen, onClose, args} = this.props
        if (!isOpen) return null

        var {showException, day_exception_arr, time_exception_arr, day_exception_added_arr, days_arr, from_arr} = this.state

        var selected_price = args.varients[args.clicked_variation_index] ? args.varients[args.clicked_variation_index] : {price:"0", size:""}
        
        return(
            <>
                <div className='modal-overlay'>
                    <div className="modal-dialog topheightmodal w-50 mx-auto">
                    <form method="post" onSubmit={(event)=>this.handleSubmitPriceVariation(event)}>
                        <div className="modal-content mx-auto">
                            <div className="modal-header border border-0 pb-0">
                                <h3 className='heading text-dark'>Create Price Variations</h3>
                                <button type="button" className="btn-close" onClick={(event)=>this.handleCancel(event)} data-bs-dismiss="modal" aria-hidden="true"></button>
                            </div>
                            <div className="container"></div>
                                <div className="modal-body mt-0 pt-0">
                                    <div className="row mt-2">
                                        <div className='col-sm-4'>
                                            <label className="form-check-label">
                                                <span className='peragraph'>Price</span>
                                            </label>
                                            <input type="text" className="form-control date-time" name="for_price" defaultValue={selected_price.price}/>
                                        </div>
                                        <div className='col-sm-4'>
                                            <label className="form-check-label">
                                                <span className='peragraph'>Size</span>
                                            </label>
                                            <input type="text" className="form-control date-time" name="for_size" defaultValue={selected_price.size} />
                                        </div>
                                    </div>
                    <div className='row mt-2'>
                        <div className='col'>
                            <div className="form-check mt-2">
                                <input type="checkbox" className="form-check-input" id="enbl_excptn" name="is_enabled_exception" value="1" checked={!!showException} onChange={this.showHideVariation}/>
                                <label className="form-check-label" htmlFor="enbl_excptn"><span className='peragraph'>Enable exceptions</span></label>
                            </div>
                        </div>
                    </div>

                    <div style={{display: this.state.showException?"block":"none"}}>
                        {day_exception_arr.map((row_wise_days, index) => (
                        <div key={index} className='row mt-2'>
                            <div className='col-md-6'>
                                <label className="form-check-label"><span className='peragraph'>Day exceptions (Day specials)</span></label>
                                <select className="form-select date-time" value={row_wise_days.day} name="day" onChange={this.handleChange(index)}>
                                <option value="">-select-</option>
                                {days_arr.map((row_wise) => {
                                return (<option key={row_wise.id} value={row_wise.id}>{row_wise.name}</option>
                                )})}
                                                                                                                                    </select>
                            </div>
                            <div className='col-md-4'>
                                <label className="form-check-label">
                                    <span className='peragraph'>Price</span>
                                </label>
                                <input type="text" className="form-control date-time" placeholder="price" name="price" value={row_wise_days.price} onChange={this.handleChange(index)} />
                            </div>
                            {
                                day_exception_arr.length !== 1  &&
                                <div className="col-md-2">
                                <label className="form-check-label"><span className='peragraph'></span>
                                </label>
                                <div className="popup-icon-delete"><img src="../../../assets/images/icon-delete.png" className="delete-popnopostion" onClick={this.handleDayBaseRemove(index)} /></div></div>
                            }

                        </div>                      
                        ))}

                        {
                        (day_exception_arr.length < 8) &&
                        <button type="button" className='btn-radius mt-2' onClick={this.handleDayBaseAdd}>Add<span className='btn-icon'>
                        <i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                        }

                       { time_exception_arr.map((row_wise_time, index) => (
                        <div key={index} className='row mt-2'>
                            <div className='row'>
                                <div className='col-sm-8'>
                                    <div className='create-price'>
                                        <div className='variations w-75'>
                                            <label className="form-check-label"><span className='peragraph'>Time exceptions (Happy Hour)</span></label>
                                            <select className="form-select date-time" value={row_wise_time.day} name="day" onChange={this.handleChangeForTime(index)}>
                                            <option value="">-select-</option>
                                            {days_arr.map((row_wise) => {
                                            return (<option key={row_wise.id} value={row_wise.id}>{row_wise.name}</option>
                                            )})}
                                                                                                                                                    </select>

                                        </div>
                                        <div className='variation w-25'>
                                            <input type="text" className="form-control date-time" placeholder="price" name="price" value={row_wise_time.price} onChange={this.handleChangeForTime(index)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-2'>
                                    <label className="form-check-label"><span className='peragraph'>Start</span></label>
                                    <select className="form-select date-time" value={row_wise_time.start} name="start" onChange={this.handleChangeForTime(index)}>
                                            <option value="">-select-</option>
                                            {from_arr.map((row_wise) => {
                                            return (<option key={row_wise.id} value={row_wise.id}>{row_wise.name}</option>
                                            )})}
                                                                                                                                                    </select>
                                </div>
                                <div className='col-md-2'>
                                    <label className="form-check-label"><span className='peragraph'>End</span></label>
                                    <select className="form-select date-time" value={row_wise_time.end} name="end" onChange={this.handleChangeForTime(index)}>
                                            <option value="">-select-</option>
                                            {from_arr.map((row_wise) => {
                                            return (<option key={row_wise.id} value={row_wise.id}>{row_wise.name}</option>
                                            )})}
                                                                                                                                                    </select>
                                </div>
    
                                {
                                time_exception_arr.length !== 1  &&
                                <div className="col-md-2">
                                <label className="form-check-label"><span className='peragraph'></span>
                                </label>
                                <div className="popup-icon-delete"><img src="../../../assets/images/icon-delete.png" className="delete-popnopostion" value="time_excp" onClick={this.handleTimeBaseRemove(index)} /></div></div>
                            } 

                            </div>
                        </div>
                        ))}

                        {
                        (time_exception_arr.length < 8) &&
                        <button type="button" className='btn-radius mt-2' value="time_excp" onClick={this.handleDayBaseAdd}>Add<span className='btn-icon'>
                        <i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                        }
                

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
                        <button type="submit" className='menu-item right btn-radius green-btn'>Add</button>
                    )
                    }
                    </div>
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
