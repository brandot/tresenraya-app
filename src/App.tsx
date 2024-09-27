import React from 'react';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigators from './routes/StackNavigators';

export default function App() {
    return (
        <NavigationContainer>
            <StackNavigators />
        </NavigationContainer>
    );
}
