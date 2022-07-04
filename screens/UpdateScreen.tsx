import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { AsyncStorage, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { RootStackParams } from '../App';
import { todoList } from '../atom/atom';
import { item } from './HomeScreen';

type Props = NativeStackScreenProps<RootStackParams, 'Update'>

const UpdateScreen = ({route}: Props) => {
    const [textInput, setTextInput] = useState();
    const [list3, setList3] = useState({id: 1, title: 'a'});
    const [List, setList] = useRecoilState(todoList);
    const navigation = useNavigation();
    console.log('index', route.params.index)
    console.log('id', route.params.id)
    const setAsyncList = async (value:string) => {
        try {
          const listJson = JSON.stringify(value)
          await AsyncStorage.setItem('list', listJson)
        } catch(e) {
        }
      
        console.log('Done.')
      }
  
    const editItem = () => {
      const list2 = [...List];
      list2[route.params.index] = list3;
      setAsyncList(list2.toString())
      console.log('update', list2)
      navigation.goBack();
      setList(list2);
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          defaultValue={route.params.title}
          style={styles.textInput}
          onChangeText={newText => setList3({id: route.params.id, title: newText})}
          value={textInput}
        />
        <Text>{textInput}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={editItem} style={styles.touchable}>
            <Text style={{fontSize: 16}}>Save</Text>
          </TouchableOpacity>
          <TouchableHighlight
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.touchable}>
            <Text style={{fontSize: 16}}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E6E6FA',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    textInput: {
      height: 50,
      width: '80%',
      borderRadius: 15,
      borderWidth: 2,
      borderColor: 'black',
      padding: 6,
      marginBottom: 40,
    },
    touchable: {
      height: 50,
      width: 120,
      borderRadius: 10,
      backgroundColor: '#FFA07A',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20,
    },
  });
  export default UpdateScreen;