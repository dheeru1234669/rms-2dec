import React from 'react';
import Link from 'next/link';

export default class DesignHeader extends React.Component{

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

	render() {
			
		return(
            <>
            <nav className="navbar navbar-expand-sm bg-white">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-sm justify-content-start col-md-10 offset-md-2">
                    <li className='header-li'>
                        <Link href="/admin/design/theme" activeclassname="header-link active">Theme</Link>
                    </li>
                    <li className='header-li'>
                        <Link href="/admin/design/textbox" activeclassname="header-link active">Text Boxes</Link>
                    </li>
                </nav>
            </div>
            </nav>
            </>
            )		
		}	
}
