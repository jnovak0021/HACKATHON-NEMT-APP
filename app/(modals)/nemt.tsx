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

const nemtServices = [
  {
    name: "Uber Health",
    contact_info: {
      phone: "N/A",
      email: "support@health.uber.com",
      website: "https://www.uberhealth.com",
    },
    description:
      "Uber Health offers rides for patients to and from medical appointments using Uber’s rideshare network. It provides an easy-to-use platform for healthcare providers to book and manage rides for patients.",
    services: [
      "Non-Emergency Medical Transportation",
      "Wheelchair-accessible rides",
      "HIPAA-compliant transportation",
    ],
    price: "good",
  },
  {
    name: "Lyft Healthcare",
    contact_info: {
      phone: "N/A",
      email: "N/A",
      website: "https://www.lyft.com/healthcare",
    },
    description:
      "Lyft Healthcare partners with health plans and providers to offer patients safe and reliable rides to medical appointments. The service focuses on increasing access to healthcare while lowering transportation-related barriers.",
    services: [
      "Non-Emergency Medical Transportation",
      "Flexible ride scheduling",
      "Patient transportation coordination",
    ],
    price: "expensive",
  },
  {
    name: "Modivcare",
    contact_info: {
      phone: "1-877-917-8166",
      email: "support@mymodivcare.com",
      website: "https://www.modivcare.com",
    },
    description:
      "Modivcare is a leading provider of integrated supportive care, offering NEMT services, remote patient monitoring, and in-home care. It primarily serves Medicaid and Medicare members, aiming to improve health outcomes by addressing social determinants of health.",
    services: [
      "Non-Emergency Medical Transportation",
      "Remote Patient Monitoring",
      "In-Home Personal Care",
    ],
    price: "not covered",
  },
  {
    name: "Veyo",
    contact_info: {
      phone: "(855) 478-7350",
      email: "info@veyo.com",
      website: "https://www.veyo.com",
    },
    description:
      "Veyo is a San Diego-based NEMT provider that focuses on Medicaid beneficiaries. It uses independent, CPR-trained drivers to provide safe and reliable transportation for patients needing medical care. Veyo operates across several states and also offers logistics support for healthcare organizations.",
    services: [
      "Non-Emergency Medical Transportation",
      "Wheelchair-accessible rides",
      "HIPAA-compliant driver training",
      "Real-time trip tracking",
    ],
    price: "good",
  },
];

const NemtModal = ({ visible }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [showInfo, setShowInfo] = useState(null);
  const router = useRouter();

  const handleSelectService = (index: number | React.SetStateAction<null>) => {
    setSelectedService(index);
  };

  const handleShowInfo = (index: number | React.SetStateAction<null>) => {
    setShowInfo(showInfo === index ? null : index);
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case "good":
        return Colors.green;
      case "expensive":
        return Colors.red;
      case "not covered":
        return Colors.grey;
      default:
        return Colors.grey;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color={"black"} />
          </TouchableOpacity>
          <Text style={styles.title}>NEMT Services</Text>
          <Text style={styles.subtitle}>
            Select a service provider based on your insurance copay.
          </Text>
          <ScrollView style={styles.scrollView}>
            {nemtServices.map((service, index) => (
              <View key={index} style={styles.serviceContainer}>
                <TouchableOpacity
                  style={styles.radioContainer}
                  onPress={() => handleSelectService(index)}
                >
                  <Ionicons
                    name={
                      selectedService === index
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={24}
                    color={Colors.primary}
                  />
                  <Text style={styles.serviceName}>{service.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => handleShowInfo(index)}
                >
                  <Ionicons
                    name="information-circle"
                    size={24}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
                {showInfo === index && (
                  <View style={styles.additionalInfo}>
                    {service.contact_info.phone !== "N/A" && (
                      <View style={styles.infoRow}>
                        <Ionicons
                          name="call"
                          size={16}
                          color={Colors.primary}
                        />
                        <Text style={styles.infoText}>
                          {service.contact_info.phone}
                        </Text>
                      </View>
                    )}
                    {service.contact_info.email !== "N/A" && (
                      <View style={styles.infoRow}>
                        <Ionicons
                          name="mail"
                          size={16}
                          color={Colors.primary}
                        />
                        <Text style={styles.infoText}>
                          {service.contact_info.email}
                        </Text>
                      </View>
                    )}
                    {service.contact_info.website !== "N/A" && (
                      <View style={styles.infoRow}>
                        <Ionicons
                          name="globe"
                          size={16}
                          color={Colors.primary}
                        />
                        <Text style={styles.infoText}>
                          {service.contact_info.website}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                <Text
                  style={[
                    styles.price,
                    { color: getPriceColor(service.price) },
                  ]}
                >
                  {service.price === "not covered" ? (
                    <Ionicons
                      name="alert-circle"
                      size={16}
                      color={Colors.grey}
                    />
                  ) : null}
                  {service.price === "good" && "Good Price"}
                  {service.price === "expensive" && "Expensive"}
                  {service.price === "not covered" && " Not Covered"}
                </Text>
              </View>
            ))}
          </ScrollView>
          {selectedService !== null && (
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => {
                const selected = nemtServices[selectedService];
                const contactUrl = selected.contact_info.website;
                Linking.openURL(contactUrl);
              }}
            >
              <Text style={styles.contactButtonText}>
                Contact {nemtServices[selectedService].name}
              </Text>
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
  serviceContainer: {
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceName: {
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

export default NemtModal;
