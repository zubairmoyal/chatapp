import { View, Text, FlatList, Image, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavigationService from '../navigation/NavigationService'
import { MY_AUTH } from '../navigation/routes'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {}
const data = [
    {
        name: "Smith",
        id: 1,
        chatArr: [
            {
                from: 1,
                to: 2,
                message: "hello"
            },
            {
                from: 2,
                to: 1,
                message: "hii"
            }
        ],
        image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg'
    },
    {

        name: "John",
        id: 2,
        chatArr: [
            {
                from: 1,
                to: 2,
                message: "hello"
            },
            {
                from: 2,
                to: 1,
                message: "hii"
            }
        ],
        image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg'
    }

]


const Home = (props: Props) => {

    const onHandle = async (item: any) => {
        const res = await AsyncStorage.getItem('obj');
        if (res) {
            const parsedObj = JSON?.parse(res);
            NavigationService.navigate(MY_AUTH, { ...item, chatArr: parsedObj })
        } else {
            NavigationService.navigate(MY_AUTH, { ...item, chatArr: [] })
        }
    }

    const onReset = () => {
        AsyncStorage.removeItem('obj');
    }


    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => onHandle(item)}
                activeOpacity={0.9}
                style={{
                    marginHorizontal: 18,
                    marginBottom: 20,
                    height: 80,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: '#fff',
                    paddingHorizontal: 10
                }}>
                <Image
                    style={{ width: 60, height: 60, borderRadius: 30 }}
                    source={{ uri: item?.image }} />
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 15
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        letterSpacing: 2,
                        color: '#000000'
                    }}>{item?.name}</Text>

                </View>

            </TouchableOpacity>
        )
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#dddddd',
            paddingTop: 25
        }}>
            <FlatList
                data={data}
                renderItem={renderItem} />

            <TouchableOpacity
            activeOpacity={0.5}
                style={{
                    marginHorizontal: 18,
                    marginBottom: 20,
                    padding: 12,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: 'center',
                    backgroundColor: '#750000',
                }}
                onPress={onReset}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    letterSpacing: 2,
                    color: '#fff'
                }}>
                    RESET CHAT
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default Home