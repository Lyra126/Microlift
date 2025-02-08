import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { IP_ADDRESS } from '@env';
import axios from 'axios';

const BusinessHome = () => {
  const [users, setUsers] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); 

  useEffect(() => {
    fetchUsers();
  }, []); 

  const fetchUsers = () => {
    console.log("Fetching users...");
    axios.get(`http://${IP_ADDRESS}:8080/users/getAll`)
      .then((response) => {
        console.log("Response data:", response.data);
        if (response.data && response.data.length > 0) {
          setUsers(response.data); 
        } else {
          console.log("No users found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const toggleExpansion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <FlatList
        data={users}  
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.profileContainer}>
            <View style={styles.profileHeader}>
            <Image source={require('./assets/finance.png')} style={styles.profileImage} /> {/* to be replaced with company's profile photo*/}
              <View style={styles.profileText}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.company}>Test Company</Text> {/* to be replaced with item.company */}
              </View>
            </View>

            {/* base info that every business owner sees */}
            <View style={styles.bioContainer}>
              <Text style={styles.bioTitle}>Description</Text>
              <Text style={styles.bioText}>{item.email || "No description available"}</Text>
            </View>

            {/* toggles extra details */}
            <TouchableOpacity onPress={() => toggleExpansion(index)} style={styles.toggleButton}>
              <Text style={styles.toggleButtonText}>
                {expandedIndex === index ? "Hide Details" : "Show Details"}
              </Text>
            </TouchableOpacity>

            {/* extra details if expanded -- TODO: INTEGRATE CORRECTLY WITH DATABASE */}
            {expandedIndex === index && (
              <>
                <View style={styles.bioContainer}>
                  <Text style={styles.bioTitle}>Verification</Text>
                  <Text style={styles.bioText}>{item.verification || "Not Verified"}</Text>
                </View>

                <View style={styles.bioContainer}>
                  <Text style={styles.bioTitle}>Description of Lender</Text>
                  <Text style={styles.bioText}>{item.description || "No description available"}</Text>
                </View>

                <View style={styles.bioContainer}>
                  <Text style={styles.bioTitle}>Goals</Text>
                  <Text style={styles.bioText}>{item.goals || "No goals defined"}</Text>
                </View>

                <View style={styles.bioContainer}>
                  <Text style={styles.bioTitle}>Maximum Amount Willing to Lend</Text>
                  <Text style={styles.bioText}>{item.maxAmount || "$0"}</Text>
                </View>

                <View style={styles.bioContainer}>
                  <Text style={styles.bioTitle}>Target Goal</Text>
                  <Text style={styles.bioText}>{item.targetGoal || "No target set"}</Text>
                </View>
              </>
            )}
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5E8D4", 
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    padding: 10,
  },
  backText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#2C6E49",
  },
  profileContainer: {
    backgroundColor: "#FFFFFF", 
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileText: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#2C6E49",
  },
  company: {
    fontSize: 16,
    color: "#555",
  },
  bioContainer: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  bioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#333",
  },
  bioText: {
    fontSize: 14,
    color: "#333",
  },
  toggleButton: {
    backgroundColor: "#A5D6A7", 
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%' 
  },
  toggleButtonText: {
    color: "#2C6E49",
    fontWeight: "bold",
    textAlign: "center",
    width: '100%' 
  },
  acceptButton: {
    backgroundColor: "#A5D6A7", 
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  acceptButtonText: {
    color: "#2C6E49",
    fontWeight: "bold",
  },
});

export default BusinessHome;
