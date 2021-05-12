import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Colors } from '../../../constansts/color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SwipeableRow = (props) => {

    const { children, onDeleteNoti } = props;
    const _swipeableRow = useRef();

    const renderRightAction = (text, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });

        const pressHandler = () => {
            close();
            onDeleteNoti();
        };

        return (
            <Animated.View style={{
                flex: 1,
                margin: 5, transform: [{ translateX: 0 }]
            }}>
                <RectButton
                    style={{
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: 'tomato',
                        borderRadius: 10
                    }}
                    onPress={pressHandler}>
                    <FontAwesome5 name="trash-alt" color="white" size={25}></FontAwesome5>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    const renderRightActions = progress => (
        <View style={{ width: 192, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>
            {renderRightAction('Delete', 192, progress)}
        </View>
    );

    const close = () => {
        _swipeableRow.current.close();
    };

    return (
        <Swipeable
            ref={_swipeableRow}
            friction={2}
            leftThreshold={100}
            rightThreshold={40}
            renderRightActions={renderRightActions}>
            {children}
        </Swipeable>
    );

}

const styles = StyleSheet.create({
    actionText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});

export default SwipeableRow;
