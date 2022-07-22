import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurant } from '../features/restaurantSlice';
import { useSelector, useDispatch } from 'react-redux'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';

const BasketScreen = () => {

  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  /** if the value of items did not change it won't recompute the value put it*/
  useMemo(() => {

    // compacting all the items into an array
    // if i have 4 items from a dish i don't want to see 4
    // times that dish, what this is doing is to put it into a group
    const groupedItems = items.reduce((result, item) => {

        (result[item.id] = result[item.id] || []).push(item);
        return result;
    },{});

    setGroupedItemsInBasket(groupedItems);

  }, [items])  

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-sm">
            <View>
                <Text className="text-lg font-bold text-center">Basket</Text>
                <Text className="text-center text-gray-400">
                    {restaurant.title}
                </Text>
            </View>

            <TouchableOpacity onPress={navigation.goBack}
                className="rounded-full bg-gray-100 absolute top-2 right-5">
                <XCircleIcon color={"#00CCBB"} height={50} width={50}/>
            </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
            <Image source={{
            uri: "https://links.papareact.com/wru",
            }}

                className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />

            <Text className="flex-1">Deliver in 50-75 min</Text>
            <TouchableOpacity>
                <Text className="text-[#00CCBB]">Change</Text>
            </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
            {Object.entries(groupedItemsInBasket).map(([key, item]) => (

                <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                    <Text className="text-[#00CCBB]">{item.length} x</Text>
                    <Image
                    
                        source={{
                            uri: urlFor(item[0]?.image).url()
                        }}

                        className="h-12 w-12 rounded-full"
                    />

                    <Text className="flex-1">{item[0]?.name}</Text>

                    <Text className="text-gray-600">
                        L.{item[0]?.price}.00
                    </Text>

                    <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key}))}>
                        <Text className="text-[#00CCBB] text-xs">
                            Remove
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
            <View className="flex-row justify-between">
                <Text className="text-gray-400">Subtotal</Text>
                <Text className="text-gray-400">L.{basketTotal}.00</Text>
            </View>

            <View className="flex-row justify-between">
                <Text className="text-gray-400">Delivery Feed</Text>
                <Text className="text-gray-400">L.5.99</Text>
            </View>

            <View className="flex-row justify-between">
                <Text>Order Total</Text>
                <Text className="font-extrabold">L.{basketTotal + 5.99}</Text>
            </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen