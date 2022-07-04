import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  Alert,
  AsyncStorage,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import { RootStackParams } from '../App';
import {todoList} from '../atom/atom';
export interface item {
    id: number,
    title: string,
}
interface itemDemo {
    id: number,
    title: string,
    index: number,
}
let IS_MOUNTED = false;
const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [List, setList] = useRecoilState(todoList);

  const setAsyncList = async (value:string) => {
    try {
      const listJson = JSON.stringify(value)
      await AsyncStorage.setItem('list', listJson)
    } catch(e) {
    }
  
    console.log('Done.')
  }

  const getAsyncList = async () => {
    try {
      const listJson = await AsyncStorage.getItem('list') || '';
      const list:Array<item> = JSON.parse(listJson);
      setList(list);
      console.log('aaa', list)
      // setListDemo(list)
      console.log('get Data done', list);
      return list
      
    } catch (e) {}
  };

  useEffect(() => {
    IS_MOUNTED = true;
    // setListDemo(List)
    getAsyncList()
    return () => {
      IS_MOUNTED = false;
    };
  }, []);

  const deleteItem = (todoId: number) => {
    const newTodoList = List.filter(item => item.id != todoId);
    setAsyncList(newTodoList.toString())
    //not
    // getAsyncList()
    // console.log('list', getAsyncList())
    setList(newTodoList);
  };

  const ListItem:React.FC<itemDemo> = ({id, title, index}) => {
    return (
      <View style={styles.itemList}>
        <View style={{flex: 4}}>
          <Text style={{color: 'black', fontSize: 20}}>{title}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('Update', {id: id, title: title, index: index});
            }}>
            <Image
              style={{height: 35, width: 35}}
              source={require('../assets/edit_icon.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              Alert.alert('Alert Title', 'My Alert Msg', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => deleteItem(id),
                },
              ]);
            }}>
            <Image
              style={{height: 35, width: 35}}
              source={require('../assets/remove_icon.png')}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 7}}>
        <FlatList
          style={{flex: 1}}
          data={List}
          renderItem={({item, index}) => (
            <ListItem id={item.id} title={item.title} index={index}/>
          )}
          keyExtractor={(item,index) => index.toString()}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* <TouchableHighlight onPress={null} style={styles.touchable}>
            <Text style={{ fontSize: 16, color: "black" }}>Save Data</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={null} style={styles.touchable}>
            <Text style={{ fontSize: 16, color: "black" }}>Load data</Text>
          </TouchableHighlight> */}
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('Add');
          }}
          style={styles.touchable}>
          <Text style={{fontSize: 16, color: 'black'}}>Add</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
  },
  touchable: {
    height: 70,
    width: 70,
    borderRadius: 50,
    backgroundColor: '#FFA07A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemList: {
    padding: 20,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFA07A',
  },
});
export default Home;
