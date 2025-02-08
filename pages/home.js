//make sure to use: npm install react-native-deck-swiper

import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-deck-swiper";

const users = [
  { id: 1, name: "Alice", age: 22, image: "./assets/cake.jpg" },
];

const Home= () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Swiper
        cards={users}
        renderCard={(card) => (
          <View style={styles.card}>
            <Image source={{ uri: card.image }} style={styles.image} />
            <Text style={styles.name}>{card.name}, {card.age}</Text>
          </View>
        )}
        onSwiped={(index) => setCurrentIndex(index + 1)}
        onSwipedAll={() => console.log("No more profiles")}
        cardIndex={currentIndex}
        backgroundColor="transparent"
        stackSize={3}
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.dislikeButton]} onPress={() => console.log("Disliked")}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={() => console.log("Liked")}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  card: {
    width: 300,
    height: 400,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 20,
    elevation: 5,
  },
  dislikeButton: {
    backgroundColor: "#ff4d4d",
  },
  likeButton: {
    backgroundColor: "#4caf50",
  },
  buttonText: {
    fontSize: 30,
    color: "#fff",
  },
});

export default Home;
