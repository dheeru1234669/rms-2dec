import React, { Component } from 'react';

class ImageUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
selectedImage: null,
               uploadedImages: [],
        };
    }

    handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            this.setState({ selectedImage: file });
        }
    };

    handleUpload = () => {
        const { selectedImage, uploadedImages } = this.state;
        if (selectedImage) {
            uploadedImages.push(selectedImage);
            this.setState({ uploadedImages, selectedImage: null });
        }
    };

    render() {
        const { selectedImage, uploadedImages } = this.state;

        return (
                <div>
                <input type="file" accept="image/*" onChange={this.handleImageChange} />
                {selectedImage && (
                        <div>
                        <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                        <button onClick={this.handleUpload}>Upload</button>
                        </div>
                        )}
                <div className="uploaded-images">
                {uploadedImages.map((image, index) => (
                            <div key={index} className="image-box">
                            <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
                            </div>
                            ))}
                </div>
                </div>
               );
    }
}

export default ImageUploadComponent;

