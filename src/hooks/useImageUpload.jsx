import { useState, useEffect } from 'react';
import axios from 'axios';

const useImageUpload = (jwtToken, university, postUrl) => {
    const [dataToSave, setDataToSave] = useState(null);
    const[newDataSaved, setNewDataSaved] = useState(false);
    const [initUploadDone, setInitUploadDone] = useState(false);
    const [newData, setNewData] = useState(null);



    const initUpload = (newData, picData, keyName) => {
        console.log("In init upload", newData);
        if(!newData){
            return;
        }
        setDataToSave(newData);
        if(picData && keyName){
            console.log("Uploading image to S3");
            (async () => {
                try {
                    const signedUrl = await getSignedUrl(keyName);
                    if (signedUrl) {
                        console.log('Uploading image to S3 signed URL');
                        try {
                            const response = await axios.put(signedUrl, picData, {
                                headers: {
                                    'Content-Type': picData.type
                                },
                            });
                            if (response.status === 200) {
                                console.log('Image uploaded to S3', response);
                                setInitUploadDone(true);
                            }
                        } catch (error) {
                            console.error('Error uploading to S3:', error);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            })();
        } else {
            setInitUploadDone(true);
        }
    }


    const getSignedUrl = (keyName) => {
        console.log("In get signed" + keyName);
        return axios.get(`http://localhost:8222/api/post-service/presigned-url?bucketName=eduverse-v1&keyName=${keyName}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const saveToDatabase = () => {
        setInitUploadDone(false);
        axios.post(postUrl, dataToSave,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                if (response.status === 200 && response.data) {
                    // console.log("Post newDataSaved to database");
                    // console.log(response.data);
                    setDataToSave(null);
                    setNewDataSaved(true);
                }
                return null;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return {
        newData,
        setNewData,
        newDataSaved,
        setNewDataSaved,
        initUpload,
        initUploadDone,
        saveToDatabase
    };
}

export default useImageUpload;