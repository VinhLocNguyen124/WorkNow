import React from "react";
import { View, StyleSheet } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Skeleton = () => {
    return (
        <SkeletonPlaceholder>
            {/* post details */}
            <View style={tempStyles.post_details_container}>
                <View style={{ width: 60, height: 60, borderRadius: 50, marginRight: 10 }} />
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                    <View style={{ width: 200, marginTop: 6, height: 20, borderRadius: 4 }} />
                    <View style={{ width: 120, marginTop: 6, height: 20, borderRadius: 4 }} />
                </View>
            </View>

            {/* Text Content */}
            <View style={{ width: '94%', height: 200, borderRadius: 10, alignSelf: 'center', marginTop: 10 }} />

        </SkeletonPlaceholder>
    );
};

const tempStyles = StyleSheet.create({
    post_details_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 10,
    },
});

export default Skeleton;