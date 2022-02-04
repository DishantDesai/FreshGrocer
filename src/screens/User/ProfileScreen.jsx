import { collection, doc, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar, Caption, Title, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../firebase/config";
import Header from "../../components/Header";

const ProfileScreen = () => {
  const userData = useSelector((state) => state.auth);

  const [userInfo, setUserInfo] = useState(null);

  const userDocRef = collection(db, "users");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getDocs(userDocRef);

        const temp = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.data().id,
        }));
        const filteredData = temp.find((user) => {
          return (
            user.id === userData?.user?.id || user.id === userData?.user?.uid
          );
        });
        setUserInfo(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 14,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: "white",
      }}
    >
      <Header
        hideCart
        hideProfile
        showPowerOff
        title="Profile"
        hidePlusIcon={true}
      />
      <View style={{ paddingHorizontal: 30, marginBottom: 25 }}>
        <View style={{ flexDirection: "column", marginTop: 30 }}>
          <Avatar.Image
            source={{
              uri: "https://i.ibb.co/k6Xcjwv/alexander-hipp-i-EEBWg-Y-6l-A-unsplash.jpg",
            }}
            size={80}
            style={{ alignSelf: "center" }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
              Name
            </Text>
            <Title style={{ fontSize: 18 }}>
              {userInfo && userInfo?.fullName}
            </Title>
            <Text style={{ fontSize: 20, marginTop: 15, fontWeight: "bold" }}>
              Email
            </Text>
            <Title style={{ fontSize: 18 }}>
              {userData?.user?.email ? userData?.user?.email : "NA"}
            </Title>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 15 }}>
              Phone
            </Text>
            <Title style={{ fontSize: 18, marginTop: 15 }}>
              {userInfo?.phoneNumber ? userInfo?.phoneNumber : "NA"}
            </Title>
            <Text style={{ fontSize: 20, marginTop: 15, fontWeight: "bold" }}>
              Address
            </Text>
            <Title style={{ fontSize: 18, marginTop: 15 }}>
              {userInfo?.address ? userInfo?.address : "NA"}
            </Title>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
