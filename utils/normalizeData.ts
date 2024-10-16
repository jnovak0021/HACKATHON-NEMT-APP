// Type definition for Feature
export interface Feature {
  geometry: {
    x: number;
    y: number;
  };
  attributes: {
    id: string;
    name: string;
    type: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phoneNumber?: string;
    capacity?: number;
    x: number;
    y: number;
    description: string; // Added description field
  };
}

// Normalize Elder Care Facility
export const normalizeElderCareFacility = (facility: any): Feature => ({
  geometry: {
    x: facility.geometry.x,
    y: facility.geometry.y,
  },
  attributes: {
    id: facility.attributes.facilitynumber,
    name: facility.attributes.facilityname,
    type: "Elder Care",
    address: facility.attributes.facilityaddress,
    city: facility.attributes.facilitycity,
    state: facility.attributes.facilitystate,
    zip: facility.attributes.facilityzip,
    phoneNumber: facility.attributes.facilityemail ?? undefined,
    capacity: facility.attributes.capacity ?? undefined,
    x: facility.geometry.x,
    y: facility.geometry.y,
    description: `Elder care facility located in San Diego, serving the aging population with specialized care and support.`,
  },
});

// Normalize Hospital
export const normalizeHospital = (hospital: any): Feature => ({
  geometry: {
    x: hospital.geometry.x,
    y: hospital.geometry.y,
  },
  attributes: {
    id: hospital.attributes.oshpd_id,
    name: hospital.attributes.facility_name,
    type: "Health Care",
    address: hospital.attributes.dba_address1,
    city: hospital.attributes.dba_city,
    state: hospital.attributes.state,
    zip: hospital.attributes.zip,
    phoneNumber: hospital.attributes.facility_email ?? undefined,
    capacity: hospital.attributes.capacity ?? undefined,
    x: hospital.geometry.x,
    y: hospital.geometry.y,
    description: `Hospital providing health care services to the San Diego community, offering a range of medical and emergency care.`,
  },
});

// Normalize Child Care Facility
export const normalizeChildCareFacility = (facility: any): Feature => ({
  geometry: {
    x: facility.geometry.x,
    y: facility.geometry.y,
  },
  attributes: {
    id: facility.attributes.facilitynumber,
    name: facility.attributes.facilityname,
    type: "Child Care",
    address: facility.attributes.facilityaddress,
    city: facility.attributes.facilitycity,
    state: facility.attributes.facilitystate,
    zip: facility.attributes.facilityzip,
    phoneNumber: facility.attributes.facilitytelephonenumber ?? undefined,
    capacity: facility.attributes.facilitycapacity ?? undefined,
    x: facility.geometry.x,
    y: facility.geometry.y,
    description: `Child care facility in San Diego providing services for families and children, including early education and daycare.`,
  },
});

// Normalize Cool Zone
export const normalizeCoolZone = (zone: any): Feature => ({
  geometry: {
    x: zone.geometry.x,
    y: zone.geometry.y,
  },
  attributes: {
    id: zone.attributes.objectid,
    name: zone.attributes.organization?.toUpperCase(),
    type: "Cool Zone",
    address: zone.attributes.address?.toUpperCase(),
    city: zone.attributes.city,
    state: zone.attributes.state,
    zip: zone.attributes.zipcode,
    phoneNumber: zone.attributes.phone?.trim() || undefined,
    capacity: zone.attributes.sitecapacity ?? undefined,
    x: zone.geometry.x,
    y: zone.geometry.y,
    description: `Cool Zone facility in San Diego, providing a public, air-conditioned space for residents to escape the heat.`,
  },
});

// Normalize Residential Facility
export const normalizeResidentialFacility = (facility: any): Feature => ({
  geometry: {
    x: facility.geometry.x,
    y: facility.geometry.y,
  },
  attributes: {
    id: facility.attributes.facilitynumber,
    name: facility.attributes.facilityname,
    type: "Residential Facility",
    address: facility.attributes.facilityaddress,
    city: facility.attributes.facilitycity,
    state: facility.attributes.facilitystate,
    zip: facility.attributes.facilityzip,
    phoneNumber: facility.attributes.facilitytelephonenumber ?? undefined,
    capacity: facility.attributes.facilitycapacity ?? undefined,
    x: facility.geometry.x,
    y: facility.geometry.y,
    description: `Residential facility in San Diego offering housing and support for individuals in need of specialized living environments.`,
  },
});

// Normalize Treatment Center
export const normalizeTreatmentCenter = (center: any): Feature => ({
  geometry: {
    x: center.geometry.x,
    y: center.geometry.y,
  },
  attributes: {
    id: center.attributes.globalid,
    name: center.attributes.site_name?.toUpperCase(),
    type: "Treatment Center",
    address: center.attributes.address,
    city: center.attributes.hhsa_region,
    state: "CA", // Assuming state is always CA
    zip: center.attributes.address.split(",")[2]?.trim()?.toUpperCase(),
    phoneNumber: center.attributes.program_phone_number ?? undefined,
    x: center.geometry.x,
    y: center.geometry.y,
    description: `Treatment center in San Diego, providing rehabilitation and recovery services for individuals with specific health needs.`,
  },
});
