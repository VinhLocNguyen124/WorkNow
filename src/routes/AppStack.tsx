//Use Strict
import React from 'react';

//screens
import PostScreen from './../screens/PostScreen/index';
import EditIntroScreen from './../screens/EditIntroScreen/index';
import ListChoiceScreen from './../screens/ListChoiceScreen/index';
import TimeLineScreen from './../screens/TimeLineScreen/index';
import BackgroundScreen from './../screens/BackgroundScreen/index';
import ListSkillScreen from './../screens/ListSkillScreen/index';
import ListUniScreen from './../screens/ListUniScreen/index';
import MessageDetailScreen from './../screens/MessageDetailScreen/index';
import RequirementScreen from './../screens/RequirementScreen/index';
import ListMatchedJobScreen from './../screens/ListMatchedJobScreen/index';
import JobDetailScreen from './../screens/JobDetailScreen/index';
import GeneralProfileScreen from './../screens/GeneralProfileScreen/index';
import ListRequestScreen from './../screens/ListRequestScreen/index';
import PostDetailScreen from './../screens/PostDetailScreen/index';
import ListFriendScreen from './../screens/ListFriendScreen/index';
import { createBottomTabs } from './BottomTabs';

//navigation packages
import { createStackNavigator } from '@react-navigation/stack';

//Navigators
const Stack = createStackNavigator();

export const createAppFlow = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="BottomTabs" component={createBottomTabs}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="postModal" component={PostScreen}
                options={{
                    headerShown: false,
                    // transitionSpec: {
                    //   open: config,
                    //   close: config,
                    // },
                }}
            ></Stack.Screen>
            <Stack.Screen name="EditIntro" component={EditIntroScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="ListChoice" component={ListChoiceScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="Background" component={BackgroundScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="Timeline" component={TimeLineScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="ListSkill" component={ListSkillScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="ListUni" component={ListUniScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="MessageDetail" component={MessageDetailScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="Requirement" component={RequirementScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="ListMatchedJob" component={ListMatchedJobScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="JobDetail" component={JobDetailScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="GeneralProfile" component={GeneralProfileScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="ListRequest" component={ListRequestScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="PostDetail" component={PostDetailScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
            <Stack.Screen name="ListFriend" component={ListFriendScreen}
                options={{
                    headerShown: false,
                }}
            ></Stack.Screen>
        </Stack.Navigator>
    );
}
