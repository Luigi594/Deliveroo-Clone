import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon} from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice'

const DishRow = ({

    id, name, description, price, image

}) => {

  const [isPress, setIsPress] = useState(false);

  // for redux
  const dispatch = useDispatch();

  // grabing the items i have in my global store
  // I added this because I only want to increment the length of the items
  // for a single row of dish
  const items = useSelector((state) => selectBasketItemsWithId(state, id)); 

  // adding an item to the basket
  const addItemToBasket = () => {

    dispatch(addToBasket({
      id, name, description, price, image
    }));

  }

  // remove item from basket
  const removeItemFromBasket = () => {

    // if there are not items, shouldn't allow to remove something 
    // does not exist
    if(!items.length > 0) return;

    dispatch(removeFromBasket({ id }))

  }

  return (
    <>
    
      <TouchableOpacity onPress={() => setIsPress(!isPress)} 
      className={`bg-white border p-4 border-gray-200 ${
        isPress && "border-b-0"
      }`}>

        <View className="flex-row">
          <View className="flex-1 pr-2">  
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">L.{price}.00</Text>
          </View>
        
          <View>
            <Image 

              source={{
                uri: urlFor(image).url()
              }}

              className="h-20 w-20 bg-gray-300 p-4"
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4"
              }}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPress && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
              <MinusCircleIcon 

                color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}/>
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color={"#00CCBB"} size={40}/>
            </TouchableOpacity>
          </View>
        </View>
      )}

    </>
  )
}

export default DishRow