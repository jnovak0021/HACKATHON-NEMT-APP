import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Linking } from "react-native";
import { useRouter } from "expo-router";


//json file
const insuranceProviders = [

    {
  
      "name": "Aetna",
  
      "website": "https://www.aetna.com",
  
      "contact": {
  
        "email": "AINetworkManagement@aetna.com",
  
        "phone": "(858) 523-7989",
  
        "address": "11682 El Camino Real, San Diego, CA 92130"
  
      },
  
      "description": "Aetna provides health insurance coverage across a variety of plans, including employer-based, Medicare, and individual coverage."
  
    },
  
    {
  
      "name": "Anthem",
  
      "website": "https://www.anthem.com",
  
      "contact": {
  
        "email": "Not Available",
  
        "phone": "(844) 910-6172",
  
        "address": "Not Available"
  
      },
  
      "description": "Anthem is a major provider of health insurance, offering individual and family plans, as well as Medicare and Medicaid solutions."
  
    },
  
    {
  
      "name": "Blue Shield",
  
      "website": "https://www.blueshieldca.com",
  
      "contact": {
  
        "email": "Not Available",
  
        "phone": "+1-888-256-3650",
  
        "address": "50 Beale Street, San Francisco, CA 94105"
  
      },
  
      "description": "Blue Shield of California offers a variety of health plans, focusing on affordable coverage and quality healthcare services."
  
    },
  
    {
  
      "name": "ChoiceCare PPO (Humana)",
  
      "website": "https://www.humana.com",
  
      "contact": {
  
        "email": "Not Available",
  
        "phone": "(800) 448-6262",
  
        "address": "500 West Main Street, Louisville, KY 40202"
  
      },
  
      "description": "ChoiceCare PPO is part of Humana, offering Preferred Provider Organization plans with broad network access."
  
    },
  
    {
  
      "name": "CIGNA",
  
      "website": "https://www.cigna.com",
  
      "contact": {
  
        "email": "Not Available",
  
        "phone": "(800) 997-1654",
  
        "address": "900 Cottage Grove Road, Bloomfield, CT 06002"
  
      },
  
      "description": "Cigna provides health insurance and wellness services, including Medicare, individual plans, and international coverage."
  
    },
  
    {
  
      "name": "CHG",
  
      "website": "https://www.chghealthcare.com",
  
      "contact": {
  
        "email": "info@chghealthcare.com",
  
        "phone": "(800) 650-2988",
  
        "address": "7259 South Bingham Junction Boulevard, Midvale, UT 84047"
  
      },
  
      "description": "CHG is a healthcare staffing and insurance provider, focusing on personalized healthcare solutions for hospitals and clinics."
  
    },
  
    {
  
      "name": "Coventry",
  
      "website": "https://www.coventryhealthcare.com",
  
      "contact": {
  
        "email": "Not Available",
  
        "phone": "(800) 937-6824",
  
        "address": "6705 Rockledge Drive, Bethesda, MD 20817"
  
      },
  
      "description": "Coventry offers managed care services, including workers' compensation and health insurance products."
  
    },
  
    {
  
      "name": "Health Net",
  
      "website": "https://www.healthnet.com",
  
      "contact": {
  
        "email": "Not Available",
  
        "phone": "(800) 522-0088",
  
        "address": "21281 Burbank Boulevard, Woodland Hills, CA 91367"
  
      },
  
      "description": "Health Net provides health plans to individuals, families, and businesses, focusing on quality care and affordability."
  
    },
  
    {
  
      "name": "HealthSmart PPO",
  
      "website": "https://www.healthsmart.com",
  
      "contact": {
  
        "email": "Not Available",
  
        "phone": "(800) 687-0500",
  
        "address": "222 West Las Colinas Blvd, Irving, TX 75039"
  
      },
  
      "description": "HealthSmart offers a range of health management and third-party administration services, including PPO network access."
  
    },
  
    {
  
      "name": "Molina",
  
      "website": "https://www.molinahealthcare.com",
  
      "contact": {
  
        "email": "Not Available",
  
        "phone": "(888) 665-4621",
  
        "address": "200 Oceangate, Long Beach, CA 90802"
  
      },
  
      "description": "Molina Healthcare focuses on providing government-sponsored programs, including Medicaid and Medicare."
  
    },
  
    {
  
      "name": "MultiPlan PPO",
  
      "website": "https://www.multiplan.com",
  
      "contact": {
  
        "email": "Not Available",
  
        "phone": "(800) 546-3887",
  
        "address": "115 Fifth Avenue, New York, NY 10003"
  
      },
  
      "description": "MultiPlan offers healthcare cost management solutions, including a PPO network used by insurance companies and employers."
  
    },
  
    {
  
      "name": "SCMG",
  
      "website": "https://www.scmg.org",
  
      "contact": {
  
        "email": "Not Available",
  
        "phone": "(858) 523-7999",
  
        "address": "Sharp Community Medical Group, 5651 Copley Drive, San Diego, CA 92111"
  
      },
  
      "description": "Sharp Community Medical Group (SCMG) provides health services in Southern California through a network of physicians and specialists."
  
    },
  
    {
  
      "name": "UHC",
  
      "website": "https://www.uhc.com",
  
      "contact": {
  
        "email": "Not Available",
  
        "phone": "(866) 414-1959",
  
        "address": "9900 Bren Road East, Minnetonka, MN 55343"
  
      },
  
      "description": "UnitedHealthcare (UHC) is a leading health insurance provider offering a wide range of health and wellness plans, including employer-sponsored and individual coverage."
  
    },
  
    {
  
      "name": "UHC (TriCare)",
  
      "website": "https://www.tricare-west.com",
  
      "contact": {
  
        "email": "Not Available",
  
        "phone": "(877) 988-9378",
  
        "address": "P.O. Box 202112, Florence, SC 29502"
  
      },
  
      "description": "UHC administers TriCare, providing health coverage for U.S. military personnel, retirees, and their families."
  
    }
  
]


