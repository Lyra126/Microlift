import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios'; 
import { IP_ADDRESS } from '@env'
import { useGlobal } from "./context/global";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const { globalState } = useGlobal();
  const { email } = globalState;  

  
  useEffect(() => {
    console.log('Current Global State:', globalState);  // logs global email and user type
    console.log(email);
  }, [globalState, email]);
  
  const [userData, setUserData] = useState({
    profileImage: require('./assets/finance.png'),
    name: "John Doe",
    company: "Temporary Company",
    goals: "Achieving financial independence and freedom.",
    maxAmount: "$50,000",
  });

  useEffect(() => {
    axios
      .get(`http://${IP_ADDRESS}:8080/appdata/getBorrowerByEmail?email=${email}`)
      .then((response) => {
        const requestData = response.data;
        // updates with global context / current user
        setUserData(prevData => ({
          ...prevData,
          name: requestData.name,
          company: requestData.businessName,
          email: requestData.email,
          pendingLoans: requestData.pendingLoans,
          loans: requestData.loans,
          confirmedLoans: requestData.confirmedLoans,
          goals: requestData.businessIdea,
          description: 'Entrepreneur starting an electronics company'
      }));
      }, )
      
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
      console.log(userData);
  }, []); 

  const handleEditChange = (field, value) => {
    setUserData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View style={styles.profileContainer}>
            <View style={styles.profileHeader}>
              <Image source={userData.profileImage} style={styles.profileImage} />
              <View style={styles.profileText}>
                {/* name and company cannot be edited */}
                <Text style={styles.name}>{userData.name}</Text>
                <Text style={styles.company}>{userData.company}</Text>
              </View>
            </View>


            <View style={styles.bioContainer}>
              <Text style={styles.bioTitle}>Email</Text>
              <Text style={styles.bioText}>{userData.email}</Text>
            </View>

            <View style={styles.bioContainer}>
              <Text style={styles.bioTitle}>Description of Lender</Text>
              {editing ? (
                <TextInput
                  style={styles.bioTextInput}
                  value={userData.description}
                  onChangeText={text => handleEditChange('description', text)}
                />
              ) : (
                <Text style={styles.bioText}>{userData.description}</Text>
              )}
            </View>

            

            <View style={styles.bioContainer}>
              <Text style={styles.bioTitle}>Goals</Text>
              {editing ? (
                <TextInput
                  style={styles.bioTextInput}
                  value={userData.goals}
                  onChangeText={text => handleEditChange('goals', text)}
                />
              ) : (
                <Text style={styles.bioText}>{userData.goals}</Text>
              )}
            </View>


            <View style={styles.bioContainer}>
              <Text style={styles.bioTitle}> Total Collected</Text>
              {editing ? (
                <TextInput
                  style={styles.bioTextInput}
                  value={userData.loans}
                  onChangeText={text => handleEditChange('loans', text)}
                />
              ) : (
                <Text style={styles.bioText}>${userData.loans}</Text>
              )}
            </View>



            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditing(!editing)}
            >
              <Text style={styles.editButtonText}>{editing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  bioTextInput: {
    fontSize: 14,
    color: "#333",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
  },
  nameInput: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#2C6E49",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
  },
  editButton: {
    backgroundColor: "#A5D6A7", 
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  editButtonText: {
    color: "#2C6E49",
    fontWeight: "bold",
  },
});

export default Profile;
