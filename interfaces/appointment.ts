
// Define the AppointmentData interface
export interface AppointmentData {
    id: string;
    date: string;
    time: string;
    hospitalName: string;
    providerName: string;
    specialty: string;
    rideBooked: boolean;
    location: {
      address: string;
      city: string;
      state: string;
      zip: string;
    };
  }