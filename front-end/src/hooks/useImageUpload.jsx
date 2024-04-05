import { useState, useEffect } from 'react';
import axios from 'axios';

const useImageUpload = (jwtToken, university, postUrl) => {
    const [picFileName, setPicFileName] = useState(null);
    const [picData, setPicData] = useState(null);
    const [keyName, setKeyName] = useState(null);
    const [picUpload, setPicUpload] = useState(false);
    const[newDataSaved, setNewDataSaved] = useState(false);
    const [newData, setNewData] = useState(null);

    useEffect(() => {
        if (picFileName) {
            setKeyName(`${university.id}/${picFileName}`);
        }
    }, [picFileName, university]);

    useEffect(() => {
        if(picUpload){
            saveToDatabase();
            setPicUpload(false)
            setKeyName(null);
            setPicData(null);
        }
    }, [picUpload]);

    useEffect(() => {
        if(!newData){
            return;
        }
        if(picData && keyName){
            console.log("Uploading image to S3");
            (async () => {
                try {
                    const signedUrl = await getSignedUrl();
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
                                setPicUpload(true);
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
            setPicUpload(true);
        }

    }, [newData]);

    const getSignedUrl = () => {
        console.log("In get signed" + picFileName);
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
        console.log("saving to database");
        // console.log(newData);
        axios.post(postUrl, newData,
            {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    // console.log("Post newDataSaved to database");
                    // console.log(response.data);
                    setNewData(null);
                    setNewDataSaved(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return {
        picFileName,
        setPicFileName,
        picData,
        setPicData,
        newData,
        setNewData,
        newDataSaved,
        setNewDataSaved,
        saveToDatabase
    };
}

export default useImageUpload;