import React from 'react';
import { Modal, ModalFooter, ModalHeader, ModalBody, Button } from 'reactstrap'

import { Header, Sidebar } from '../../../src';
import Modal_create_visibility from './modal_create_visibility';
import Modal_item_varient from './modal_item_varient';
import Modal_item_price_variation from './modal_item_price_variation';
import TagModal from '../component/modal_Tag';
import PreferenceTagModal from '../component/modal_PreferenceTag';
import CreateExtraGroupModal from '../component_ExtraGroup/modal_Create_Extra_Group';
import ExtraGroupAddModal from '../component_ExtraGroup/modal_Add_Extra_group';
import CreateModifierGroupModal from '../component_ModifierGroup/modal_Create_Modifier_Group';
import AddModifierGroupModal from '../component_ModifierGroup/modal_Add_Modifier_Group';
import RemoveModal from '../component_ExtraGroup/modal_remove';

export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                        data        :[], 
                        prnt_data   :[], 
                        modal       :!1, 
                        img         :'', 
                        showMe      :!1, 
                        timeBasedArr:[{id:"", day_name:"", start_time:"", end_time:""}], 
                        fulfillment_station_list:[], 
                        prepared_time_combo:[], 
                        time_based_arr_send:[], 
                        days_arr:[], 
                        from_arr:[], 
                        current_from:[{from:""}], 
                        all_selected_froms:[], 
                        all_selected_days:[], 
                        preview_img:'', 
                        is_delete:!1, 
                        current_click_cat_id:'', 
                        create_item_modal:!1, 
                        item_img:[], 
                        preview_item_img:'',
                        uploaded_item_images:[],
                        uploaded_item_images_chk:[],
                        fileInputKey: 0,
                        upload_imgs:[],
                        varients:[{price:"", size:"", barcode:"", uid:"", is_disable_varient:""}], 
                        is_loading:!1, 
                        create_visibility_modal:!1, 
                        visibility_data:[], 
                        addVarientModalOpen:false, 
                        child_varient_data:{}, 
                        priceVariationModalOpen:false, 
                        clicked_variation_index:0, 
                        price_variations:[], 
                        tagModalOpen:false,
                        preferenceTagModalOpen: false,
                        db_item_info:{info:{id:"",item_uid:"", code:"", name:"", cat_name:"", fulfillment_by:"", prepared_time:"", short_desc:"", long_desc:"", out_of_stock:0, enabled:1}},
                        db_day_excpton:{},
                        AddExtraData:[],
                        db_cat_info:{info:{id:"", name:""}}, 
                        db_cat_timings:{},
                        AddModifierData:[],
                        extras_group_data1:[]
        
                    }
    }
    state={
        isModalOpen:true, tagname:[], preferencename:[], which_group:'',option_id:'',option_index:'',isRemoveModalopen: false,isModifierGroupCreateModalOpen: false, modifier_data:[], isExtraGroupCreateModalOpen:false, isExtraGroupAddModalOpen:false, isModifierGroupCreateModalOpen: false, isModifierGroupAddModalOpen: false
    }

    //openModal = (e) => {
    openModal = index => (e) =>{
        if(e.target.name == 'add_varient'){
        this.setState({addVarientModalOpen: true });
        }
        else if(e.target.name == 'price_variation'){
        this.setState({clicked_variation_index:index})
        this.setState({priceVariationModalOpen: true });
        }
        else if(e.target.name == 'tags'){
        this.setState({tagModalOpen: true });
        }
        else if(e.target.name == 'pTags'){
          this.setState({preferenceTagModalOpen: true });
          }
        else{
        this.setState({ isModalOpen: true });
        }
    };

    closeModal = (param=null) => {
        if(param == 'add_varient')
        this.setState({addVarientModalOpen: false })
        else if(param == 'price_variation')
        this.setState({priceVariationModalOpen: false })
        else if(param == 'tags')
        this.setState({tagModalOpen: false })
        else if(param == 'pTags')
        this.setState({preferenceTagModalOpen: false })
        else
        this.setState({ isModalOpen: false });
    };

    openExtraGroupAddModal=()=>{
      this.setState({isExtraGroupAddModalOpen: true})
    } 
    
    closeExtraGroupAddModal=()=>{
      this.setState({isExtraGroupAddModalOpen: false})
    } 

    openExtraGroupCreateModal=(e,extras_group_data)=>{
      this.setState({isExtraGroupCreateModalOpen: true})
      this.setState({extras_group_data1:[]})
      //if(extras_group_data)
      //this.setState({extras_group_data1:Object.keys(extras_group_data).map(key => extras_group_data[key]});

    } 
    
    closeExtraGroupCreateModal=()=>{
      this.setState({isExtraGroupCreateModalOpen: false})
    } 

    openModifierGroupCreateModal=(e,modifier_group_data)=>{
      this.setState({isModifierGroupCreateModalOpen: true})
      this.setState({modifier_data: modifier_group_data})
      this.setState({ isdropdownModifier: false });
    } 
    
    closeModifierGroupCreateModal=()=>{
      this.setState({isModifierGroupCreateModalOpen: false})
    }

    openModifierGroupAddModal=()=>{
      this.setState({isModifierGroupAddModalOpen: true})
    } 
    
    closeModifierGroupAddModal=()=>{
      this.setState({isModifierGroupAddModalOpen: false})
    }

    openRemoveModal=(e,index,option_id)=>{
        // console.log("Group name: ", e.target.name)
        this.setState({which_group:e.target.name})
        this.setState({isRemoveModalopen: true}) 
        this.setState({option_index:index})
        this.setState({option_id:option_id})
        this.setState({isdropdownModifier:false})
        this.setState({current_index:-1})
    }

    closeRemoveModal=()=>{
        this.setState({isRemoveModalopen: false})
    }


    componentDidMount(){
        this._apiCall();
        this.daysArr()
    }

    handleTimeBaseAdd = () =>{
        this.setState({timeBasedArr: [...this.state.timeBasedArr, {id:"", day_name:"", start_time:"", end_time:""}]})
    }

    handleVarientsAddMore = () =>{
        this.setState({varients: [...this.state.varients, {price:"", size:""}]})
    }

    handleTimeBaseRemove = index => (event) => {
        const deleteval = [...this.state.timeBasedArr]
        deleteval.splice(index, 1)
        this.setState({timeBasedArr:deleteval})

    }

    daysArr(){
    this.setState({days_arr: [{'name':'Monday', 'id':1},{'name':'Tuesday','id':2},{'name':'Wednesday','id':3},{'name':'Thrusday','id':4},{'name':'Friday','id':5},{'name':'Saturday','id':6},{'name':'Sunday','id':7},{'name':'All Day',id:8}], from_arr:[{name:1, id:1}, {name:2, id:2}, {name:3, id:3}, {name:4, id:4}, {name:5, id:5}, {name:6, id:6}, {name:7, id:7}, {name:8, id:8}, {name:9, id:9}, {name:10, id:10}, {name:11, id:11}, {name:12, id:12}, {name:13, id:13}, {name:14, id:14}, {name:15, id:15}, {name:16, id:16}, {name:17, id:17}, {name:18, id:18}, {name:19, id:19}, {name:20, id:20}, {name:21, id:21}, {name:22, id:22}, {name:23, id:23}, {name:24, id:24}]})
    }

    handleChange = index => (event) => {
        const {name,value}= event.target;

        const list = [...this.state.timeBasedArr]
        list[index][name] = value
    
        this.setState({time_based_arr_send:list}) 

    }

    handleChange_old = index => (event) => {
            const {name,value}= event.target;
            //const list = [...this.state.timeBasedArr]
            //list[index][name] = value
            this.setState({data_change:{[name]: value}});

            let all_froms = this.state.all_selected_froms
            var nameArray = this.state.current_from.map(function (el) {
                if(all_froms.includes(Object.keys(el)[0]))
                {
                }
                else
                {
                    all_froms.push(Object.keys(el)[0])
                }
            });

            this.setState({all_selected_froms:all_froms})
            
            if(this.state.all_selected_froms.includes(event.target.name))
            {
                
            }
            else
            {
                this.setState({current_from: [...this.state.current_from, {[event.target.name]:event.target.value}]})
            }


        var daysarr = this.state.days_arr
        let all_sel_dys = this.state.all_selected_days 
        if(all_sel_dys.includes(event.target.value))
        {
        }
        else
        {
            all_sel_dys.push({[event.target.name]:event.target.value})
        }
        
        this.setState({all_selected_days:all_sel_dys})

        
    }

    handleChangeVarients = index =>(event) => {
        const {name,value}= event.target
        const list = [...this.state.varients]
        list[index][name] = value
        this.setState({item_varient_list:list})
    }

    async _apiCall(){
        var url = '/admin/cat-and-item' 
        var res = await app.get(url)

        if(res.status){
            this.setState({data:res.data})
        }
    }

    async list_fulfillment_station(){
        var url = '/admin/fulfillment-station' 
        var res = await app.get(url)

        if(res.status){
            this.setState({fulfillment_station_list:res.data.list_fulfillment})
            this.setState({prepared_time_combo:res.data.prepared_time})
        }
    }

    async get_cat_info(e){
        const{name, value} = e.target
        var res = await app.post('/admin/cate-info', {cat_uid:value})
        if(!res.status){
            app.toast(res.message, 'warning')
        }else{
            var {db_cat_info, db_cat_timings} = res.data 
            if(db_cat_info.id)
            {
                this.setState({db_cat_info:{info: db_cat_info}})
                if(db_cat_info.image)
                this.setState({preview_img:db_cat_info.image_mdfy})

                if(db_cat_timings.visibility_arr)
                this.setState({timeBasedArr:db_cat_timings.visibility_arr})

                if(db_cat_info.is_enabled_time == '1')
                this.setState({showMe:1})
            }
        }
    }

    async get_item_info(e){
        const{name, value} = e.target
        const value_parse = JSON.parse(value)
        var url = '/admin/item' 
        var res = await app.post('/admin/item', {item_uid:value_parse.item_uid})

        if(!res.status){
            app.toast(res.message, 'warning') 
        }
        else{

            var {db_data_info, db_item_images, db_varients, db_day_excpton, db_time_excpton, db_visibility,db_extras_group, db_modifier_group, db_tag, db_preference_tag} = res.data

            if(db_data_info.id)
            {
                db_data_info.cat_name = value_parse.cat_name
                this.setState({db_item_info:{info: db_data_info}})
                this.setState({varients:db_varients.item_data, db_day_excpton, db_time_excpton, db_visibility})
                //if(db_item_images && db_item_images[0])
                //this.setState({preview_item_img:db_item_images[0].img_url})

                if(db_item_images.only_images)
                {
                    var db_img = db_item_images.img_info
                    this.setState({uploaded_item_images:db_item_images.only_images});
                    /*this.setState((prevState) => ({
                         uploaded_item_images_chk: [db_img, ...prevState.uploaded_item_images_chk],
                    }));*/

                    this.setState((prevState) => ({
                          uploaded_item_images_chk: prevState.uploaded_item_images_chk.concat(db_img),
                              }));
                }

                this.setState({AddExtraData: db_extras_group.extras_group_dtl})
                this.setState({AddModifierData: db_modifier_group.modifier_group_dtl})
                this.setState({tagname: db_tag.tag})
                this.setState({preferencename: db_preference_tag.pref_tag})
            }
        }
    }

  
    modelOpen(e){
        this.setState({preview_img:''})
        this.setState({preview_item_img:''})
       
        if(e.target.name == 'create_cat')
        this.setState({db_cat_info: {info: {id: "",name: ""}}});

        if(e.target.name == 'create_item')
        {
            this.setState({uploaded_item_images:[], uploaded_item_images_chk:[], db_item_info: {info: {id: "",name: ""}}, AddModifierData:[], tagname:[], preferencename:[], AddExtraData:[] });
            this.setState({varients:[{price:"", size:"", barcode:"", uid:"", is_disable_varient:""}]})
        }

        if(e.target.name == 'create_item' || e.target.name == 'edit_item'){
            this.toggleCreateItemModal(e)
            this.list_fulfillment_station()
        }
        else if(e.target.name == 'create_visibility'){
            this.toggleCreateVisibilityModal()
        }
        else{
            this.toggleModal(e)
        }

        this.setState({current_click_cat_id: e.target.value})
    }

                        
    toggleModal = (e) => { 
        this.setState({modal:!this.state.modal});
        if(e.target.name == 'edit_cat')
        this.get_cat_info(e)

    };
    toggleCreateItemModal = (e) => {
        this.setState({create_item_modal:!this.state.create_item_modal});
        if(e.target.name == 'edit_item' && e.target.value)
        {
            this.get_item_info(e)
            //this.setState({db_item_info:[...this.state.db_item_info, {id:"", item_uid:"", code:""}]})
        }
    };

    toggleCreateVisibilityModal = () => { this.setState({create_visibility_modal:!this.state.create_visibility_modal}); };


   toggleModalDel = (e) => {
    this.setState({is_delete:!this.state.is_delete})
   }

    uploadToClient = (event) => {
        if (event.target.files && event.target.files[0])
        {
            const i = event.target.files[0]
            this.setState({img:i})
            this.setState({preview_img:URL.createObjectURL(i)})
        }
   }

    uploadItemImage = (event) => {
        if (event.target.files && event.target.files[0])
        {
            this.setState(prevState => ({fileInputKey: prevState.fileInputKey + 1}));
            const i = event.target.files[0]
            this.setState({uploaded_item_images: [URL.createObjectURL(i), ...this.state.uploaded_item_images]});

        }
        if(event.target.files)
        {
            const files = event.target.files;
            //this.setState({upload_imgs:files})
            this.setState({upload_imgs:[files, ...this.state.upload_imgs]});
            var uploaded_img = {id:'', name:files}
            /*this.setState((prevState) => ({
            uploaded_item_images_chk: [uploaded_img, ...prevState.uploaded_item_images_chk],
            }));*/

            this.setState((prevState) => ({
            uploaded_item_images_chk: prevState.uploaded_item_images_chk.concat(uploaded_img),
            }));

            
        }
   }

   handlePreviewDelete = (event) => {
    this.setState({preview_img:''})
   }

   handleDeleteImage = (event) => {
    this.setState(prevState => ({fileInputKey: prevState.fileInputKey + 1}));
    this.state.uploaded_item_images.splice(0, 1);
    this.setState({uploaded_item_images:[...this.state.uploaded_item_images]});
    this.state.uploaded_item_images_chk.splice(0, 1);
    this.setState({uploaded_item_images_chk:[...this.state.uploaded_item_images_chk]});
   }

   handleFileUpload = (e) => {
    document.getElementById('file_input').click();
   }

    async handleSubmit(e){
        e.preventDefault()
        this.setState({is_loading:!this.state.is_loading })
        var fd = new FormData(e.target)
        //fd.append("day_wise", this.state.data_change);
        fd.append("day_wise", JSON.stringify(this.state.time_based_arr_send));
        fd.append("parent", this.state.current_click_cat_id);
        fd.append("preview_img", this.state.preview_img)

        if(this.state.db_cat_info && this.state.db_cat_info.info && this.state.db_cat_info.info.cat_uid)
        fd.append("cat_uid",this.state.db_cat_info.info.cat_uid);
        
        var res = await app.post('/admin/category',fd);

        if(!res.status)
        {
            this.setState({is_loading:!this.state.is_loading })
            app.toast(res.message, 'warning');
            return false;
        }

        if(res.status)
        {
            this.setState({is_loading:!this.state.is_loading })
            app.toast(res.message, 'success')
            this._apiCall()
            this.toggleModal(e)
            e.target.reset();
        }

    }

    async handleCreateItem(e){
        e.preventDefault()
        this.setState({is_loading:!this.state.is_loading })
        var fd = new FormData(e.target)
        
        if(this.state.upload_imgs.length){
        for (let i = 0; i < this.state.upload_imgs.length; i++) {
            fd.append('upload_imgs', this.state.upload_imgs[i][0]);
        }}

        var image_db_ids = []
        if(this.state.uploaded_item_images_chk){
            for (let i = 0; i < this.state.uploaded_item_images_chk.length; i++) {
                if(this.state.uploaded_item_images_chk[i].id)
                image_db_ids.push(this.state.uploaded_item_images_chk[i].id);
        }}

        fd.append('image_db_ids', image_db_ids);
        fd.append("parent", this.state.current_click_cat_id);
        fd.append("visibility", JSON.stringify(this.state.visibility_data));
        fd.append("varients", JSON.stringify(this.state.varients));
        fd.append("price_variations", JSON.stringify(this.state.price_variations));
        fd.append("tags", JSON.stringify(this.state.tagname));
        fd.append("preference_tags", JSON.stringify(this.state.preferencename));
        fd.append("extras_group", JSON.stringify(this.state.AddExtraData));
        fd.append("modifier_group", JSON.stringify(this.state.AddModifierData));

        if(this.state.db_item_info && this.state.db_item_info.info && this.state.db_item_info.info.id)
        fd.append("id",this.state.db_item_info.info.id);

        var res = await app.post('/admin/create-item',fd);

        if(!res.status)
        {
            this.setState({is_loading:!this.state.is_loading })
            app.toast(res.message, 'warning');
            return false;
        }
       
        if(res.status)
        {
            this.setState({is_loading:!this.state.is_loading })
            app.toast(res.message, 'success')
            this._apiCall()
            this.toggleCreateItemModal(e)
            e.target.reset();
        }

    }

    showHide = (event) => {
        //if(event.target.checked)
        this.setState({showMe: !this.state.showMe}) 
    }

    getData = (from_child) => {
        if(from_child.is_close == 'close'){
            this.closeModal()
        }
        else{
            this.setState({visibility_data:from_child})
            this.closeModal()
        }
    }

    childVarientData = (from_child) => {
        if(from_child.fd_data == 'close')
        {
            this.closeModal('add_varient')
        }
        else
        {
            var {price, size, barcode, uid, is_disable_varient} = from_child.fd_data
            this.setState({child_varient_data: from_child})
            this.setState({varients: [...this.state.varients, {price, size, barcode, uid, is_disable_varient}]})
            this.closeModal('add_varient')
        }
    }

    childPriceVariationData = (from_child) => {
        if(from_child.is_close == 'close'){
            this.closeModal('price_variation')
        }
        else{
            var {price_variations} = from_child
            this.setState({price_variations})
            this.closeModal('price_variation')
        }
    }

    childTagData = (from_child) => {
      this.setState({tagname: from_child})
      this.setState({ tagModalOpen: false }); 
    }
        
    childPreferenceTagData=(from_child)=>{
        if(from_child.is_close == 'close'){
            this.closeModal('pTags')
        }
        else{
        this.setState({preferencename: from_child})
        this.setState({ preferenceTagModalOpen: false });
        }
    }

    handlePreferenceTagRemove = (event,key)=> {
      var deletePreferenceTagval = this.state.preferencename
      delete deletePreferenceTagval[key];
      this.setState({preferencename:deletePreferenceTagval})        
    }

    handleTagRemove = (event,key)=> {
        var deleteTagval = this.state.tagname
        delete deleteTagval[key];
        this.setState({tagname:deleteTagval})        
    }

    handleEditChange = (e) => {
        var { name, value } = e.target;
        name = name.replace('product_name', 'name')
        if(name == 'out_of_stock')
        value = !this.state.db_item_info.info.out_of_stock

        if(name == 'enabled')
        value = !this.state.db_item_info.info.enabled

        this.setState((prevState) => ({db_item_info: {...prevState.db_item_info,info: {
                ...prevState.db_item_info.info,
                [name]: value
                }
            }
        }));
    };

    handleEditCatChange = (e) =>{
        var { name, value } = e.target;
        
        this.setState((prevState) => ({db_cat_info: {...prevState.db_cat_info,info: {
                ...prevState.db_cat_info.info,
                [name]: value
                }
            }
        }));
    }

    getCreateExtraGroupdata = (value)=>{
      this.setState({ isExtraGroupCreateModalOpen: false })
      // this.get_extras_group()
    }

    getExtraGroupAddModal=(valuefromAddExtrasmodal)=>{
      this.setState({ isExtraGroupAddModalOpen: false })
      this.setState({AddExtraData: valuefromAddExtrasmodal.concat(this.state.AddExtraData)})
    }

    getCreateModifierGroupdata = (valuefromCreateModifiermodal)=>{
      this.setState({ isModifierGroupCreateModalOpen: false })
    }

    getModifierGroupAddModal=(valuefromAddModifiermodal)=>{
      this.setState({AddModifierData: valuefromAddModifiermodal.concat(this.state.AddModifierData)})
      this.setState({ isModifierGroupAddModalOpen: false })
    }

    togglegroupDropdown= index => (event) => {
      this.setState((prevState) => ({ isdropdownOpen: !prevState.isdropdownOpen }));
      this.setState((prevState) => ({current_index: prevState.current_index === index ? null : index}));
    };

    toggleModifierDropdown=index=>(event)=>{
        this.setState({ isdropdownModifier: true });
      this.setState((prevState) => ({modifier_index: prevState.modifier_index === index ? null : index}));
    }

    handleDelete = async (value) => {
        if(value==='Remove' && this.state.which_group === 'Modifier_Group'){        
            this.setState({isRemoveModalopen: false})
            const deleteval = [...this.state.AddModifierData]
            deleteval.splice(this.state.option_index, 1)
            this.setState({AddModifierData:deleteval})
        }
        if(value==='Remove' && this.state.which_group === 'Extra_Group'){        
            this.setState({isRemoveModalopen: false})
            const deleteval = [...this.state.AddExtraData]
            deleteval.splice(this.state.option_index, 1)
            this.setState({AddExtraData:deleteval})
        }
    }

    render(){
        var {data, fulfillment_station_list, prepared_time_combo, which_group,isRemoveModalopen,prnt_data, modifier_data, timeBasedArr, varients, days_arr, from_arr, isModalOpen, addVarientModalOpen, priceVariationModalOpen, tagModalOpen, preferenceTagModalOpen, tagname, preferencename, db_item_info, isExtraGroupCreateModalOpen, isExtraGroupAddModalOpen, AddExtraData, AddModifierData, preview_item_img, db_cat_info, isModifierGroupCreateModalOpen, isModifierGroupAddModalOpen, isdropdownOpen, current_index, isdropdownModifier,modifier_index,extras_group_data1, uploaded_item_images, uploaded_item_images_chk} = this.state;
        db_item_info= db_item_info.info
        db_cat_info = db_cat_info.info

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
                <div className="d-flex justify-content-between">
                <div className='builder'>
                <h5 className='menu-item fw-bold mb-4 mt-4'>Menu Builder</h5>
                </div>
                <div className='builder'>
                <button type="button" className='menu-item btn-radius mb-4 mt-4' name="create_cat" onClick={(event)=>this.modelOpen(event)}>Add a menu category<span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                {/*<button type="button" className='menu-item btn-radius mt-2' onClick={this.openModal}>Visibility</button>*/}
                </div>
                </div>
                <div className="drop">
                {/* //drink */}
               

        {data.map((parent) => { // rendering parent data
                return (
                        <div className="drop_container" id="drop-items" key={parent.id}>
                            <div className="drop_card main-category w-100">
                                <div className="drop_data mt-2">
                                    <div className='d-flex justify-content-between drop-item p-2'>
                                        <div className='builder'>
                                            <h3 className='heading'>{parent.name}</h3>
                                        </div>
                                        <div className='builder'>
                                            <button className='menu-item right btn-radius' value={parent.cat_uid} name="edit_cat" onClick={(event)=>this.modelOpen(event)}>Customize</button>
                                            {parent.children.length < 1 && 
                                            <button className='menu-item right btn-radius' value={parent.id} name="create_item" onClick={(event)=>this.modelOpen(event)}>Create item<span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                                            }

                                            {parent.is_add_item === '0' &&   
                                            <button type="button" className='menu-item btn-radius' value={parent.id} name="create_cat" onClick={(event)=>this.modelOpen(event)}>Add a sub category<span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                                            }
                                            
                                            <img src="../../assets/images/icon-drag-drop.png" className="dragdrop-icon"/>

                                        </div>
                                    </div>
                                        {/*item*/}

                                        {parent.items && // rendering great-grandchildren
                                                        parent.items.map((item_row) => {
                                                                return (
                                                                        <div key={item_row.id}>
                                                                        <hr className='m-0'></hr>
                                                                        <div className='d-flex justify-content-between drop-item p-2'>
                                                                        <div className='builder-product'>
                                                                        <div className='img-builder'>
                                                                        <img src={item_row.img_mdfy} className="img-item item_img_custom_size"/>
                                                                        </div>
                                                                        <span className='item-name'>{item_row.name}</span>
                                                                        </div>
                                                                        <div className="builder">
                                                                            <button className="menu-item right btn-radius" value={JSON.stringify({item_uid:item_row.item_uid, cat_name:parent.name})} name="edit_item" onClick={(event)=>this.modelOpen(event)}>Customize</button>
                                                                                <span className="item-price">{item_row.price}<img src="../../../assets/images/icon-drag-drop.png" className="dragdrop-icon"/></span>
                                                                        </div>
                                                                        </div>
                                                                        </div>
                                                                       );
                                                                })}
                                </div>
                            </div>
                            


                        {parent.children.map((child) => { // rendering children of the parent
                                return (
                                        <div key={child.id}>


                                        <div className="drop_card sub-category mt-3">
                                            <div className="drop_data">
                                                <div className='d-flex justify-content-between drop-item p-2'>
                                                    <div className='builder'>
                                                        <h3 className='heading'>{child.name}</h3>
                                                    </div>
                                                    <div className='builder'>
                                                        <button className='menu-item right btn-radius' value={child.cat_uid} name="edit_cat" onClick={(event)=>this.modelOpen(event)}>Customize</button>
                                                        {child.children.length < 1 && 
                                                        <button className='menu-item right btn-radius' value={child.id} name="create_item" onClick={(event)=>this.modelOpen(event)}>Create item<span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                                                        }

                                                        {child.is_add_item === '0' &&
                                                        <button className='menu-item btn-radius' value={child.id} name="create_cat" onClick={(event)=>this.modelOpen(event)}>Add a sub-sub category<span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                                                        }
                                                        <img src="../../assets/images/icon-drag-drop.png" className="dragdrop-icon"/>
                                                    </div>
                                                </div>
                                                {/*item*/}
                                                {child.items && // rendering great-grandchildren
                                                        child.items.map((item_row) => {
                                                                return (
                                                                        <div key={item_row.id}>
                                                                        <hr className='m-0'></hr>
                                                                        <div className='d-flex justify-content-between drop-item p-2'>
                                                                        <div className='builder-product'>
                                                                        <div className='img-builder'>
                                                                        <img src={item_row.img_mdfy} className="img-item item_img_custom_size"/>
                                                                        </div>
                                                                        <span className='item-name'>{item_row.name}</span>
                                                                        </div>
                                                                        <div className="builder">
                                                                            <button className="menu-item right btn-radius" value={JSON.stringify({item_uid:item_row.item_uid, cat_name:child.name})} name="edit_item" onClick={(event)=>this.modelOpen(event)}>Customize</button>
                                                                                <span className="item-price">{item_row.price}<img src="../../../assets/images/icon-drag-drop.png" className="dragdrop-icon"/></span>
                                                                        </div>
                                                                        </div>
                                                                        </div>
                                                                       );
                                                                })}

                                            </div>
                                        </div>



                                        {child.children && // rendering grandchildren of the parent
                                        child.children.map((grandChild) => {
                                                return (
                                                        <div
                                                        key={grandChild.id}
                                                        style={{ paddingLeft: "20px" }}
                                                        >

                                                    <div className="drop_card sub-sub-cate mt-3">
                                                        <div className="drop_data">
                                                            <div className='d-flex justify-content-between drop-item p-2'>
                                                                <div className='builder'>
                                                                    <h3 className='heading'>{grandChild.name}</h3>
                                                                </div>
                                                                <div className='builder'>
                                                                    <button className='menu-item right btn-radius' value={grandChild.cat_uid} name="edit_cat" onClick={(event)=>this.modelOpen(event)}>Customize</button>
                                                                    <button className='menu-item btn-radius' value={grandChild.id} name="create_item" onClick={(event)=>this.modelOpen(event)}>Create item<span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                                                                        
                                                                    <img src="../../assets/images/icon-drag-drop.png" className="dragdrop-icon"/>
                                                                </div>
                                                            </div>
                                                            
                                                           {/* items */} 



                                                        {grandChild.items && // rendering great-grandchildren
                                                        grandChild.items.map((item_row) => {
                                                                return (
                                                                        <div key={item_row.id}>
                                                                        <hr className='m-0'></hr>
                                                                        <div className='d-flex justify-content-between drop-item p-2'>
                                                                        <div className='builder-product'>
                                                                        <div className='img-builder'>
                                                                        <img src={item_row.img_mdfy} className="img-item item_img_custom_size"/>
                                                                        </div>
                                                                        <span className='item-name'>{item_row.name}</span>
                                                                        </div>
                                                                        <div className="builder">
                                                                            <button className="menu-item right btn-radius" value={JSON.stringify({item_uid:item_row.item_uid, cat_name:grandChild.name})} name="edit_item" onClick={(event)=>this.modelOpen(event)}>Customize</button>
                                                                                <span className="item-price">{item_row.price}<img src="../../../assets/images/icon-drag-drop.png" className="dragdrop-icon"/></span>
                                                                        </div>
                                                                        </div>
                                                                        </div>
                                                                       );
                                                                })}
                                                                </div></div>
                                                        </div>
                                                       );
                                                })}
                                        </div>
                                            );
                                                        })}
                </div>
                    );
                              })}





        
                



                    {/* food */}
        
            </div>
            </div>
            </div>
            </div>
            </div>




        {/* Start Add/Edit Category Modal */}
            
    <Modal isOpen={this.state.modal} toggle={this.toggleModal} modalTransition={{ timeout: 200 }} className="cstModal" backdrop="static">
        <ModalBody>
            <div className="modal-header border border-0 pb-0">
                <h3 className='heading text-dark'>Customize</h3>
                <button type="button" className="btn-close" onClick={this.toggleModal}></button>
            </div>
            <form method="post" onSubmit={(event)=>this.handleSubmit(event)}>
                
                <div className="modal-body border border-0 pt-1 pb-0">
                    <input type="text" autoComplete="off" name="name" className="form-control date-time w-50" placeholder="Category Name" value={db_cat_info.name} onChange={this.handleEditCatChange} required />
                </div>
                <div className="modal-body border border-0">
                    <div className="flex justify-center h-screen items-center">
                        <div className="rounded-lg shadow-xl bg-gray-50 md:w-1/2 w-[360px]">
                            <div className="flex items-center justify-center w-full upload-docu border border-secondary">
                                <label className="flex justify-content-center w-100">
                                    <div className="flex flex-col items-center justify-center upload-img-mnubldr">
                                    {this.state.preview_img ? (
                                    <img src={this.state.preview_img} className="img_custom_size_mnubldr" />
                                ): (
                                    <p className=" text-sm tracking-wider text-center text-dark fw-bold text-secondary img_custom_size_mnubldr">Click to upload image</p>
                                )}
                                        
                                    </div>
                                    <input type="file" className="opacity-0" name="cat_img" onChange={this.uploadToClient} />
                                </label>
                                <div className='popup-icon-delete-image'>
                                    <img src="../../../assets/images/icon-delete.png" onClick={this.handlePreviewDelete} className="delete-pop-icon-image"/>
                                </div>
                            </div>

                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="radio1" name="header_type" value="img" checked={db_cat_info.header_type == 'img' ? true : false} onChange={this.handleEditCatChange}/>
                            <span className='peragraph'>Use an image header</span>
                            <label className="form-check-label" htmlFor="radio1"></label>
                        </div>

                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="radio2" name="header_type" value="txt" checked={db_cat_info.header_type == 'txt' ? true : false} onChange={this.handleEditCatChange}/><span className='peragraph'>Use text as header</span>
                            <label className="form-check-label" htmlFor="radio2"></label>
                        </div>
                        <hr></hr>

                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="check1" name="is_hidden" value="1" checked={db_cat_info.is_hidden == '1' ? true : false} onChange={this.handleEditCatChange} />
                            <label className="form-check-label" htmlFor="check1"><span className='peragraph'>Hidden category (items are still usable) </span></label>
                        </div>

                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="check2" name="is_enabled_time" value="1" checked={!!this.state.showMe} onChange={this.showHide} />
                            <label className="form-check-label" htmlFor="check2"><span className='peragraph'>Enable time based visibility</span></label>
                        </div>

                        <div style={{display: this.state.showMe?"block":"none"}}>
                        {timeBasedArr.length && timeBasedArr.map((row_wise_visible, index) => (
                        <div key={index} className='row'>
                            <div className='col-sm-4'>
                                <label className="form-check-label"><span className='peragraph'>Day</span></label>
                                <select className="form-select date-time" name="day_name" value={row_wise_visible.day_name} onChange={this.handleChange(index)}>
                                    <option value="">-Select-</option>
                                    {days_arr.map((row_wise) => { 
                                    return (<option key={row_wise.id} value={row_wise.id}>{row_wise.name}</option>
                                    )})}
                                </select>
                            </div>

                            <div className='col-sm-3'>
                                <label className="form-check-label"><span className='peragraph'>Start</span></label>
                                <select className="form-select date-time" name="start_time" value={row_wise_visible.start_time} onChange={this.handleChange(index)}>
                                    <option value="">-Select-</option>
                                    {from_arr.map((row_wise) => {
                                    return (<option key={row_wise.id} value={row_wise.id}>{row_wise.name}</option>
                                    )})}    
                                                                                                                                        </select>
                            </div>

                            <div className='col-sm-3'>
                                <label className="form-check-label"><span className='peragraph'>End</span></label>
                                <select className="form-select date-time" name="end_time" value={row_wise_visible.end_time} onChange={this.handleChange(index)}>
                                    <option value="">-Select-</option>
                                    {from_arr.map((row_wise) => {
                                    return (<option key={row_wise.id} value={row_wise.id}>{row_wise.name}</option>
                                    )})}    
                                                                                                                                        </select>
                            </div>
                            {
                            timeBasedArr.length !== 1  &&                  
                            <div className='col-sm-2'>
                                    <label className="form-check-label"></label><button type="button" className="btn-radius" onClick={this.handleTimeBaseRemove(index)}>Remove</button>
                                
                            </div>
                            }

                        </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            {
                (timeBasedArr.length < 8 && this.state.showMe) &&  
                <button type="button" className='btn-radius mt-2' onClick={this.handleTimeBaseAdd}>Add<span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
            }
            <div className='d-flex justify-content-between mt-4'>
                {/*<div className='builder'>
                    <button className='menu-item right btn-radius pink-btn' value="is_delete" onClick={this.toggleModalDel}>Delete</button>
                </div>*/}
                
                <div className='builder'>
                    <button type="button" className='menu-item right btn-radius text-secondary border border-secondary' onClick={this.toggleModal}>Cancel</button>
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
        </form>
    </ModalBody>
</Modal>

{/* End add/edit category modal */}

{/* Start Create Item modal */}

<Modal isOpen={this.state.create_item_modal} toggle={this.toggleCreateItemModal} modalTransition={{ timeout: 200 }} name="create_item" className="cstModal modal-lg" backdrop="static">
<ModalBody>
    <form method="post" onSubmit={(event)=>this.handleCreateItem(event)}>
          <div className="modal-header border border-0 pb-0">
            <div className='d-flex justify-content-between w-100'>
              <div className='item-create'>
                <h3 className='heading text-dark'>Create Item</h3>
              </div>
              <div className='item-customize'>
                <h3 className='heading text-dark text-justify'>Customize Item</h3>
              </div>
              <div className='item-create'>
                <button type="button" className="btn-close large-close" data-bs-dismiss="modal" aria-hidden="true" onClick={this.toggleCreateItemModal}></button>
              </div>
            </div>
          </div>
          <div className='modal-body pt-0 border border-0'>
            <div className="container-fuild">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="row gutters">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="rounded-lg shadow-xl w-100">
                       <div className="flex items-center justify-center w-full upload-docu border border-secondary img-overflow">
                        <label className="flex justify-content-center w-100">
                            <div className="flex flex-col items-center justify-center upload-img-mnubldr">
                               {uploaded_item_images.length > 0 ? (
                                    <img src={uploaded_item_images[0]} className="img_custom_size_mnubldr" />
                                ): (
                                    <p className=" text-sm tracking-wider text-center text-dark fw-bold text-secondary img_custom_size_mnubldr">Click to upload image</p>
                                )}
                            </div>
                            <input type="file" id="file_input" name="item_image" className="opacity-0 img-size file_input" onChange={this.uploadItemImage} multiple />
                        </label>
                        {uploaded_item_images.length > 0 &&
                        <div className="popup-icon-delete-image"><img src="../../../assets/images/icon-delete.png" className="delete-pop-icon-image" onClick={this.handleDeleteImage}/></div>
                        }
                    </div>

                      </div>
                    {uploaded_item_images.length > 0 &&
                    <div className='item-box mt-2'>
                        <div className='d-flex justify-content-between'>
                            {/*box*/}
                            {uploaded_item_images.length > 1 && ( uploaded_item_images.slice(1).map((image, index) => (
                                <div key={index} className="item-top-box">
                                <img src={image} width="80px" height="30px" />
                                </div>
                                )))}
                            {uploaded_item_images.length < 5 &&    
                            <div className='item-top-box' onClick={this.handleFileUpload}>
                                <div className='midle-item-box text-center'>
                                    <span className='box-item'>+</span>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                    } 

                      <div className="form-group">
                        <div className="row mt-2">
                          <div className='col-sm-6'>
                            <input type="text" autoComplete="off" name="item_uid" className="form-control date-time" placeholder="item uid" value={db_item_info.item_uid} readOnly={db_item_info.id ? true : false} onChange={this.handleEditChange} required />
                          </div>
                          <div className='col-sm-6'>
                            <input type="text" autoComplete="off" name="code" className="form-control date-time" placeholder="code" value={db_item_info.code} onChange={this.handleEditChange} required/>
                          </div>
                          {/*<div className="col-3 col-lg-3 text-end d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            <button className='btn-radius'>Recipe</button>
                          </div>*/}
                        </div>
                      </div>
                      <div className="form-group mt-2">
                        <input type="text" autoComplete="off" name="product_name" className="form-control date-time" placeholder="Product Name" value={db_item_info.name} onChange={this.handleEditChange} required/>
                      </div>
                      <div className='row mt-2'>
                        {/*<div className='col-sm-6'>
                          <input type="text" className="form-control date-time" placeholder="Category"  value={db_item_info.cat_name}/>
                        </div>*/}
                        <div className='col-sm-12'>
                          <select className="form-select date-time" name="fulfillment_by" value={db_item_info.fulfillment_by} onChange={this.handleEditChange}>
                            <option value="">Select Fulfillment Station</option>
                            {fulfillment_station_list.map((row_wise) => {
                                return (<option key={row_wise.id} value={row_wise.id}>{row_wise.name}</option>)
                                })}
                          </select>
                            
                        </div>
                      </div>
        
                        <div className="form-group mt-2">
                            <div className='row mt-2'>
                                <div className='col-sm-6'>
                                    <select className="form-select date-time" name="prepared_time" value={db_item_info.prepared_time} onChange={this.handleEditChange}>
                                    <option value="">Select Prepared Time</option>
                                    {prepared_time_combo.map((row_wise) => {
                                        return (<option key={row_wise.id} value={row_wise.id}>{row_wise.name}</option>)
                                    })}
                          </select>
                                </div>
                            </div>
                        </div>


                      {varients.map((row_wise, index) => (
                      <div key={index} className="row mt-2">
                        <div className='col-sm-4'>
                          <label className="form-check-label">
                            <span className='peragraph'>Price</span>
                          </label>
                          <input type="text" autoComplete="off" name="price" className="form-control date-time" placeholder="00.00" value={row_wise.price} onChange={this.handleChangeVarients(index)} />
                        </div>
                        <div className='col-sm-3'>
                          <label className="form-check-label">
                            <span className='peragraph'>Size</span>
                          </label>
                          <input type="text" autoComplete="off" name="size" className="form-control date-time" placeholder="00/Small" value={row_wise.size} onChange={this.handleChangeVarients(index)} />
                        </div>
                        <div className="col-5 col-lg-5 mt-3 pt-2 text-right d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          <button type="button" className='btn-radius' name="price_variation" value={index} onClick={this.openModal(index)}>Price Variations</button>
                        </div>
                      </div>
                      ))}
                      <button type="button" className='menu-item btn-radius mt-2' name="add_varient" onClick={this.openModal(0)}>Add Variant <span className='btn-icon'><i className="fa fa-plus fw-normal" aria-hidden="true"></i></span></button>
                      <div className="row mt-2">
                        <div className='col'>
                          <label className="form-check-label">
                            <span className='peragraph'>Short description</span>
                          </label>
                          <input type="text" autoComplete="off" name="short_desc" value={db_item_info.short_desc} className="form-control date-time" placeholder="eg. A classic cheeseburger" onChange={this.handleEditChange} />
                        </div>
                        </div>
                        <div className="row mt-2">
                        <div className='col'>
                          <label className="form-check-label">
                            <span className='peragraph'>Long description</span>
                          </label>
                          <textarea type="text" name="long_desc" value={db_item_info.long_desc} className="form-control date-time" placeholder="eg. A classic cheeseburger" onChange={this.handleEditChange} />
                        </div>
                        </div>
                        <div className="row mt-2">
                        <div className='col d-flex justify-content-between'>
                          <div className='form'>
                        <button type="button" className='menu-item btn-radius mt-2' name="create_visibility" onClick={this.openModal(0)}>Visibility</button>
                        </div>
                        <div className="form-check mt-2">
                       <input type="checkbox" className="form-check-input" id="check1" name="out_of_stock" value="1" checked={db_item_info.out_of_stock == '1' ? true : false} onChange={this.handleEditChange}/>
                      <label className="form-check-label" htmlFor="check1"><span className='peragraph'>Out of stock </span></label>
                      </div>
                      <div className="form-check mt-2">
                       <input type="checkbox" className="form-check-input" id="enabled" name="enabled" value="1" checked={db_item_info.enabled == '1' ? true : false} onChange={this.handleEditChange}/>
                      <label className="form-check-label" htmlFor="enabled"><span className='peragraph'>Disable item</span></label>
                      </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <div className='row mt-3'>
                          <div className='d-flex justify-content-between'>
                            <div className='col-sm-9'>
                              <h3 className='modal-titel mb-0'>Add modifier group</h3>
                              <button type='button' className='menu-item btn-radius' onClick={this.openModifierGroupCreateModal}>Create Modifier Group <span className='btn-icon'>
                                  <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                            <div className='col-sm-3 text-end pt-3'>
                              <button type='button' className='btn-radius text-end' onClick={this.openModifierGroupAddModal}>Add <span className='btn-icon'>
                                  <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>

                           { AddModifierData.map( (modifier_group_data,index) =>                                                    
                          <div key={index} className='card p-2 mt-2'>
                            <div className='row'>
                                <div className='col-sm-11'>
                                    <div className='right-extra d-flex drop-item'>
                                        <span className='equal text-muted'>=</span>
                                        <div className='extra-data'>
                                            <h3 className='peragraph text-secondary mb-0'>{modifier_group_data.name}</h3>
                                        </div>
                                    </div>
                                </div> 
                                <div className='col-sm-1'>
                                    <div className='left-extra d-flex drop-item'>                                                                
                                        <div className='edit-duplicate-icon'>
                                            <div className='ellipsis-icon top-0'>
                                                <div className="dropdown">
                                                    <button type="button" className="dropdown drop-down bg-white border border-0" onClick={this.toggleModifierDropdown(modifier_group_data.label)}>
                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                    </button>
                                                    <ul className={`dropdown-menu${modifier_index == modifier_group_data.label && isdropdownModifier ? ' show' : ''}`}>
                                                        <li>
                                                            <a className="dropdown-item extra-item border border-bottom border border-top-0" onClick={(e)=>this.openModifierGroupCreateModal(e,modifier_group_data)}>Edit name</a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item extra-item border border-bottom border border-bottom-0" name="Modifier_Group" onClick={(event)=>this.openRemoveModal(event,index,modifier_group_data.label)}>Remove</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div> 
                          
                          
                          
                        )} 



                        <div className='row mt-1'>
                          <div className='d-flex justify-content-between'>
                            <div className='col-sm-9 Customize-section'>
                            <h3 className='modal-titel mb-0 pb-1 mt-2'>Add tags</h3>
                            <div className="displaytag-container">                                                                
                                {tagname && Object.keys(tagname).map((key) => (
                                        <div key={key} className="displaytag">
                                            <span className="tag">{tagname[key]}
                                                <span className="tag-close-icon" value={tagname[key]} onClick={(event)=>this.handleTagRemove(event,key)}> x </span>
                                            </span>
                                        </div>
                                    ))}                                                                
                                </div>
                            </div>
                            <div className='col-sm-3 text-end pt-3 mt-2'>
                              <button className='btn-radius text-end' name="tags" type='button' onClick={this.openModal(0)}>Add <span className='btn-icon'>
                                  <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='row mt-2'>
                          <div className='d-flex justify-content-between'>
                            <div className='col-sm-9 Customize-section'>
                            <h3 className='modal-titel mb-0 pb-1 mt-2'>Add customer preference tags</h3>
                                  <div className="displaytag-container">  
                                  {preferencename && Object.keys(preferencename).map((key) => (                                                                                                                         
                                          <div key={key} className="displaytag">
                                              <span className="tag">{preferencename[key].name}
                                                  <span className="tag-close-icon" value={preferencename[key].name} onClick={(event)=>this.handlePreferenceTagRemove(event,key)}> x </span>
                                              </span>
                                          </div>
                                      ))}                                                                
                                  </div>   
                            </div>
                            <div className='col-sm-3 text-end pt-3 mt-2'>
                              <button className='btn-radius text-end' type='button' name = 'pTags' onClick={this.openModal(0)}>Add <span className='btn-icon'>
                                  <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='row mt-3'>
                          <div className='d-flex justify-content-between'>
                            <div className='col-sm-9'>
                              <h3 className='modal-titel mb-0'>Add extras group</h3>
                              <button type="button" className='menu-item btn-radius' onClick={this.openExtraGroupCreateModal}>Create Extra Group <span className='btn-icon'>
                                  <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                            <div className='col-sm-3 text-end pt-3'>
                              <button type="button" className='btn-radius text-end' onClick ={this.openExtraGroupAddModal}>Add<span className='btn-icon'>
                                  <i className="fa fa-plus fw-normal" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        { AddExtraData.map( (extras_group_data,index) =>                                                    
                            <div key={index} className='card p-2 mt-2'>
                            <div className='row'>
                                <div className='col-sm-11'>
                                    <div className='right-extra d-flex drop-item'>
                                        <span className='equal text-muted'>=</span>
                                        <div className='extra-data'>
                                            <h3 className='peragraph text-secondary mb-0'>{extras_group_data.name}</h3>
                                        </div>
                                    </div>
                                </div> 
                                <div className='col-sm-1'>
                                    <div className='left-extra d-flex'>                                                                
                                        <div className='edit-duplicate-icon'>
                                            <div className='ellipsis-icon top-0'>
                                                <div className="dropdown">
                                                    <button type="button" className="dropdown drop-down bg-white border border-0" onClick={this.togglegroupDropdown(extras_group_data.label)}>
                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                    </button>
                                                    <ul className={`dropdown-menu${current_index == extras_group_data.label && isdropdownOpen ? ' show' : ''}`}>
                                                        <li>
                                                            <a className="dropdown-item extra-item border border-bottom border border-top-0" onClick={(event)=>this.openExtraGroupCreateModal(event,extras_group_data)}>Edit name</a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item extra-item border border-bottom border border-bottom-0" name="Extra_Group" onClick={(event)=>this.openRemoveModal(event,index,extras_group_data.label)}>Remove</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        )}

                        <div className='d-flex justify-content-end mt-4'>
                     
                      <div className='builder btn-bottom'>
                     <button type="button" className='menu-item right btn-radius text-secondary border border-secondary' onClick={this.toggleCreateItemModal}>Cancel</button>
                    { 
                    this.state.is_loading ? 
                    (
                        <button type="button" className='menu-item right btn-radius pink-btn'>Wait...</button>
                    ):
                    (
                    <button type="submit" className='menu-item right btn-radius green-btn'>Apply</button>
                    )
                    }
                    {/*<button type="submit" className='menu-item right btn-radius green-btn'>Apply</button>*/}
                   </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
    </ModalBody>
</Modal>

{/* End Create Item modal */}


{/* Start Confirm modal */}
<Modal isOpen={this.state.is_delete}>
    <ModalBody>
        <button type="button" value="is_delete" onClick={this.toggleModalDel} className="btn-close" data-bs-dismiss="modal"></button>
        <div className="modal-body">
            <p className='peragraph text-center pt-2'>Do you want to delete this category?</p>
        </div>

        <div className="modal-footer border border-0">
            <div className='d-flex justify-content-between'>
                <div className='builder'>
                    <button className='menu-item right btn-radius text-secondary border border-secondary' onClick={this.toggleModalDel}>Cancel</button>
                    <button className='menu-item right btn-radius green-btn' onClick={()=>this.okProceed()}>Apply</button>
                </div>
            </div>
        </div>
    </ModalBody>
</Modal>
{/* End Confirm modal */}


{isModalOpen && (
    <Modal_create_visibility isOpen={isModalOpen} onClose={this.closeModal}  args={this.state} onSubmit={this.getData} />
                                                                                                    
    )
}

{addVarientModalOpen && (
    <Modal_item_varient  name="add_varient" isOpen={addVarientModalOpen} onClose={this.closeModal}  args={this.state} onSubmit={this.childVarientData} />
                                                                                                    
    )
}

{priceVariationModalOpen && (
    <Modal_item_price_variation  isOpen={priceVariationModalOpen} onClose={this.closeModal}  args={this.state} onSubmit={this.childPriceVariationData} />
                                                                                                    
    )
}

{tagModalOpen && (
    <TagModal  isOpen={tagModalOpen} onClose={this.closeModal}  args={this.state} onSubmit={this.childTagData} />
                                                                                                    
    )
} 

{preferenceTagModalOpen && (
    <PreferenceTagModal isOpen={preferenceTagModalOpen} onClose={this.closeModal} args={this.state} onSubmit={this.childPreferenceTagData} />
)}

{isExtraGroupCreateModalOpen && (
    <CreateExtraGroupModal isOpen={isExtraGroupCreateModalOpen} onClose={this.closeExtraGroupCreateModal} onSubmit={this.getCreateExtraGroupdata} data_from_Parent={extras_group_data1}/>
)} 

{isExtraGroupAddModalOpen && (
    <ExtraGroupAddModal isOpen={isExtraGroupAddModalOpen} isClose={this.closeExtraGroupAddModal} onSubmit={this.getExtraGroupAddModal}/>
)}

{isModifierGroupCreateModalOpen && (
    <CreateModifierGroupModal isOpen={isModifierGroupCreateModalOpen} onClose={this.closeModifierGroupCreateModal} data_frm_parent={modifier_data} onSubmit={this.getCreateModifierGroupdata}/>
)}

{isModifierGroupAddModalOpen && (
    <AddModifierGroupModal isOpen={isModifierGroupAddModalOpen} onClose={this.closeModifierGroupAddModal} onSubmit={this.getModifierGroupAddModal}/>
)}

{isRemoveModalopen &&(
    <RemoveModal isOpen={isRemoveModalopen} onClose={this.closeRemoveModal} data_from_parent={which_group} onSubmit={this.handleDelete} />
)}


            </>
                )


    }

}//
