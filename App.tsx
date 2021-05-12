
//Use Strict
import React, { useEffect, useState } from 'react';

//Firebase
import auth from '@react-native-firebase/auth';
import { onInitialFCMConfig } from './src/notifications/FCMHandler';

//Stacks
import { createAuthFlow } from './src/routes/AuthStack';
import { createDrawer } from './src/routes/DrawerStack';

//navigation packages
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Navigators
const Stack = createStackNavigator();

//Redux
import { Provider } from 'react-redux';
import store from './src/redux/store/index';

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
    onInitialFCMConfig();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);


  if (initializing) return null;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ?
            <Stack.Screen
              name="App" children={createDrawer}
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
            ></Stack.Screen>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>


  );
};

export default App;
