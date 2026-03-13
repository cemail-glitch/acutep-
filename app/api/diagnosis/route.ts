import { NextRequest, NextResponse } from 'next/server';
import { getAiDiagnosisSimulation } from '@/lib/deepseekService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imaging, crp, whiteCell, painLevel, lang = 'en', question } = body;

    if (question) {
      const diagnosisData = {
        imaging: question,
        crp: '0',
        whiteCell: '0',
        painLevel: '0',
      };

      const result = await getAiDiagnosisSimulation(diagnosisData, lang);
      return NextResponse.json({ diagnosis: result.diagnosis });
    }

    if (!imaging || !crp || !whiteCell || !painLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const diagnosisData = {
      imaging,
      crp,
      whiteCell,
      painLevel,
    };

    const result = await getAiDiagnosisSimulation(diagnosisData, lang);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Diagnosis API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate diagnosis' },
      { status: 500 }
    );
  }
}
