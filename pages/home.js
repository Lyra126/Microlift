import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const users = [
  { id: 1, name: "Alice", age: 22, image: require("../pages/assets/cake.jpg") },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          cards={users}
          renderCard={(card) => (
            <View style={styles.card}>
              <Image source={card.image} style={styles.image} />
              <Text style={styles.name}>{card.name}, {card.age}</Text>
            </View>
          )}
          onSwiped={(index) => setCurrentIndex(index + 1)}
          onSwipedAll={() => console.log("No more profiles")}
          cardIndex={currentIndex}
          backgroundColor="transparent"
          stackSize={3}
          containerStyle={{ alignItems: "center" }}
        />
      </View>

      {/* Buttons for Like and Dislike */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.dislikeButton]} 
          onPress={() => console.log("Disliked")}
        >
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.likeButton]} 
          onPress={() => console.log("Liked")}
        >
          <Ionicons name="heart" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingBottom: 50,
  },
  swiperWrapper: {
    flex: 3, 
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: -50, 
  },
  swiperContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    width: "100%",
  },
  card: {
    width: width * 0.85, 
    height: 420, 
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: "center", 
  },
  image: {
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  dislikeButton: {
    backgroundColor: "#ff4d4d",
  },
  likeButton: {
    backgroundColor: "#4caf50",
  },
});

export default Home;