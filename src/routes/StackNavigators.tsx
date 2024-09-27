import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Strings from '../constants/Strings';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import { ParamsGame } from '../interfaces/GlobalInterfaces';

export type RootStackParams = {
    HomeScreen: undefined,
    GameScreen: ParamsGame | undefined
}

const Stack = createStackNavigator<RootStackParams>();

const StackNavigators = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerTitle: Strings.title,
            headerTitleStyle: { color: Colors.textColor },
            headerStyle: { backgroundColor: Colors.primaryColor, elevation: 0, shadowColor: 'transparent' },
        }}
    >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigators;
