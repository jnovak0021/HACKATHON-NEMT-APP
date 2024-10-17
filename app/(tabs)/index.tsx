import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import { useEffect, useState } from "react";
import elderCareFacilities from "@/assets/data/elder-care-facilities.json";
import healthCareFacilities from "@/assets/data/health-care-facilities.json";
import childCareFacilities from "@/assets/data/child-care-facilities.json";
import coolZones from "@/assets/data/cool-zones.json";
import residentialFacilities from "@/assets/data/residential-facilities.json";
import treatmentCenters from "@/assets/data/treatment-centers.json";

import ServicesMap from "@/components/ServicesMap";
import AgenciesBottomSheet from "@/components/ServicesBottomSheet";
import { getUser } from "@/utils/supabaseRequests";
import { useAuth } from "@clerk/clerk-react";
import { Feature } from "@/interfaces/service";
import {
  normalizeChildCareFacility,
  normalizeCoolZone,
  normalizeElderCareFacility,
  normalizeHospital,
  normalizeResidentialFacility,
  normalizeTreatmentCenter,
} from "@/utils/normalizeData";

// Example usage in your Page component
const Page = () => {
  const route = useRouter();
  const params = useLocalSearchParams();
  const { userId, getToken } = useAuth();

  const refresh = params?.refresh;
  const [category, setCategory] = useState<string | null>(null);
  // const normalizeElderCareFacility = (facility: any): Feature => ({
  //   geometry: {
  //     x: facility.geometry.x,
  //     y: facility.geometry.y,
  //   },
  //   attributes: {
  //     id: facility.attributes.facilitynumber,
  //     name: facility.attributes.facilityname,
  //     type: "Elder Care",
  //     address: facility.attributes.facilityaddress,
  //     city: facility.attributes.facilitycity,
  //     state: facility.attributes.facilitystate,
  //     zip: facility.attributes.facilityzip,
  //     phoneNumber: facility.attributes.facilityemail ?? undefined,
  //     capacity: facility.attributes.capacity ?? undefined,
  //     x: facility.geometry.x,
  //     y: facility.geometry.y,
  //   },
  // });

  // const normalizeHospital = (hospital: any): Feature => ({
  //   geometry: {
  //     x: hospital.geometry.x,
  //     y: hospital.geometry.y,
  //   },
  //   attributes: {
  //     id: hospital.attributes.oshpd_id,
  //     name: hospital.attributes.facility_name,
  //     type: "Health Care",
  //     address: hospital.attributes.dba_address1,
  //     city: hospital.attributes.dba_city,
  //     state: hospital.attributes.state,
  //     zip: hospital.attributes.zip,
  //     phoneNumber: hospital.attributes.facility_email ?? undefined,
  //     capacity: hospital.attributes.capacity ?? undefined,
  //     x: hospital.geometry.x,
  //     y: hospital.geometry.y,
  //   },
  // });
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const loadServices = () => {
    const elderCareFacilitiesData =
      elderCareFacilities.layers[0]?.features || [];
    const hospitalsData = healthCareFacilities.layers[0]?.features || [];
    const childCareFacilitiesData =
      childCareFacilities.layers[0]?.features || [];
    const coolZonesData = coolZones.layers[0]?.features || [];
    const residentialFacilitiesData =
      residentialFacilities.layers[0]?.features || [];
    const treatmentCentersData = treatmentCenters.layers[0]?.features || [];

    const normalizedElderCareFacilities = elderCareFacilitiesData
      .map(normalizeElderCareFacility)
      .slice(0, 100);
    const normalizedHospitals = hospitalsData
      .map(normalizeHospital)
      .slice(0, 100);
    const normalizedChildCareFacilities = childCareFacilitiesData
      .map(normalizeChildCareFacility)
      .slice(0, 100);
    const normalizedCoolZones = coolZonesData
      .map(normalizeCoolZone)
      .slice(0, 100);
    const normalizedResidentialFacilities = residentialFacilitiesData
      .map(normalizeResidentialFacility)
      .slice(0, 100);
    const normalizedTreatmentCenters = treatmentCentersData
      .map(normalizeTreatmentCenter)
      .slice(0, 100);

    const combinedList = [
      ...normalizedElderCareFacilities,
      ...normalizedHospitals,
      ...normalizedCoolZones,
      ...normalizedResidentialFacilities,
      ...normalizedTreatmentCenters,
    ];
    return shuffleArray(combinedList);
  };

  const [services, setServices] = useState<Feature[]>(loadServices());
  const [filteredServices, setFilteredServices] = useState<Feature[]>(services);

  const onDataChanged = (category: string) => {
    console.log("CHANGED_ ", category);
    setCategory(category);
  };
  // use effect that console.logs the services
  useEffect(() => {
    console.log("SERVICES_ ", services.length);
    console.log("FILTERED_SERVICES_ ", filteredServices.length);
  }, [services]);

  useEffect(() => {
    if (category === "All" || category === null) {
      setFilteredServices(services);
    } else {
      setFilteredServices(
        services.filter((service) => service.attributes.type === category)
      );
    }
  }, [category, services]);

  useEffect(() => {
    console.log("SERVICES_ ", services.length);
  }, [services]);

  return (
    <View style={{ flex: 1, marginTop: 65 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      ></Stack.Screen>
      <ServicesMap services={filteredServices} />
      <AgenciesBottomSheet
        services={filteredServices}
        category={category}
      ></AgenciesBottomSheet>
    </View>
  );
};

export default Page;
