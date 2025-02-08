import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios'; 
import {IP_ADDRESS} from '@env'

const { width } = Dimensions.get("window");

const Home = ({ route }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loanAmount, setLoanAmount] = useState("");
  const [percentageCut, setPercentageCut] = useState("");
  const [error, setError] = useState("");
  const [borrowers, setBorrowers] = useState([]);

  useEffect(() => {
    //REMOVE
    setEmail("john@example.com");
    setBusinessName("Alice's Bakery");
  
    if (route.params && route.params.email) {
      setEmail(route.params.email);
    }
  
    fetchbBorrowers();
  }, [route.params]);


  console.log("IP_ADDRESS:", IP_ADDRESS);

  const fetchbBorrowers = () => {
    console.log("Fetching lenders...");
    axios.get(`http://${IP_ADDRESS}:8080/appdata/getBorrowers`)
      .then((response) => {
        console.log("Response data:", response.data);
        
        if (response.data && response.data.length > 0) {
          const borrowersData = response.data.map(borrower => ({
            name: borrower.name, 
            email: borrower.email,
            password: borrower.password,
            businessName: borrower.businessName,
            contributions: borrower.contributions,
            totalContributed: borrower.totalContributed,
            pendingLoans: borrower.pendingLoans,  
            confirmedLoans: borrower.confirmedLoans 
          }));
  
          setBorrowers(borrowersData);
        } else {
          console.log("No borrowers found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching borrowers:", error);
      });
  };

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

  const handleFlip = () => setFlipped(!flipped);

  const handleNextUser = () => {
    if (borrowers.length === 0) return;
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % borrowers.length);
  };  

  return (
    <View style={styles.container}>
      {borrowers.length > 0 && (
  <TouchableOpacity style={styles.card} onPress={handleFlip}>
    {flipped ? (
      <View style={styles.cardContent}>
        <Text style={styles.name}>{borrowers[currentIndex].name}</Text>
        <Text style={styles.age}>{borrowers[currentIndex].email}</Text>
      </View>
    ) : (
      <Text style={styles.businessName}>{borrowers[currentIndex].businessName}</Text>
    )}
  </TouchableOpacity>
)}


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
            <Text style={styles.modalTitle}>Lend to {borrowers[currentIndex].name}</Text>

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
