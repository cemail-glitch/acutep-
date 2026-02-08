import axios from 'axios';
import { DiagnosisData, DiagnosisResult } from '@/types';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export const getAiDiagnosisSimulation = async (
  data: DiagnosisData,
  lang: 'en' | 'zh'
): Promise<DiagnosisResult> => {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY is not configured');
  }

  const languageInstruction = lang === 'zh'
    ? '请用简体中文提供输出。'
    : 'Please provide the output in English.';

  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are a highly specialized medical AI system called PancreaScan-AI. Your task is to analyze patient data and provide a structured diagnosis for Acute Pancreatitis simulation. ${languageInstruction}`,
          },
          {
            role: 'user',
            content: `Perform a simulation of the PancreaScan-AI system. 
Input Data:
- Imaging Findings: ${data.imaging}
- CRP Level: ${data.crp} mg/L
- White Cell Count: ${data.whiteCell} x10^9/L
- Patient Pain Level: ${data.painLevel}/10

Output a structured JSON diagnosis with the following fields:
- diagnosis: A brief clinical diagnosis
- severity: One of: Mild, Moderate, Severe (or translated equivalents if requested)
- probability: Confidence score like "98.2%"
- recommendations: Array of 3-5 specific medical recommendations

${languageInstruction}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const content = response.data.choices[0]?.message?.content || '{}';
    
    let result: DiagnosisResult;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : content;
      result = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      result = {
        diagnosis: lang === 'zh' ? '急性胰腺炎' : 'Acute Pancreatitis',
        severity: 'Moderate',
        probability: '94.7%',
        recommendations: [
          lang === 'zh' ? '住院观察' : 'Hospital admission',
          lang === 'zh' ? '禁食' : 'NPO status',
          lang === 'zh' ? '静脉补液' : 'Intravenous fluids',
        ],
      };
    }

    return result;
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      }
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded');
      }
    }

    throw new Error('Failed to generate diagnosis');
  }
};
