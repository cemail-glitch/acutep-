import React from 'react';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface StatItemProps {
  value: string;
  label: string;
}

export interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export interface PatientData {
  facialImage: File | null;
  heartRate: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  symptoms: string[];
  medicalHistory: string[];
}

export type PancreatitisType = 
  | 'Mild Acute Pancreatitis' 
  | 'Moderate Acute Pancreatitis' 
  | 'Severe Acute Pancreatitis' 
  | 'Critical Acute Pancreatitis';

export interface ClinicalAnalysisResult {
  type: PancreatitisType;
  severity: number; // 0-100
  confidence: number; // 0-100
  riskFactors: string[];
  recommendations: string[];
  treatmentPlan: string[];
  followUp: string[];
}

export interface HeartRateAnalysis {
  value: number;
  status: 'Normal' | 'Elevated' | 'Tachycardia' | 'Bradycardia';
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface FacialAnalysis {
  painExpression: 'Mild' | 'Moderate' | 'Severe';
  hydrationStatus: 'Normal' | 'Dehydrated' | 'Severely Dehydrated';
  overallCondition: 'Stable' | 'Unstable' | 'Critical';
}
