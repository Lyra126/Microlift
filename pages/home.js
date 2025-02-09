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
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState("");
  const [borrowers, setBorrowers] = useState([]);
  const [profilePic, profileImage] = useState("");
  const [businessIdea, setBusinessIdea] = useState("")


  useEffect(() => {

    if (route.params) {
      const { email } = route.params;
      setEmail(email);
    }
  
    fetchbBorrowers();
  }, [route.params, email, businessName]);


  const fetchbBorrowers = () => {
    axios.get(`http://${IP_ADDRESS}:8080/appdata/getBorrowers`)
      .then((response) => {
        
        if (response.data && response.data.length > 0) {
          const borrowersData = response.data.map(borrower => ({
            name: borrower.name, 
            email: borrower.email,
            password: borrower.password,
            businessName: borrower.businessName,
            businessIdea: borrower.businessIdea,
            contributions: borrower.contributions,
            totalContributed: borrower.totalContributed,
            pendingLoans: borrower.pendingLoans,  
            confirmedLoans: borrower.confirmedLoans, 
            profilePic: borrower.profileImage
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
    console.log(email, businessName);
    console.log(loanAmount, percentageCut);
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
    //updateDatabase(loanAmount, percentageCut);
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
              <Text style={styles.email}>{borrowers[currentIndex].email}</Text>
              <Text style={styles.businessIdea}>{borrowers[currentIndex].businessIdea}</Text>
            </View>
          ) : (
            <View style={styles.cardContent}>
              {/*console.log("Profile Pic URL:", borrowers[currentIndex].profilePic);*/}
              <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Arduino_ftdi_chip-1.jpg" }} style={styles.profilePic} />
              <Image 
              style={styles.profilePic} 
/>

              <Text style={styles.businessName}>{borrowers[currentIndex].businessName}</Text>
            </View>
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
          onPress={() => {
            setModalVisible(true);
            handleNextUser();
            console.log("Liked");
          }}
        >
          <Ionicons name="checkmark" size={32} color="white" />
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
          {/* <Text style={styles.modalTitle}>Lend to {borrowers[currentIndex].name}</Text> */}
            <TextInput
              placeholder="Enter loan amount"
              style={styles.input}
              keyboardType="numeric"
              value={loanAmount}
              onChangeText={setLoanAmount}
              placeholderTextColor="gray"
            />

            <TextInput
              placeholder="Enter percentage cut (%)"
              style={styles.input}
              keyboardType="numeric"
              value={percentageCut}
              onChangeText={setPercentageCut}
              placeholderTextColor="gray"
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.85,
    height: 420,
    borderRadius: 12,
    backgroundColor: "#f7eeeb",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  businessName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E7B5AC",
    fontFamily: "Outfit-Regular",
  },
  businessIdea: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginTop: 30,
    paddingHorizontal: 20,
    fontFamily: "Outfit-Regular",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E7B5AC",
    fontFamily: "Outfit-Regular",
    marginTop: -30,
  },
  email: {
    fontSize: 18,
    color: "black",
    fontFamily: "Outfit-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 40,
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
    backgroundColor: "#E7B5AC",
  },
  likeButton: {
    backgroundColor: "#869F77",
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
    borderColor: "gray",
    borderRadius: 8,
    borderWidth: 2,
    padding: 10,
    marginBottom: 15,
    color: "#333",
    fontFamily: "Outfit-Regular",
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Outfit-Regular",
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: -80,
  }
});

export default Home;