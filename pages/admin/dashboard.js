import React from 'react';
import { Header, Sidebar } from '../../src';



export default class Home extends React.Component{

	constructor(props){
		super(props);
	}
	

	render(){

		return(
        <div className="container-fluid">
            <div className='row'>
				<Header/>
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
    <div className="card-body"><h4 className='menu-item fw-bold'>Current Menu Items</h4>
    <sapn className="total-item fw-bold">80</sapn>
    </div></div>
    <div className="card">
    <div className="card-body card-item"><h4 className='menu-item fw-bold'>Current Categories</h4>
    <sapn className="total-item fw-bold">10</sapn>
    </div>
    </div>
        </div>
        <div className="card sold-item">
    <div className="card-body card-item"><h4 className='menu-item fw-bold'>Most sold item</h4>
    <sapn className="total-item fw-bold">Cheeseburger</sapn>
    </div>
    </div>
    <div className="card sold-item">
    <div className="card-body card-item"><h4 className='menu-item fw-bold'>Least sold item</h4>
    <sapn className="total-item fw-bold">Quiche</sapn>
    </div>
    </div>
    </div>
                </div>
            </div>
   </div>
        	
		)
		
	}

}//
