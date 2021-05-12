//Use Strict
import React from 'react';

//Screens
import CustomDrawerContent from './../../src/components/CustomDrawerContent';
import { createAppFlow } from './AppStack';


//navigation packages
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Navigators
const Drawer = createDrawerNavigator();


export const createDrawer = () => {
    const navigation = useNavigation();
    return (
        <Drawer.Navigator
            drawerType="back"
            drawerContent={props => <CustomDrawerContent navigation={navigation} />}
        >
            <Drawer.Screen name="DrawerApp" component={createAppFlow}
                options={{
                    headerShown: false,
                }}
            ></Drawer.Screen>
        </Drawer.Navigator>
    );
}