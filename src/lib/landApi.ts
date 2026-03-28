/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/landApi.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface LandAmount {
  ana: number;
  gonda: number;
  kora: number;
  kranti: number;
  til: number;
}

export interface Owner {
  id: string;
  name: string;
  landAmount: LandAmount;
  linkedTo: string | null;
}

export interface CalculationResult {
  success: boolean;
  data?: {
    owners: Array<{
      id: string;
      name: string;
      landAmount: LandAmount;
      shareValue: number;
      percentage: number;
      decimalValue: number;
    }>;
    totals: LandAmount;
    totalShareSum: number;
    totalDecimal: number;
  };
  error?: string;
}

export const calculateLandDistribution = async (
  totalDecimal: number,
  owners: Owner[],
): Promise<CalculationResult> => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/land/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        totalDecimal,
        owners,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Calculation failed');
    }

    return result;
  } catch (error: any) {
    console.error('Land calculation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to calculate',
    };
  }
};
