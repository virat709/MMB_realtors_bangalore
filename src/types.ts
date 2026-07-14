export type PropertyType = 'apartment' | 'independent' | 'villa' | 'plot';

export type BBMPZone = 'bbmp' | 'bda_bmrda' | 'panchayat_rural';

export interface CalculationResult {
  propertyValue: number;
  stampDutyRate: number;
  stampDutyAmount: number;
  registrationFeeRate: number;
  registrationFeeAmount: number;
  surchargeAmount: number;
  cessAmount: number;
  serviceFee: number;
  totalGovtFees: number;
  totalEstimatedCost: number;
}

export interface BookingDetails {
  fullName: string;
  phone: string;
  email: string;
  locality: string;
  propertyType: PropertyType;
  serviceType: string;
  preferredDate: string;
  notes: string;
}

export interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  date?: string;
  remarks?: string;
}

export interface ApplicationDetails {
  id: string;
  applicantName: string;
  propertyAddress: string;
  serviceSelected: string;
  overallStatus: 'Verified' | 'In Progress' | 'Awaiting Registrar Appointment' | 'Completed';
  steps: ApplicationStep[];
}
