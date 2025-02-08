import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useGlobal } from './context/global';
import axios from 'axios'; 
import { IP_ADDRESS } from '@env'

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const { globalState } = useGlobal();
  
  useEffect(() => {
    console.log('Current Global State:', globalState);  // logs global email and user type
  }, [globalState]);
  
  const [userData, setUserData] = useState({
    profileImage: require('./assets/finance.png'),
    name: "John Doe",
    company: "Temporary Company",
    verification: "Verified",
    description: "An experienced lender in the financial industry.",
    goals: "Help borrowers achieve financial independence.",
    maxAmount: "$50,000",
    targetGoal: "100 loans per year"
  });

  useEffect(() => {
    axios
      .get(`http://${IP_ADDRESS}:8080/users/getUserByEmail?email=${globalState.email}`)
      .then((response) => {
        const requestData = response.data;
        // updates with global context / current user
        setUserData(prevData => ({
          ...prevData,
          name: requestData.name,
          company: requestData.businessName,
          verification: requestData.verification,
          description: requestData.description,
          goals: requestData.goals,
          maxAmount: requestData.maxAmount,
          targetGoal: requestData.targetGoal
        }));
      }, )
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
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
              <Text style={styles.bioTitle}>Verification</Text>
              <Text style={styles.bioText}>{userData.verification}</Text>
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
              <Text style={styles.bioTitle}>Company</Text>
              {editing ? (
                <TextInput
                  style={styles.bioTextInput}
                  value={userData.company}
                  onChangeText={text => handleEditChange('company', text)}
                />
              ) : (
                <Text style={styles.bioText}>{userData.company}</Text>
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
              <Text style={styles.bioTitle}>Maximum Amount Willing to Lend</Text>
              {editing ? (
                <TextInput
                  style={styles.bioTextInput}
                  value={userData.maxAmount}
                  onChangeText={text => handleEditChange('maxAmount', text)}
                />
              ) : (
                <Text style={styles.bioText}>{userData.maxAmount}</Text>
              )}
            </View>

            <View style={styles.bioContainer}>
              <Text style={styles.bioTitle}>Target Goal</Text>
              {editing ? (
                <TextInput
                  style={styles.bioTextInput}
                  value={userData.targetGoal}
                  onChangeText={text => handleEditChange('targetGoal', text)}
                />
              ) : (
                <Text style={styles.bioText}>{userData.targetGoal}</Text>
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
