import { collection, doc, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Avatar, Caption, Title, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";

const ProfileScreen = () => {
  const userData = useSelector((state) => state.auth);

  const [userInfo, setUserInfo] = useState(null);

  const userDocRef = collection(db, "users");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getDocs(userDocRef);

        const temp = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        const filteredData = temp.filter((user) => {
          return (
            user.email.toLowerCase() === userData?.user?.email.toLowerCase()
          );
        });

        if (filteredData && filteredData.length > 0) {
          setUserInfo(filteredData[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 30, marginBottom: 25, marginTop: 40 }}>
        <View style={{ flexDirection: "column" }}>
          <Avatar.Image
            source={{
              uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
            }}
            size={80}
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
              {userInfo && userData?.user?.email}
            </Title>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 15 }}>
              Phone
            </Text>
            <Title style={{ fontSize: 18, marginTop: 15 }}>
              {userInfo && userInfo?.phoneNumber}
            </Title>
            <Text style={{ fontSize: 20, marginTop: 15, fontWeight: "bold" }}>
              Address
            </Text>
            <Title style={{ fontSize: 18, marginTop: 15 }}>
              {userInfo && userInfo?.address}
            </Title>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
