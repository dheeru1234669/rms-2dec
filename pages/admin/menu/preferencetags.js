import React from 'react'

import { Header, Sidebar } from '../../../src';

export default class Preferencetags extends React.Component {
    constructor(props){
        super(props);
        this.state={Nutritional_preferences:[], Allergen_preferences: []}
    }

     componentDidMount(){
        this.get_preferencetag()            
    } 

    async get_preferencetag(){
        var res = await app.get('/admin/prefernce-tag');
        if(res.status){
            console.log("check",res.data)
        this.setState({Nutritional_preferences:res.data.nutritional_preferences, Allergen_preferences: res.data.allergen_preferences})
    }
}
render () {
    var Nutritional_preferences = this.state.Nutritional_preferences
    var Allergen_preferences = this.state.Allergen_preferences
    
    
  return (
    <>
        <div className="container-fluid">
            <div className='row'>
            <Header/>
            </div>
            <div className='row'>
                <div className='col-md-2'>
                    <Sidebar/>
                </div>
                <div className='col-lg-10 p-0'>
                    <div className='wraper pb-5'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='d-flex justify-content-between'>
                                <div className='tag'>
                                <h5 className='menu-item tag fw-bold mb-4 mt-4'><a href="./tags">Tags</a></h5>
                                </div>
                                <div className='tag'>
                                <h5 className='menu-item tags fw-bold mb-4 mt-4'>Preference Tags</h5>
                                </div>
                            </div>                
			            </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='Nutritional'>
                            <h3 className="heading">Nutritional preferences</h3>
                            </div>
                            <hr className="m-0"></hr>
                            <div>
                                { Nutritional_preferences.map ( nutritionaltag_data =>
                                <>
                            <div className='row mt-1'>
                                <ul className='preference-list'>
                                    <li className='preference-item'>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something"/>
                                        </div>
                                    </li>
                                    <li className='preference-item'>
                                        <div className='cricle-img'>
                                            <img src="../../../assets/images/leaf.png" className='prefrence-img'/>
                                        </div>
                                    </li>
                                    <li className='preference-item'>
                                        <div className='modal-title preference-title'>{nutritionaltag_data.name}
                                        </div>
                                    </li>
                                </ul>
                            </div> 
                            </> 
                                )} 
                            </div>            
                        <div className='preference-btn mt-4 pt-2'>
                            <div className='preference-btns mt-5 pt-5'>
                                <button className='menu-item right btn-radius text-secondary border border-secondary'>Cancel</button>
                                <button className='menu-item right btn-radius green-btn'>Apply</button>
                            </div>
                        </div>
                    </div>
                <div className='col-sm-6'>
                    <div className='Nutritional'>
                    <h3 className="heading">Allergen preferences</h3>
                    </div>
                    <hr className="m-0"></hr>
                    <div>
                        {Allergen_preferences.map ( allergentag_data =>
                                <>
				        <div className='row mt-1'>
                            <ul className='preference-list'>
                                <li className='preference-item'>
					                <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something"/>
                                    </div>
                                </li>
					            <li className='preference-item'>
					                <div className='cricle-img'>
                                        <img src="../../../assets/images/leaf.png" className='prefrence-img'/>
					                </div>
					            </li>
                                <li className='preference-item'>
					                <div className='modal-title preference-title'>{allergentag_data.name}</div>
					            </li>
                            </ul>
                        </div>
                        </>
                        )}
                    </div>
                </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
}
