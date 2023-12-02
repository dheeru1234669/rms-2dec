import React from 'react';
import Link from 'next/link';

export default class Sidebar extends React.Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
        <div className='container-fuild'>
            <div className='row'>
                <div className='sidebar'>
        <ul className='navbar-nav sidebar-ul'>
            <li className='nav-item sidebar-li'><Link href="/"className='nav-link'>Home</Link></li>
            <li className='nav-item sidebar-li '><Link href="/admin/menu/menubuilder" className='nav-link'>Menu</Link></li>
            <li className='nav-item sidebar-li'><Link href="/admin/Profile/Overview" className='nav-link'>Profile</Link></li>
            <li className='nav-item sidebar-li'><Link href="/admin/table_management/overview" className='nav-link'>Table Management</Link></li>
            <li className='nav-item sidebar-li'><Link href="/admin/design/theme" className='nav-link'>Design</Link></li>
            <li className='nav-item sidebar-li'><Link href="/" className='nav-link'>Reports</Link></li>
            <li className='nav-item sidebar-li'><Link href="/" className='nav-link'>Analytics</Link></li>
            <li className='nav-item sidebar-li'><Link href="/admin/dashboard" className='nav-link'>Dashboard</Link></li>
            <li className='nav-item sidebar-li'><Link href="/"className='nav-link'>Settings</Link></li>
        </ul>
     </div>
            </div>
        </div>
     
    
        )
	}
		
}
