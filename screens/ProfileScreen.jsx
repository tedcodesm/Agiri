import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/Ip";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [token, setToken] = useState(null);

  const counties = [
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Lamu",
  "Garissa",
  "Wajir",
  "Mandera",
  "Marsabit",
  "Isiolo",
  "Meru",
  "Embu",
  "Kitui",
  "Machakos",
  "Makueni",
  "Nyandarua",
  "Nyeri",
  "Kirinyaga",
  "Murang'a",
  "Kiambu",
  "Turkana",
  "Samburu",
  "Nandi",
  "Baringo",
  "Laikipia",
  "Nakuru",
  "Narok",
  "Kajiado",
  "Kericho",
  "Bomet",
  "Kakamega",
  "Vihiga",
  "Bungoma",
  "Busia",
  "Siaya",
  "Kisumu",
  "Migori",
  "Kisii",
  "Nyamira",
  "Nairobi",
];

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error loading token:", error);
      }
    };
    loadToken();
  }, []);

  const fetchUser = async () => {
    if (!token) return;
    console.log("Fetching user with token:", token);
    try {
      const res = await axios.get(`${BASE_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      setUser(data);
      setUsername(data.username || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setLocation(data.location || "");
    } catch (error) {
      console.error("Error fetching user:", error.response || error);

      Alert.alert("Error", "Failed to fetch user info");
    }
  };

  const updateUser = async () => {
    if (!token) return;
    try {
      const res = await axios.put(
        `${BASE_URL}/auth/update`,
        { username, phone, location }, // body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
      if (res.status === 200) {
        Alert.alert("Success", data.message);

        const updatedUser = { ...user, username, phone, location };
        setUser(updatedUser);

        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  return (
    <View className="flex-1 flex-col items-start justify-start gap-10 w-full bg-white p-4">
      <View className="w-full flex-row px-4 items-center justify-between">
        <TouchableOpacity className="p-2 bg-green-600 rounded-full">
          <Icon name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-green-900">Profile</Text>
      </View>
      <View className="w-full h-px bg-gray-300 mb-4"></View>

      <View className="w-full flex-col gap-2">
        <Text className="font-bold text-xl">Username:</Text>
        <Text
          placeholder="Username"
          className="border border-gray-300 w-full p-4 bg-gray-300 rounded-lg"
        >
          {username}
        </Text>
      </View>
      <View className="w-full flex-col gap-2">
        <Text className="font-bold text-xl">Email:</Text>
        <Text
          placeholder="Email"
          className="border border-gray-300 w-full p-4 bg-gray-300 rounded-lg"
        >
          {email}
        </Text>
      </View>
      <View className="w-full flex-col gap-2">
        <Text className="font-bold text-xl">Phone:</Text>
        <Text
          placeholder="Phone"
          className="border border-gray-300 w-full p-4 bg-gray-300 rounded-lg"
        >
          {phone}
        </Text>
      </View>
      <View className="w-full flex-col gap-2">
        <Text className="font-bold text-xl">Location:</Text>
        <View className="border border-gray-300 w-full p-1 rounded-lg">
        <Picker
          selectedValue={location || ""}
          onValueChange={(itemValue) => setLocation(itemValue)}
        >
          <Picker.Item label="Select your county" value="" />
          {counties.map((county, index) => (
            <Picker.Item key={index} label={county} value={county} />
          ))}
        </Picker>
        </View>
      </View>

      <TouchableOpacity
        onPress={updateUser}
        className="bg-green-600 w-full p-4 rounded-lg"
      >
        <Text className="text-white text-center font-bold">Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePage;
