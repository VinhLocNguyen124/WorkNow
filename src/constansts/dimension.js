import { Dimensions } from 'react-native';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

export const Dimens = {
    heightScreen: heightScreen,
    widthScreen: widthScreen,
    retangleImageFitScreen: {
        width: widthScreen,
        height: widthScreen / 1.5,
    },
    squareImageFitScreen: {
        width: widthScreen,
        height: widthScreen,
    },
}