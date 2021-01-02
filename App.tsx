/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//Use Strict
import React, { useEffect, useState } from 'react';

//Firebase
import auth from '@react-native-firebase/auth';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import HomeScreen from './src/screens/HomeScreen/index';
import LoadingScreen from './src/screens/LoadingScreen/index';
import LoginScreen from './src/screens/LoginScreen/index';
import RegisterScreen from './src/screens/RegisterScreen/index';
import MessageScreen from './src/screens/MessageScreen/index';
import NotificationScreen from './src/screens/NotificationScreen/index';
import PostScreen from './src/screens/PostScreen/index';
import ProfileScreen from './src/screens/ProfileScreen/index';
import EditIntroScreen from './src/screens/EditIntroScreen/index';
import ListChoiceScreen from './src/screens/ListChoiceScreen/index';
import TimeLineScreen from './src/screens/TimeLineScreen/index';
import BackgroundScreen from './src/screens/BackgroundScreen/index';
import ListSkillScreen from './src/screens/ListSkillScreen/index';
import ListUniScreen from './src/screens/ListUniScreen/index';
import MessageDetailScreen from './src/screens/MessageDetailScreen/index';
import RequirementScreen from './src/screens/RequirementScreen/index';
import ListMatchedJobScreen from './src/screens/ListMatchedJobScreen/index';

//navigation packages
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Navigators
const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

//Redux
import { Provider } from 'react-redux';
import store from './src/redux/store/index';

//transition configs
const config = {
  animation: 'timing',
  config: {
    stiffness: 250,
    damping: 100,
    mass: 10,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.01,
  },
};


const App = () => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  //Chạy trong lần render đầu tiên 
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount

  }, []);

  //Auth flow
  const createAuthFlow = () => {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{
          headerShown: false
        }}></Stack.Screen>
        <Stack.Screen name="Loading" component={LoadingScreen} options={{
          headerShown: false
        }}></Stack.Screen>
        <Stack.Screen name="Register" component={RegisterScreen} options={{
          headerShown: false
        }}></Stack.Screen>
      </Stack.Navigator>
    );
  }

  //Bottom Tabs 
  const createBottomTabs = () => {
    const navigation = useNavigation();

    // useEffect(() => {
    //   const unsubscribe = navigation.addListener('tabPress', (e) => {
    //     e.preventDefault();
    //   });

    // }, [navigation]);

    return (
      <BottomTabs.Navigator
        screenOptions={
          ({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Home':
                  iconName = 'ios-home';
                  break;
                case 'Message':
                  iconName = 'ios-chatbubbles';
                  break;
                case 'Post':
                  iconName = 'ios-add-circle';
                  break;
                case 'Notification':
                  iconName = 'ios-notifications';
                  break;
                case 'Profile':
                  iconName = 'ios-person';
                  break;

                default:
                  break;
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })
        }
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          showLabel: false,
        }}
      >
        <BottomTabs.Screen name="Home" component={HomeScreen}></BottomTabs.Screen>
        <BottomTabs.Screen name="Message" component={MessageScreen}
          options={{
            tabBarBadge: 10
          }}
        ></BottomTabs.Screen>
        <BottomTabs.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name="ios-add-circle"
                size={55}
                color="#0099ff"
                style={{
                  elevation: 10
                }}
              ></Ionicons>
            )
          }}
          listeners={{
            tabPress: e => {
              //chặn mở tab post
              e.preventDefault();
              //mở màn hình PostScreen
              navigation.navigate('postModal')
            }
          }}
        ></BottomTabs.Screen>
        <BottomTabs.Screen name="Notification" component={NotificationScreen}
          options={{
            tabBarBadge: 6
          }}
        ></BottomTabs.Screen>
        <BottomTabs.Screen name="Profile" component={ProfileScreen}></BottomTabs.Screen>
      </BottomTabs.Navigator>
    );
  }

  const createAppFlow = () => {
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
      </Stack.Navigator>
    );
  }

  if (initializing) return null;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ?
            <Stack.Screen
              name="App" children={createAppFlow}
              options={{
                headerShown: false
              }}
            ></Stack.Screen>
            :
            <Stack.Screen
              name="Auth" children={createAuthFlow}
              options={{
                headerShown: false
              }}
            ></Stack.Screen>}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>


  );
};

export default App;
