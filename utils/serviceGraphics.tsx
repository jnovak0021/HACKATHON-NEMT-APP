import { MaterialIcons } from "@expo/vector-icons";
import React from "react"; // <-- Ensure this is imported if missing

import Colors from "@/constants/Colors";

type ServiceType = "Health Care" | "Elder Care"; // Add more types as needed

const getMarkerColor = (serviceType: ServiceType): string => {
  const markerColors: Record<ServiceType, string> = {
    "Health Care": Colors.hospitalColor,
    "Elder Care": Colors.elderCareColor,
    // Add more types and their corresponding colors here
  };

  return markerColors[serviceType];
};

const getMarkerIcon = (
  serviceType: ServiceType,
  size_in: number
): JSX.Element => {
  const markerIcons: Record<ServiceType, () => JSX.Element> = {
    "Health Care": () => (
      <MaterialIcons name="local-hospital" size={size_in} color="white" />
    ),
    "Elder Care": () => (
      <MaterialIcons name="elderly" size={size_in} color="white" />
    ),
    // Add more types and their corresponding icons here
  };

  return markerIcons[serviceType]();
};

export { getMarkerColor, getMarkerIcon, ServiceType };
