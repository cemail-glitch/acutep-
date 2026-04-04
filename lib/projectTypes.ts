export interface Expert {
  id: string;
  name: string;
  title: string;
  institution: string;
  specialty: string;
  image: string;
  bio: string;
}

export interface HospitalPartner {
  id: string;
  name: string;
  logo: string;
  type: string;
}

export interface ClinicalTrialData {
  metric: string;
  agentGroup: number;
  controlGroup: number;
  pValue: string;
}

export interface AlbuminSubtype {
  id: string;
  name: string;
  trajectory: number[];
  characteristics: string;
  clinicalSignificance: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  admissionDate: string;
  chiefComplaint: string;
  medicalHistory: string;
  albuminData: {
    time: string;
    value: number;
  }[];
  subtype: string;
  severity: string;
}

export interface DiagnosticReport {
  patientInfo: {
    name: string;
    id: string;
    age: number;
    gender: string;
    admissionDate: string;
  };
  lctmSubtype: {
    name: string;
    trajectory: number[];
    riskLevel: string;
  };
  severeRiskPrediction: {
    probability: number;
    riskLevel: 'low' | 'medium' | 'high';
    confidence: number;
  };
  evidenceBasedPlan: {
    recommendations: Array<{
      item: string;
      evidence: string;
      source: string;
    }>;
    treatmentPlan: string[];
    monitoringPlan: string[];
  };
}
