import React from 'react'
import { TableHeader, Sidebar } from '../../../src';

export default class Overview extends React.Component {
    constructor(props){
        super(props);  
        this.state = {record:[]}     
    }

    async componentDidMount(){
        this.get_table_overview()            
    }   

    async get_table_overview(){
        var res = await app.get('/admin/table-overview');
        if(res.status)
        this.setState({record:res.data})

        console.log("Overview_Data: ",this.state.record)
    }

    
render () { 
    var {record} = this.state 
    console.log("data: ", record) 
  return (
    
        <div className="container-fluid">
            <div className='row'>
            <TableHeader/>
            </div>
            <div className='row'>
                <div className='col-md-2'>
                    <Sidebar/>
                </div>
                <div className='col-lg-10 p-0'>
                    <div className='wraper'>
                        <h5 className='menu-item fw-bold mb-4 mt-4'>Overview</h5>
                            <div className="d-flex justify-content-start">
                                
                                <div className="card card-item">
                                    <div className="card-body"><h4 className='menu-item fw-bold'>Amount of zones</h4>
                                    <sapn className="total-item fw-bold">{record.total_zone}</sapn>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body card-item">
                                        <h4 className='menu-item fw-bold'>Amount of tables</h4>
                                        <sapn className="total-item fw-bold">{record.total_table}</sapn>
                                    </div>
                                </div>

                            </div>
                    </div>
                </div>
            </div>
        </div>
    
  )
}
}
