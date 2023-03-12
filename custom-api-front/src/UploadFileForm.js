import React, { useState } from 'react';
import axios from 'axios';
import {useCookies} from "react-cookie";

function UploadForm(props) {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('http://127.0.0.1:8000/api/uploadfile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            props.updateData(res.data);
        });




        //console.log(response.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileInputChange} />
            <button type="submit">Upload</button>
        </form>
    );
}

export default UploadForm;