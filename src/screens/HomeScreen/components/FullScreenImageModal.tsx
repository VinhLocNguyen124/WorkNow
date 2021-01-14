import React, { useState, useCallback, useEffect } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Image,
} from "react-native";
import PropTypes from 'prop-types';
import { Colors } from "../../../constansts/color";

//Icons & Styles
import Ionicons from 'react-native-vector-icons/Ionicons';

import { FitImageDimension } from '../../../helpers/FitImageDimension';
import { Dimens } from '../../../constansts/dimension';
import ImageViewer from 'react-native-image-zoom-viewer';

const iconHeader = <Ionicons name="arrow-back" size={30} color={'white'}></Ionicons>

const FullScreenImageModal = (props) => {
    //Props
    const { visible, onPressClose, imgurl } = props;
    const [imgDimen, setImgDimen] = useState({
        width: Dimens.retangleImageFitScreen.width,
        height: Dimens.retangleImageFitScreen.height
    });

    //------------------------Effects---------------------------
    useEffect(() => {

        const getSizeTimeout = setTimeout(() => {
            Image.getSize(imgurl, (width, height) => setImgDimen({ width, height }))
        }, 0);

        return () => {
            clearTimeout(getSizeTimeout);
        }
    }, []);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            {/* <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'rgba(0, 0, 0,0.9)',
                justifyContent: "center",
                alignItems: 'center',
            }}> */}
            {/* <View style={{
                width: Dimens.widthScreen,
                height: Dimens.heightScreen,
                justifyContent: "center",
                alignItems: 'center',
            }}>
                <Image source={{ uri: imgurl }} style={{
                    width: imgDimen.height < imgDimen.width ? FitImageDimension(imgDimen.width, imgDimen.height, 'w') : FitImageDimension(imgDimen.width, imgDimen.height, 'w') * 0.9,
                    height: imgDimen.height < imgDimen.width ? FitImageDimension(imgDimen.width, imgDimen.height, 'w') : FitImageDimension(imgDimen.width, imgDimen.height, 'h') * 0.9,
                }} /> */}
            <ImageViewer imageUrls={[
                {
                    url: imgurl,
                    width: imgDimen.height < imgDimen.width ? FitImageDimension(imgDimen.width, imgDimen.height, 'h') : FitImageDimension(imgDimen.width, imgDimen.height, 'w') * 0.9,
                    height: imgDimen.height < imgDimen.width ? FitImageDimension(imgDimen.width, imgDimen.height, 'w') : FitImageDimension(imgDimen.width, imgDimen.height, 'h') * 0.9

                }
            ]}
                enableImageZoom={true}
            ></ImageViewer>

            <TouchableOpacity style={{ position: 'absolute', top: 22, left: 12 }} onPress={onPressClose}>
                {iconHeader}
            </TouchableOpacity>
            {/* </View> */}


            {/* </View> */}
        </Modal >
    );
};

FullScreenImageModal.propTypes = ({
    onPressClose: PropTypes.func,
    visible: PropTypes.bool,
    imgurl: PropTypes.string,
});

FullScreenImageModal.defaultProps = ({
    onPressClose: null
});

export default React.memo(FullScreenImageModal);