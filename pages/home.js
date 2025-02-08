import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const users = [
  { id: 1, name: "Alice", age: 22, image: require("../pages/assets/cake.jpg") },
  { id: 2, name: "Bob", age: 25, image: require("../pages/assets/finance.png") },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(!flipped);

  const handleNextUser = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handleFlip}>
        {flipped ? (
          <View style={styles.cardContent}>
            <Text style={styles.name}>{users[currentIndex].name}</Text>
            <Text style={styles.age}>{users[currentIndex].age} years old</Text>
          </View>
        ) : (
          <Image source={users[currentIndex].image} style={styles.image} />
        )}
      </TouchableOpacity>
      
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, styles.dislikeButton]} onPress={() => {
        handleNextUser(); 
        console.log("Disliked");
      }}>
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={() => {
        handleNextUser(); 
        console.log("Liked");
      }}>
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
    justifyContent: "center",
    alignItems: "center",
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
  },
  cardContent: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  age: {
    fontSize: 18,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
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
