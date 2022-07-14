import { View, SafeAreaView, Image, Text, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserIcon, ChevronDownIcon, SearchIcon, AdjustmentsIcon } from "react-native-heroicons/outline"
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'

const HomeScreen = () => {

  const navigation = useNavigation();

  /** this function is for as soon as the screen apears
   * do the following:
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false // don't show the header
    })
  }, []);

  return (    
    <SafeAreaView className="bg-white pt-10">
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image source={{
          uri: "https://links.papareact.com/wru",
        }} 
        
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-sm">Deliver Now</Text>
          <Text className="font-bold text-xl">Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB"/>
      </View>

      {/** Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <SearchIcon color="#00CCBB" size={20} />
          <TextInput
            placeholder='Restaurants and cuisines'
            keyboardType={"default"}
          />
        </View>

        <AdjustmentsIcon color="#00CCBB"/>
      </View>

      {/** Body Content */}
      <ScrollView className="bg-gray-100"
      contentContainerStyle={{
        paddingBottom: 100
      }}>

        {/** Categories Component*/}
        <Categories />

        {/** Featueres Row */}
        <FeaturedRow 
        
          id="Testing123"
          title="Featured"
          description="Paid placements from our partners"
        >

        </FeaturedRow>

         {/** Tasty Discount Row */}
         <FeaturedRow 
        
          id="Testing123"
          title="Tasty Discount"
          description="Paid placements from our partners"
        >

        </FeaturedRow>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen