import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

const businessHome = () => {
  const bioData = Array(5).fill({
    profileImage: '', // placeholder
    name: "John Doe",
    company: "Temporary Company",
    verification: "Verified",
    description: "An experienced lender in the financial industry.",
    goals: "Help borrowers achieve financial independence.",
    maxAmount: "$50,000",
    targetGoal: "100 loans per year"
  });

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpansion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <FlatList
        data={bioData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.profileContainer}>
            <View style={styles.profileHeader}>
              <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
              <View style={styles.profileText}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.company}>{item.company}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => toggleExpansion(index)} style={styles.toggleButton}>
              <Text style={styles.toggleButtonText}>{expandedIndex === index ? "Hide Details" : "Show Details"}</Text>
            </TouchableOpacity>

            {expandedIndex === index && (
              <>
                <View style={styles.bioContainer}>
                  <Text style={styles.bioTitle}>Verification</Text>
                  <Text style={styles.bioText}>{item.verification}</Text>
                </View>

                <View style={styles.bioContainer}>
                  <Text style={styles.bioTitle}>Description of Lender</Text>
                  <Text style={styles.bioText}>{item.description}</Text>
                </View>

                <View style={styles.bioContainer}>
                  <Text style={styles.bioTitle}>Company</Text>
                  <Text style={styles.bioText}>{item.company}</Text>
                </View>

                <View style={styles.bioContainer}>
                  <Text style={styles.bioTitle}>Goals</Text>
                  <Text style={styles.bioText}>{item.goals}</Text>
                </View>

                <View style={styles.bioContainer}>
                  <Text style={styles.bioTitle}>Maximum Amount Willing to Lend</Text>
                  <Text style={styles.bioText}>{item.maxAmount}</Text>
                </View>

                <View style={styles.bioContainer}>
                  <Text style={styles.bioTitle}>Target Goal</Text>
                  <Text style={styles.bioText}>{item.targetGoal}</Text>
                </View>

                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
              </>
            )}
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

export default businessHome;
