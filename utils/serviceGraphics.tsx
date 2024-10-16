import { MaterialIcons } from "@expo/vector-icons";
import React from "react"; // Ensure this is imported if missing

import Colors from "@/constants/Colors";

type ServiceType =
  | "Health Care"
  | "Elder Care"
  | "Child Care"
  | "Cool Zone"
  | "Residential Facility"
  | "Treatment Center";

const getMarkerColor = (serviceType: ServiceType): string => {
  const markerColors: Record<ServiceType, string> = {
    "Health Care": Colors.hospitalColor,
    "Elder Care": Colors.elderCareColor,
    "Child Care": Colors.childCareColor, // Add corresponding color
    "Cool Zone": Colors.coolZoneColor, // Add corresponding color
    "Residential Facility": Colors.residentialFacilityColor, // Add corresponding color
    "Treatment Center": Colors.treatmentCenterColor, // Add corresponding color
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
    "Child Care": () => (
      <MaterialIcons name="child-care" size={size_in} color="white" />
    ),
    "Cool Zone": () => (
      <MaterialIcons name="ac-unit" size={size_in} color="white" />
    ),
    "Residential Facility": () => (
      <MaterialIcons name="home" size={size_in} color="white" />
    ),
    "Treatment Center": () => (
      <MaterialIcons name="healing" size={size_in} color="white" />
    ),
  };

  return markerIcons[serviceType]();
};

export { getMarkerColor, getMarkerIcon, ServiceType };
