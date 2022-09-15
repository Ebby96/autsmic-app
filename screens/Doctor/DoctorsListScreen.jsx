import { Text, SafeAreaView,View, TouchableOpacity, TextInput, Pressable,Keyboard, FlatList } from 'react-native'
import {useState} from 'react'
import { Entypo,Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DoctorCard from '../../components/DoctorCard';
import data from '../../DoctorsData';
//List of available doctors
const DoctorsListScreen = () => {
    const navigation = useNavigation();
    const [search,setSearch] = useState('');
  return (
    <Pressable onPress={()=>Keyboard.dismiss()} className="flex-1 bg-[#131111]">
        
        <View className="w-full bg-gray-800 pt-16 space-y-3 pb-6 rounded-b-[60px] relative">
            <TouchableOpacity className="absolute top-14 ml-4" onPress={()=>navigation.goBack()}>
                <Ionicons name="arrow-back-circle-outline" size={32} color="lightgray" />
            </TouchableOpacity>
            <Text className="text-white text-3xl font-semibold text-center">Our Certified Doctors</Text>
            <Text className="text-white text-2xl tracking-wider text-center">You can choose any doctor and can get guidance from home.</Text>
            <View className="flex-row items-center justify-center ">
                <View className="bg-gray-500 flex-row items-center pl-2 pr-5 rounded-lg">
                    <Entypo name="location-pin" size={35} color="white" />
                    <Text className="text-2xl text-white">Heidelberg</Text>
                </View>
            </View>
        </View>

        <View className="w-full flex-row justify-center">
            <View className="flex-row items-center bg-white my-4 py-1 rounded-xl px-2 w-8/12">
                <Ionicons name="search" size={24} color="black" />
                <TextInput value={search} onChangeText={setSearch} className="flex-1 pl-2" placeholder="Search for Doctors" />
            </View>
        </View>

        <View className="mx-5">
            <FlatList key={(item)=>item.id} data={data} renderItem={({item})=>(<DoctorCard withRate={true} doctor={item} />)} />
        </View>

    </Pressable>
  )
}

export default DoctorsListScreen