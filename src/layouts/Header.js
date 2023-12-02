import React from 'react';
import Link from 'next/link';

export default class Header extends React.Component{

	constructor(props){
		super(props);
		this._token = '';
		this._user = 'Admin';
		if (typeof window !== 'undefined')
		{
			this._token =  sessionStorage.getItem('rms_token')
			this._token ? '' : location.href='/';
			this._user =  sessionStorage.getItem('rms_admin_info');
			if(this._user != "" || this._user != null)
			this._user = JSON.parse(this._user);	
		}
	}


	render(){
			
		return(
		<nav className="navbar navbar-expand-sm bg-white">
   <div className="container-fluid">
      <nav className="navbar navbar-expand-sm justify-content-end col-md-10 offset-md-2">
         <li className='header-li'>
            <Link href="/admin/dashboard" activeclassname="header-link active">Overview</Link>
         </li>
		<li className='header-li'>
            <Link href="/admin/menu/menubuilder" activeclassname="header-link active">Menu Builder</Link>
         </li>
		<li className='header-li'>
            <Link href="/admin/menu/modifiers" activeclassname="header-link active">Modifiers</Link>
         </li>
		<li className='header-li'>
            <Link href="/admin/menu/extras" activeclassname="header-link active">Extras</Link>
         </li>
		<li className='header-li'>
            <Link href="/admin/menu/tags" activeclassname="header-link active">Tags</Link>
         </li>
         
      </nav>
   </div>
</nav>					
        )		
		}	


}
