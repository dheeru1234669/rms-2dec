import React from 'react';
import PreferenceTagModal from './modal_PreferenceTag';
import TagModal from './modal_Tag';
import CreateExtraGroupModal from './modal_Create_Extra_Group';

export default class HomePage extends React.Component {
  

  state = {
    isPreferenceTagModalOpen: false,
    isTagModalOpen: false,
    valueToPass:"Do you want to delete this Zone?",name:[],
    isCreateExtraGroupModalOpen: false
  };

  openPreferenceTagModal = () => {
    this.setState({ isPreferenceTagModalOpen: true });
    // this.setState({valueToPass:"Do you want to delete this Zone?"})
  };

  closePreferenceTagModal = () => {
    this.setState({ isPreferenceTagModalOpen: false });
  };

  openTagModal = () => {
    this.setState({ isTagModalOpen: true });
    // this.setState({valueToPass:"Do you want to delete this Zone?"})
  };

  closeTagModal = () => {
    this.setState({ isTagModalOpen: false });
  };

  getTagdata =(valuefromTagModal) =>{
    console.log("valuefromTagModal", valuefromTagModal)
    this.setState({name: valuefromTagModal})
    this.setState({ isTagModalOpen: false });  
  }

  openCreateExtraGroupModal = () => {
    this.setState({ isCreateExtraGroupModalOpen: true });
    // this.setState({valueToPass:"Do you want to delete this Zone?"})
  };

  closeCreateExtraGroupModal = () => {
    this.setState({ isCreateExtraGroupModalOpen: false });
  };



  render() {
    const { isPreferenceTagModalOpen, valueToPass, isTagModalOpen, name, isCreateExtraGroupModalOpen } = this.state;
    // console.log("Data:", isPreferenceTagModalOpen )
    return (
      <div>
        <h1>Welcome to the Home Page</h1>
        <button onClick={this.openPreferenceTagModal}>Open PreferenceTagModal </button>
        {isPreferenceTagModalOpen && (
          <PreferenceTagModal isOpen={isPreferenceTagModalOpen} onClose={this.closePreferenceTagModal} value={valueToPass} />
        )}
        <br/>
        <button onClick={this.openTagModal}>Open TagModal </button>
        {isTagModalOpen &&(
          <TagModal isOpen={isTagModalOpen} onClose={this.closeTagModal} onSubmit={this.getTagdata}/>
          )}
        <br/>
        
        <div className="displaytag-container">                                             
          {name.map((tag, index)=> (
            <div className="displaytag">
               <span key={index} className="tag">{tag}
                   <span className="tag-close-icon"> x </span>
                </span>
            </div>
            ))}                                                                
        </div>

        <button onClick={this.openCreateExtraGroupModal}>Open Create Extra Group Modal </button>
        {isCreateExtraGroupModalOpen &&(
          <CreateExtraGroupModal isOpen={isCreateExtraGroupModalOpen} onClose={this.closeCreateExtraGroupModal} onSubmit={this.getTagdata}/>
          )}
        <br/>


        {/* <div className="tags-input">
          {name.map((tag, index)=> (
          <span key={index} className="tag">{tag}
          <span className="tag-close-icon"> x </span>
           <button
                type="button"
                onClick={() => this.handleTagRemove(tag)}
                className="remove-button"
              >
                &times;
          </button> *
          </span>
          ))
          }
          </div> */}


        
        
      </div>
    );
  }
}
