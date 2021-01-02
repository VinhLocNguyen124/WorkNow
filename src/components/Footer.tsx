import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

const Footer = () => {
    console.log('render Footer');
    return (

        <Image source={require('../assets/images/textlogo.png')}
            style={{ height: 100, width: 200, alignSelf: 'center', marginVertical: 10 }}
        ></Image>


    );
}

export default React.memo(Footer);


