export interface Geometry {
  x: number;
  y: number;
}

export interface Attributes {
  id: number; // Can be facility number or oshpd_id
  name: string;
  type: string; // Facility type or hospital type (e.g., "General Acute Care Hospital", "RCFE-CONTINUING CARE RETIREMENT COMMUNITY")
  address: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber?: string; // Optional, since some data might not have it
  capacity?: number; // Optional, since hospitals and elder care may have different capacity definitions
  x: number; // Longitude
  y: number; // Latitude
}

export interface Feature {
  geometry: Geometry;
  attributes: Attributes;
}

export interface ElderFacilities {
  services: Feature[]; // Use the Feature array as the type for services
}
