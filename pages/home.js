import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios'; 
import {IP_ADDRESS} from '@env'

const { width } = Dimensions.get("window");
const users = [
  { id: 1, name: "Alice", age: 22, image: require("../pages/assets/cake.jpg") },
  { id: 2, name: "Bob", age: 25, image: require("../pages/assets/finance.png") },
];

const Home = ({ route }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loanAmount, setLoanAmount] = useState("");
  const [percentageCut, setPercentageCut] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");

  const handleFlip = () => setFlipped(!flipped);

  const handleNextUser = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  useEffect(() => {
    //REMOVE
    setEmail("john@example.com")
    setBusinessName("Alice's Bakery")
    if (route.params) {
      const { email } = route.params;
      setEmail(email);
    }
  }, [route.params]);

  const updateDatabase = (loanAmount, percentageCut) => {
    axios
      .post(`http://${IP_ADDRESS}:8080/appdata/updateLenderPendingLoans`, {
          email: email,        // lender's email
          businessName: businessName, // business name associated with the loan
          loan: loanAmount, // loan amount
          cut: percentageCut, // cut percentage
      })
      .then((response) => {
          console.log("Database updated:", response.data);
      })
      .catch((error) => {
          console.error("Error updating database for lender", error);
      });

      axios
      .post(`http://${IP_ADDRESS}:8080/appdata/updateBorrowerPendingLoans`, {
          email: email,        // lender's email
          businessName: businessName, // business name associated with the loan
          loan: loanAmount, // loan amount
          cut: percentageCut, // cut percentage
      })
      .then((response) => {
          console.log("Database updated:", response.data);
      })
      .catch((error) => {
          console.error("Error updating database for borrower", error);
      });
  };

  const handleSubmit = () => {
    const amount = parseFloat(loanAmount);
    const cut = parseFloat(percentageCut);

    if (!amount) {
      setError("Loan amount cannot be 0.")
      return;
    }
    if (!cut) {
      setError("Percentage cut cannot be 0.")
      return;
    }
    updateDatabase(loanAmount, percentageCut);
    setModalVisible(false);
    setLoanAmount("");
    setPercentageCut("");
    setError("");
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
        <TouchableOpacity
          style={[styles.button, styles.dislikeButton]}
          onPress={() => {
            handleNextUser();
            console.log("Disliked");
          }}
        >
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.likeButton]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="heart" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lend to {users[currentIndex].name}</Text>

            <TextInput
              placeholder="Enter loan amount"
              style={styles.input}
              keyboardType="numeric"
              value={loanAmount}
              onChangeText={setLoanAmount}
              placeholderTextColor="#A9A9A9" // Dark Gray
            />

            <TextInput
              placeholder="Enter percentage cut (%)"
              style={styles.input}
              keyboardType="numeric"
              value={percentageCut}
              onChangeText={setPercentageCut}
              placeholderTextColor="#A9A9A9" // Dark Gray
            />
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.dislikeButton]}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.likeButton]}
                onPress={handleSubmit}
              >
                <Ionicons name="checkmark" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
},
});

export default Home;
