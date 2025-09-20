import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/Ip";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [token, setToken] = useState(null);

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
    try {
      const res = await axios.get(`${BASE_URL}/user`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      setUser(data);
      setUsername(data.username || "");
      setPhone(data.phone || "");
      setLocation(data.location || "");
    } catch (error) {
      console.error("Error fetching user:", error);
      Alert.alert("Error", "Failed to fetch user info");
    }
  };

const updateUser = async () => {
  if (!token) return;
  try {
    const res = await axios.put(
      `${BASE_URL}/user`,
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
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Profile</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />

      <Button title="Update Profile" onPress={updateUser} />

      {user && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>Current Info:</Text>
          <Text>Username: {user.username}</Text>
          <Text>Phone: {user.phone}</Text>
          <Text>Location: {user.location}</Text>
        </View>
      )}
    </View>
  );
};

export default ProfilePage;
