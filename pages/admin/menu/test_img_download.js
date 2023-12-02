import React, { Component } from 'react';
import axios from 'axios';

class ImageDownloader extends Component {
    constructor() {
        super();
        this.state = {
imageUrl: 'http://rms.softreader.in:5000/qrcode/1.svg', // Replace with your image URL
        };
    }

    downloadImage = () => {
        const { imageUrl } = this.state;

        axios
            .get(imageUrl, { responseType: 'blob' })
            .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'image.svg'; // Specify the desired file name
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    })
        .catch((error) => console.error('Error downloading image:', error));
    };

    render() {
        return (
                <div>
                <button onClick={this.downloadImage}>Download Image</button>
                </div>
               );
    }
}

export default ImageDownloader;

