import React, { Component } from 'react';
import axios from 'axios';

class ImageDownloader extends Component {
    constructor() {
        super();
        this.state = {imageUrl: 'http://rms.softreader.in:5000/qrcode/1.svg'};
    }

    downloadImage = () => {
        const { imageUrl } = this.state;
        var response = app.get(imageUrl)
        if(response)
        {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'image.svg';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }

        
        
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

