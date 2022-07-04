import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { AsyncStorage, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import { useRecoilState } from 'recoil'
import { todoList } from '../atom/atom'
import { item } from './HomeScreen'
interface Props {
    title: string
}
let id = 0;
function getID(){
    var id = Math.floor(Math.random() * 100) + 1 ;
    return id;
}

interface PropsTodo {
    setTodoListProp: React.Dispatch<React.SetStateAction<item[]>>;
    todoListProp: item[];
  }
const Add:React.FC<item> =({id, title}) => {
    const navigation = useNavigation()
    const [List, setList] = useRecoilState(todoList)
    const [textInput, setTextInput] = useState<string>("")

    const setAsyncList = async (value:string) => {
        try {
          const listJson = JSON.stringify(value)
          await AsyncStorage.setItem('list', listJson)
        } catch(e) {
        }
      
        console.log('Done.')
      }

    const addItem = () => {
        console.log('textInput', textInput)
        const newTodoList:Array<item> = [...List, {id: getID(), title: textInput}]
        console.log('list add', newTodoList)
        setAsyncList(newTodoList.toString())
        navigation.goBack()
        // getAsyncList()
        setList(newTodoList)
    }

    return (
        <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(newText) => setTextInput(newText)}
        />
        <Text>{textInput}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight 
            onPress={addItem}
            style={styles.touchable}>
            <Text style={{ fontSize: 16 }}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            onPress={() => {
                navigation.goBack()
            }}
            style={styles.touchable}>
            <Text style={{ fontSize: 16 }}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E6E6FA",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      },
      textInput: {
        height: 50,
        width: "80%",
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "black",
        padding: 6,
        marginBottom: 40,
      },
      touchable: {
        height: 50,
        width: 120,
        borderRadius: 10,
        backgroundColor: "#FFA07A",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20
      },
})
export default Add