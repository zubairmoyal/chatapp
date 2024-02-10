import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NavigationService from '../navigation/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Myauth = ({ route }: any) => {
    const { image, name, id, chatArr } = route?.params;

    const [listArr, setListArr] = useState(chatArr);
    const [saveMessage, setSaveMessage] = useState('');

    const onHandle = async () => {
        try {
            if (saveMessage !== '') {
                let sendObj = {
                    from: id,
                    to: id === 1 ? 2 : 1,
                    message: saveMessage,
                };
                setListArr((prev: any) => [...prev, sendObj]);
                await AsyncStorage.setItem('obj', JSON.stringify([...listArr, sendObj]));
            }
            setSaveMessage('');
        } catch (error) {
            console.error('Error saving data to AsyncStorage:', error);
        }
    };



    return (
        <View style={{ flex: 1 }}>
            <View style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#BDAA90',
                paddingVertical: 15
            }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => NavigationService?.goBack()}>
                    <Image
                        style={{
                            width: 20,
                            height: 20
                        }} source={require('../../assets/arrow.png')} />
                </TouchableOpacity>
                <View style={{
                    marginLeft: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Image style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20
                    }} source={{ uri: image }} />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '900',
                        marginLeft: 12
                    }}>{name}</Text>
                </View>
            </View>
            <ScrollView style={{ flex: 1, }}>
                {listArr?.map((item: any, index: any) => {
                    return (
                        <View style={{
                            marginTop: 15,
                            marginHorizontal: 13,
                            height: 30,
                            minWidth: "15%",
                            backgroundColor: '#D3D3D3',  //fffee0
                            borderRadius: 20,
                            paddingHorizontal: 15,
                            justifyContent: 'center',
                            alignSelf: item?.from == id ? 'flex-end' : 'flex-start',
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: '#000000',
                                letterSpacing: 1,
                            }} >{item?.message}</Text>
                        </View>
                    )
                })}
            </ScrollView>
            <TextInput
                value={saveMessage}
                onChangeText={(text) => setSaveMessage(text)}
                placeholder='Type your message...'
                style={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 8,
                    margin: 10
                }} />
            <TouchableOpacity
                onPress={onHandle}
                activeOpacity={0.5}
                style={{
                    padding: 12,
                    borderRadius: 8,
                    margin: 10,
                    backgroundColor: 'green',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '900',
                    color: '#fff',
                    letterSpacing: 2
                }}>SEND</Text>
            </TouchableOpacity>

        </View>

    );
};

export default Myauth;