const insuranceModal = ({visible, onClose}) => {
    //hook for which insurance to select
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    //hook for additonal info
    const [showInfo, setShowInfo] = useState(null);
    const router = useRouter();

    const handleSelectInsurance = (index: number | React.SetStateAction<null>) => {
        setSelectedInsurance(index);
      };
    
      const handleShowInfo = (index: number | React.SetStateAction<null>) => {
        setShowInfo(showInfo === index ? null : index);
      };


    return (
        <Modal visible= {visible} animationType="slide" transparent={true}>
            <SafeAreaView style = {styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                    style={styles.closeButton}
                    //onPress={() => router.back()}
                    onPress={()=>{onClose}}
                  >
                    <Ionicons name="close" size={24} color={"black"} />
                </TouchableOpacity>
                <Text style={styles.title}>Insurance Providers</Text>
                <Text style={styles.subtitle}>Select your current insurance provider</Text>
                <ScrollView style={styles.scrollView}>
                  {insuranceProviders.map((provider,index) => (
                    <View key={index} style={styles.insuranceContainer}>
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() => handleSelectInsurance(index)}
                      >
                        <Ionicons
                          //if current insurance is selected
                          name={
                            selectedInsurance === index
                              ? "radio-button-on"
                              : "radio-button-off"
                          }
                          size={24}
                          color={Colors.primary}
                        />
                        <Text style={styles.insuranceName}>{provider.name}</Text>
                        <TouchableOpacity style={styles.infoButton} onPress={() => handleShowInfo(index)}>
                        <Ionicons name="information-circle" size={24} color={Colors.primary} />
                        {/* if the info button is clicked and it is the current index */}
                        {showInfo === index && (
                          <View style={styles.additionalInfo}>
                            {provider.contact.phone !== "N/A" && (
                              <View style={styles.infoRow}>
                                <Ionicons name="call" size={16} color={Colors.primary} />
                                <Text style={styles.infoText}>{provider.contact.phone}</Text>
                              </View>
                            )}
                            {provider.contact.email !== "Not Available" && (
                              <View style={styles.infoRow}>
                                <Ionicons name="mail" size={16} color={Colors.primary} />
                                <Text style={styles.infoText}>{provider.contact.email}</Text>
                              </View>
                            )}
                              {provider.website !== "Not Available" && (
                              <View style={styles.infoRow}>
                                <Ionicons name="globe" size={16} color={Colors.primary} />
                                <Text style={styles.infoText}>{provider.website}</Text>
                              </View>
                            )}
                          </View>
                        )}
                      </TouchableOpacity>


                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
                {selectedInsurance !== null && (
                  <TouchableOpacity style={styles.contactButton}
                    onPress={()=>{
                      const selected = insuranceProviders[selectedInsurance];
                      
                    }}
                  >
                    <Text style={styles.contactButtonText}>Select Provider{insuranceProviders[selectedInsurance].name}</Text>
                    
                  </TouchableOpacity>
                )}
              </View>

            </SafeAreaView>
        </Modal>
  
    );
};
const styles = StyleSheet.create({
modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
},
modalContent: {
  width: "90%",
  maxHeight: "90%",
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 20,
  position: "relative",
},
closeButton: {
  position: "absolute",
  top: 10,
  right: 10,
},
title: {
  fontSize: 24,
  fontFamily: "mon-sb",
  textAlign: "center",
  marginBottom: 10,
},
subtitle: {
  fontSize: 16,
  fontFamily: "mon",
  textAlign: "center",
  marginBottom: 20,
},
scrollView: {
  marginBottom: 20,
},
insuranceContainer: {
  marginBottom: 20,
},
radioContainer: {
  flexDirection: "row",
  alignItems: "center",
},
insuranceName: {
  fontSize: 16,
  fontFamily: "mon-sb",
  marginLeft: 10,
},
infoButton: {
  position: "absolute",
  right: 0,
},
additionalInfo: {
  marginTop: 10,
  marginLeft: 34,
},
infoRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 5,
},
infoText: {
  fontSize: 14,
  fontFamily: "mon",
  marginLeft: 5,
},
price: {
  fontSize: 14,
  fontFamily: "mon-sb",
  textAlign: "right",
  marginTop: 10,
},
contactButton: {
  backgroundColor: Colors.primary,
  padding: 15,
  borderRadius: 8,
  alignItems: "center",
},
contactButtonText: {
  color: "#fff",
  fontSize: 16,
  fontFamily: "mon-sb",
},
}); 



export default insuranceModal;
