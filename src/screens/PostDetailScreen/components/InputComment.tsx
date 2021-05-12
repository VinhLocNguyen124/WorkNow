import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';

//Styles & Images & Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Consts
import { Colors } from '../../../constansts/color';

import PropTypes from 'prop-types';


const InputComment = (props) => {
    //Props
    const { submitCommentLoading, cmtContent, onChangeText, onSubmitComment } = props;

    return (
        <View style={{
            flexDirection: 'row', padding: 10,
            backgroundColor: 'transparent', alignItems: 'center',
            borderWidth: 1, borderColor: Colors.LightGray, marginTop: 10
        }}>
            <TextInput
                style={{
                    flex: 1, minHeight: 40,
                    marginHorizontal: 10, borderWidth: 1, borderColor: Colors.Gray,
                    borderRadius: 15,
                    paddingHorizontal: 10,
                }}
                multiline={true}
                placeholder="Nhập bình luận của bạn ..."
                onChangeText={onChangeText}
                value={cmtContent}
            ></TextInput>

            <TouchableOpacity onPress={onSubmitComment}>
                {submitCommentLoading ?
                    <ActivityIndicator size="small" color={Colors.MainBlue}></ActivityIndicator>
                    :
                    <FontAwesome name="send" size={25} color={Colors.MainBlue}></FontAwesome>
                }
            </TouchableOpacity>
        </View>
    );
}

InputComment.propTypes = ({
    submitCommentLoading: PropTypes.bool,
    cmtContent: PropTypes.string,
    onChangeText: PropTypes.func,
    onSubmitComment: PropTypes.func,
});

export default React.memo(InputComment);