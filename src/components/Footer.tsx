import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

const Footer = () => {
    console.log('render Footer');
    return (

        <Image source={require('../assets/images/textlogo.png')}
            style={{ height: 100, width: 220, alignSelf: 'center', marginVertical: 0 }}
        ></Image>


    );
}

export default React.memo(Footer);


