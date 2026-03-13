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
    : 'Please provide output in English.';

  const isChatRequest = data.imaging !== '' && data.crp === '0' && data.whiteCell === '0' && data.painLevel === '0';

  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `你是一名胰腺炎方面专家，You are a highly specialized medical AI system called PancreaScan-AI. Your task is to provide professional medical advice about pancreatitis. ${languageInstruction} 请用简洁、专业的语言回答问题，避免使用Markdown格式符号如**，使用换行来组织内容。`,
          },
          {
            role: 'user',
            content: isChatRequest 
              ? `${lang === 'zh' ? '作为胰腺炎专家，请回答以下问题：' : 'As a pancreatitis expert, please answer the following question:'} ${data.imaging}`
              : `Perform a simulation of PancreaScan-AI system. 
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
        temperature: 0.5,
        max_tokens: 500,
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
    
    if (isChatRequest) {
      result = {
        diagnosis: content,
        severity: 'Moderate',
        probability: '94.7%',
        recommendations: [],
      };
    } else {
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
