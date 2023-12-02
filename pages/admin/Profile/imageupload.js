// components/ImageUpload.js
import React from 'react';

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreview: null,
    };
  }

  handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  render() {
    const { imagePreview } = this.state;

    return (
      <div className="image-upload-container">
        <label htmlFor="image-upload" className="upload-label">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="preview-image" />
          ) : (
            <span>Choose an image</span>
          )}
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={this.handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
    );
  }
}