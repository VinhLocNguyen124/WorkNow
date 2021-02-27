import * as ImagePicker from 'react-native-image-picker';
import { Permission, PERMISSION_TYPE } from '../helpers/AppPermission';
import { URLs } from '../constansts/url';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

const onLaunchImageGallery = (callback) => {
    Permission.checkPermission(PERMISSION_TYPE.photo).then(boolean => {
        if (boolean) {
            ImagePicker.launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 800,
                maxWidth: 800,
            }, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    const source = {
                        uri: response.uri,
                        type: response.type,
                        name: response.fileName
                    }
                    console.log(response.uri)
                    callback(source, response);
                }
            });
        }
    });
}

const onLaunchCamera = (callback) => {
    Permission.checkPermission(PERMISSION_TYPE.camera).then(boolean => {
        if (boolean) {
            ImagePicker.launchCamera(
                {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 800,
                    maxWidth: 800,
                },
                (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.errorCode) {
                        console.log('ImagePicker Error: ', response.errorMessage);
                    } else {
                        const source = {
                            uri: response.uri,
                            type: response.type,
                            name: response.fileName
                        }
                        console.log(response.uri)
                        callback(source, response);
                    }
                },
            )
        }
    })
}

const onPickFile = (callback) => {
    Permission.checkPermission(PERMISSION_TYPE.photo).then(boolean => {
        if (boolean) {
            try {
                DocumentPicker.pick({
                    type: [DocumentPicker.types.pdf],
                }).then(response => {
                    const source = {
                        uri: response.uri,
                        type: response.type,
                        name: response.name
                    }
                    console.log(response);
                    callback(source, response);
                })


            } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                    // User cancelled the picker, exit any dialogs or menus and move on
                } else {
                    throw err;
                }
            }

        }
    });
}

const cloudinaryUploadImage = async (photo) => {
    const data = await new FormData();
    await data.append('file', photo);
    await data.append('upload_preset', 'locnguyencoder');
    await data.append("cloud_name", "locnguyen_cloud");

    try {
        const response = await fetch(URLs.URL_API_CLOUDINARY, {
            method: "post",
            body: data,
        });

        return response.json();
    } catch (error) {
        return error;
    }
}

export { onLaunchImageGallery, onLaunchCamera, cloudinaryUploadImage, onPickFile }