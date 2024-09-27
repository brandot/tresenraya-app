import { View, StyleSheet, Text, Image } from 'react-native';
import React from 'react';
import ButtonComponents from '../components/ButtonComponents';
import SquareComponent from '../components/SquareComponent';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import GameServices from '../services/GameServices';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ParamsGame, RootStackParams } from '../routes/StackNavigators';

const GameScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const params = useRoute<RouteProp<RootStackParams>>().params;

    const defaultParams: ParamsGame = {
        userName: '',
        userNameBot: '',
        userSelection: '',
        botSelection: '',
        initialTurnUser: false,
        initialTurnBot: false,
    };
    const {initGame, newGame, onSelected, turnUser, scoreUser, scoreBot} = GameServices(params ?? defaultParams);

    const onEndGame = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
        });
    };

    return (
        <View style={styles.game}>
            <View style={styles.opciones}>
                <View style={styles.puntaje}>
                    <Text style={styles.tipo}>{params?.userSelection}</Text>
                    <Text style={styles.dato}>{params?.userName}: {scoreUser}</Text>
                </View>
                <Text style={styles.versus}>VS</Text>
                <View style={styles.puntaje}>
                    <Text style={styles.tipo}>{params?.botSelection}</Text>
                    <Text style={styles.dato}>{params?.userNameBot}: {scoreBot}</Text>
                </View>
            </View>
            <View style={styles.turno}>
                <Text style={{fontSize: 18, color: Colors.textColor}}>Es turno de: {turnUser ? params?.userName : params?.userNameBot}</Text>
                {!turnUser ? <Image source={require('../../assets/processing.gif')} style={{width: 16, height: 16, marginLeft: 5}} /> : null}
            </View>
            <View style={styles.squares}>
                {initGame?.length ? initGame.map(item => {
                    return(
                        <SquareComponent key={item.id} label={item.optionGame} onSelected={() => onSelected(item)} />
                    );
                }) : null}
            </View>
            <ButtonComponents label={Strings.newgame} onPressFunc={newGame} />
            <ButtonComponents
                label={Strings.endgame}
                onPressFunc={onEndGame}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    game: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
    },
    squares: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '80%',
        margin: 20,
        backgroundColor: Colors.secondaryColor,
        padding: 5,
        borderRadius: 10,
    },
    opciones: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
    },
    puntaje: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        borderWidth: 1,
        borderColor: Colors.textColor,
        width: 130,
        padding: 5,
        borderRadius: 10,
    },
    tipo: {
        fontSize: 35,
        fontWeight: 'bold',
        color: Colors.textColor,
        margin: 3,
    },
    dato: {
        fontSize: 15,
        color: Colors.textColor,
        margin: 5,
    },
    versus: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textColor,
    },
    turno: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
    },
});

export default GameScreen;
