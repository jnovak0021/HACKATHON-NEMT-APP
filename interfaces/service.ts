export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  objectid: number;
  facilitytype: string;
  facilitynumber: number;
  facilityname: string;
  licensee: string;
  facilityemail: string | null;
  facilityadministrator: string;
  facilitytelephonenumber: string;
  facilityaddress: string;
  facilitycity: string;
  facilitystate: string;
  facilityzip: number;
  countyname: string;
  regionaloffice: number;
  facilitycapacity: number;
  facilitystatus: string;
  licensefirstdate: number;
  closeddate: number | null;
  lastvisitdate: number;
  inspectionvisits: number;
  complaintvisits: number;
  othervisits: number;
  totalvisits: number;
  citationnumbers: string | null;
  pocdates: string | null;
  allvisitdates: string | null;
  inspectionvisitdates: string | null;
  inspecttypea: number;
  inspecttypeb: number;
  othervisitdates: string | null;
  othertypea: number;
  othertypeb: number;
  complainttypea: number;
  complainttypeb: number;
  totalallegations: number;
  inconclusiveallegations: number;
  substantiatedallegations: number;
  unsubstantiatedallegations: number;
  unfoundedallegations: number;
  complaintinfo: string | null;
  point_x: number;
  point_y: number;
}

export interface Feature {
  type: string;
  id: number;
  geometry: Geometry;
  properties: Properties;
}

export interface FeatureCollection {
  type: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: Feature[];
}
