import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { IP_ADDRESS } from '@env';
import axios from 'axios';

const BusinessHome = ({ route }) => {
  const [lenders, setLenders] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); 
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [pendingLoans, setPendingLoans] = useState([]);
  const [lenderEmails, setLenderEmails] = useState([]);


  

    useEffect(() => {
      
      if (route.params) {
        const { email } = route.params;
        setEmail(email);
      }
      fetchPendingLoans();
    }, [route.params, email]);

    


    const fetchPendingLoans = async () => {
  
      try {
        // First axios call - fetching pending loans


        const pendingLoansResponse = await axios.get(`http://${IP_ADDRESS}:8080/appdata/getBorrowerByEmail?email=${email}`);
        setPendingLoans(pendingLoansResponse.data.pendingLoans);
        setBusinessName(pendingLoansResponse.data.businessName);
    
        const emails = pendingLoansResponse.data.pendingLoans.map(loan => loan.email);
        setLenderEmails(emails);
    
        // Second axios call - fetching lenders only after the first call is done
        const lendersResponse = await axios.get(`http://${IP_ADDRESS}:8080/appdata/getLenders`);
    
        const allEmails = lendersResponse.data.map(lender => lender.email);
    
        if (lendersResponse.data && lendersResponse.data.length > 0) {
          const lendersData = lendersResponse.data
            .filter(lender => lenderEmails.includes(lender.email))
            .map(lender => {
              // Filter pendingLoans based on businessName
              const filteredLoans = lender.pendingLoans.filter(loan => loan.businessName === businessName);
       
              
              // Map through the filtered loans to get the loan and cut values
              const loanDetails = filteredLoans.map(loan => ({

                loanAmount: loan.loan,  // Extract loan value
                cut: loan.cut  // Extract cut value
              }));
             
              loanDetails.forEach(loan => {
                console.log(`Loan Amount: ${loan.loanAmount}, Cut: ${loan.cut}`);
              });
              const firstLoan = loanDetails[0] || {};
              return {
                name: lender.name,
                email: lender.email,
                password: lender.password,
                businessName: lender.businessName,
                contributions: lender.contributions,
                totalContributed: lender.totalContributed,
                pendingLoans: loanDetails,  // Set the extracted loan details
                confirmedLoans: lender.confirmedLoans || [],  // Default to an empty array if not present
                loanAmount: firstLoan.loanAmount || null,
                cut: firstLoan.cut || null,
              };
            });

    

          // Set the lenders state
          setLenders(lendersData);
        } else {
          console.log("No lenders found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

  const acceptLoan = (email, businessName) => {
    console.log(email);
    console.log(businessName);
    axios
      .post(`http://${IP_ADDRESS}:8080/appdata/updateLenderConfirmedLoans`, {
          email: email,        // lender's email
          businessName: businessName, // business name associated with the loan

      })
      .then((response) => {
          console.log("Database updated:", response.data);
      })
      .catch((error) => {
          console.error("Error updating database for borrower", error);
      });

      axios
      .post(`http://${IP_ADDRESS}:8080/appdata/updateBorrowerConfirmedLoans`, {
          email: email,        // lender's email
          businessName: businessName, // business name associated with the loan
      })
      .then((response) => {
          console.log("Database updated:", response.data);
      })
      .catch((error) => {
          console.error("Error updating database for borrower", error);
      });

      setLenders((prevLenders) => {
        return prevLenders.filter(
          (lender) =>
            !(lender.email === email && lender.businessName === businessName)
        );
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
        data={lenders}  
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.profileContainer}>
            <View style={styles.profileHeader}>
            <Image source={require('./assets/finance.png')} style={styles.profileImage} />
              <View style={styles.profileText}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.company}>{item.businessName}</Text> 
                <Text style={styles.loanAmount}>Loan Amount: {item.loanAmount}</Text> 
                <Text style={styles.cut}>Percentage Cut: {item.cut}</Text> 
              </View>
            </View>
           

            {/* base info that every business owner sees */}
            <View style={styles.bioContainer}>
              <Text style={styles.bioTitle}>Description</Text>
              <Text style={styles.bioText}>{item.email || "No email available"}</Text>
             
              <Text style={styles.bioText}>
                Total Contributed: {item.totalContributed !== undefined ? item.totalContributed.toString() : "No amount available"}
              </Text>

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
            <TouchableOpacity style={styles.acceptButton} onPress={() => acceptLoan(item.email, businessName)}>
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
    backgroundColor: "#f7eeeb", 
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
    fontFamily: 'Outfit-Regular',
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
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily:'Outfit-Regular',
    color: "#E7B5AC",
  },
  company: {
    fontSize: 14,
    fontFamily: "Outfit-Regular",
    color: "black",
  },
  bioContainer: {
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 8,
    borderWidth: 2,
    padding: 10,
    marginVertical: 5,
  },
  bioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Regular',
    color: "black",
  },
  bioText: {
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    color: "gray",
  },
  toggleButton: {
    backgroundColor: "#E7B5AC", 
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%' 
  },
  toggleButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: '100%' 
  },
  acceptButton: {
    backgroundColor: "#E7B5AC", 
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  acceptButtonText: {
    color: "white",
    fontWeight: "bold",
  }
});

export default BusinessHome;
