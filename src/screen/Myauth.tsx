import { useEffect, useRef, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NavigationService from '../navigation/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Myauth = ({ route }: any) => {
    const { image, name, id, chatArr } = route?.params;

    const [listArr, setListArr] = useState(chatArr);
    const [saveMessage, setSaveMessage] = useState('');
    const [canSendMessage, setCanSendMessage] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const scrollViewRef = useRef<any>(null);


    const onHandle = async () => {
        try {
            if (saveMessage !== '' || canSendMessage) {
                let sendObj = {
                    from: id,
                    to: id === 1 ? 2 : 1,
                    message: saveMessage,
                };
                setListArr((prev: any) => [...prev, sendObj]);
                await AsyncStorage.setItem('obj', JSON.stringify([...listArr, sendObj]));

                setCanSendMessage(false);
                setTimeRemaining(10);
                const interval = setInterval(() => {
                    setTimeRemaining(prevTime => {
                        if (prevTime === 0) {
                            setCanSendMessage(true);
                            clearInterval(interval);
                        }
                        return prevTime - 1;
                    });
                }, 1000);
            } else if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
            setSaveMessage('');
        } catch (error) {
            console.error('Error saving data to AsyncStorage:', error);
        }
    };

    useEffect(() => {
        let interval: any;
        if (timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timeRemaining]);


    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [listArr]);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.firstContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => NavigationService?.goBack()}>
                    <Image
                        style={{
                            width: 20,
                            height: 20
                        }} source={require('../../assets/arrow.png')} />
                </TouchableOpacity>
                <View style={styles.secound}>
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
            <ScrollView ref={scrollViewRef} style={{ flex: 1, }}>
                {listArr?.map((item: any, index: any) => {
                    return (
                        <View style={[styles.listArrFirst, { alignSelf: item?.from == id ? 'flex-end' : 'flex-start', }]}>
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
            {!canSendMessage && <Text style={styles.timeIndicator}>{timeRemaining === 0 ? 'Ready to send a message!' : `Next message in ${timeRemaining}s`}</Text>
            }

            <TextInput
                value={saveMessage}
                onChangeText={(text) => setSaveMessage(text)}
                placeholder='Type your message...'
                placeholderTextColor={'black'}
                style={styles.input}
                onFocus={() => {
                    if (scrollViewRef.current) {
                        scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                }} />
            <TouchableOpacity
                disabled={!canSendMessage}
                onPress={onHandle}
                activeOpacity={0.5}
                style={[styles.sendButton, { backgroundColor: !canSendMessage ? 'gray' : 'green', }]}>
                <Text style={styles.sendText}>SEND</Text>
            </TouchableOpacity>

        </View>

    );
};

const styles = StyleSheet.create({
    firstContainer: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#BDAA90',
        paddingVertical: 15
    },
    secound: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listArrFirst: {
        marginTop: 15,
        marginHorizontal: 13,
        height: 30,
        minWidth: "15%",
        backgroundColor: '#D3D3D3',  //fffee0
        borderRadius: 20,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    timeIndicator: {
        marginTop: 10,
        marginLeft: 15,
        color: 'red',
    },
    input: {
        padding: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        margin: 10,
        color: '#000000'
    },
    sendButton: {
        padding: 12,
        borderRadius: 8,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 2
    }
});

export default Myauth;
