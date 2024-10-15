import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../path-to-colors"; // Adjust the import path as necessary

export type ServiceType = "Hospital" | "Elder Care"; // Add more types as needed

const markerColors: Record<ServiceType, string> = {
  Hospital: Colors.hospitalColor,
  "Elder Care": Colors.elderCareColor,
  // Add more types and their corresponding colors here
};

const markerIcons: Record<ServiceType, JSX.Element> = {
  Hospital: <MaterialIcons name="local-hospital" size={20} color="white" />,
  "Elder Care": <MaterialIcons name="elderly" size={20} color="white" />,
  // Add more types and their corresponding icons here
};

export const getMarkerColor = (serviceType: ServiceType): string => {
  return markerColors[serviceType] || Colors.grey; // Fallback to a default color if type is not found
};

export const getMarkerIcon = (
  serviceType: ServiceType,
  size: number
): JSX.Element => {
  return (
    markerIcons[serviceType] || (
      <MaterialIcons name="help-outline" size={size} color="white" />
    )
  ); // Fallback to a default icon if type is not found
};
