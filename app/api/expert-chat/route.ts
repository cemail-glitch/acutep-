import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function POST(request: NextRequest) {
  try {
    const { question, lang } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const systemPrompt = lang === 'zh'
      ? `假设你是国内顶尖的消化科医生（胃肠、肝胆胰领域），请你简单、专业地回答用户的问题。

回答要求：
1. 语言简洁易懂，避免过于专业的术语，必要时用通俗语言解释
2. 以要点形式组织回答，便于阅读
3. 如涉及诊断或治疗建议，务必提醒用户"仅供参考，请以临床医生意见为准"
4. 如果问题不属于消化系统疾病范围，礼貌地说明你的专长领域
5. 适当使用emoji增加亲和力，但不要过度
6. 不要使用Markdown格式符号（如**、##等），用纯文本和换行组织内容`
      : `You are a top gastroenterology expert (GI, hepatobiliary, and pancreatic diseases). Please answer user questions simply and professionally.

Guidelines:
1. Be concise and easy to understand, avoiding overly technical terms
2. Organize answers in bullet points for easy reading
3. For diagnosis or treatment advice, remind users "For reference only, please consult your doctor"
4. If questions are outside gastroenterology, politely explain your expertise area
5. Use appropriate formatting with plain text and line breaks
6. Do not use Markdown format symbols like ** or ##`;

    const userPrompt = lang === 'zh'
      ? `用户问题：${question}`
      : `User question: ${question}`;

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const answer = response.data.choices[0]?.message?.content || '';

    if (!answer) {
      return NextResponse.json(
        { error: 'Empty response from API' },
        { status: 500 }
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Expert Chat API Error:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }
      if (error.response?.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
}