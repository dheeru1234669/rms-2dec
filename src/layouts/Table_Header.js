import React from 'react';
import Link from 'next/link';

export default class TableHeader extends React.Component{

	constructor(props){
		super(props);
		
	}


	render(){
			
		return(
			<nav className="navbar navbar-expand-sm bg-white">
				<div className="container-fluid">
					<nav className="navbar navbar-expand-sm justify-content-start col-md-10 offset-md-2">
					<li className='header-li'><Link href="/admin/table_management/overview" activeclassname="header-link active">Overview</Link></li>
					<li className='header-li'><Link href="/admin/table_management/zones" activeclassname="header-link active">Zones</Link></li>
					<li className='header-li'><Link href="/admin/table_management/table" activeclassname="header-link active">Tables</Link></li>
					</nav>  
				</div>
			</nav>		
        )		
		}	


}
