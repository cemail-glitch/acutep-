// Import React to provide access to the React namespace for type definitions like React.ReactNode.
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

export interface DiagnosisData {
  imaging: string;
  crp: string;
  whiteCell: string;
  painLevel: string;
}

export interface DiagnosisResult {
  diagnosis: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  probability: string;
  recommendations: string[];
}
