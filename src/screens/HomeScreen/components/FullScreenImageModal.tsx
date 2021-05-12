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
    const { visible, onPressClose, imgurl, } = props;

    //------------------------Effects---------------------------
    useEffect(() => {

    }, []);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >

            <ImageViewer imageUrls={[
                {
                    url: imgurl,
                }
            ]}
                enableImageZoom={true}

            ></ImageViewer>

            <View style={{
                width: '100%', position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: 'rgb(0,0,0)', padding: 10
            }}>
                <TouchableOpacity style={{ alignSelf: 'flex-start', padding: 10 }} onPress={onPressClose}>
                    {iconHeader}
                </TouchableOpacity>
            </View>

            <View style={{
                width: '100%', position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgb(0,0,0)', height: 20
            }}></View>

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

export default FullScreenImageModal;