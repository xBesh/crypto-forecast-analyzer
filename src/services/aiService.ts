interface PredictionResult {
  provider: string;
  prediction: number;
  confidence: number;
  reasoning: string;
}

export async function analyzeWithOpenAI(
  apiKey: string,
  coinData: any,
  historicalData: any[]
): Promise<PredictionResult> {
  try {
    const prompt = `Analyze this cryptocurrency data and predict the price change percentage for the next 30 days:
    
Coin: ${coinData.name} (${coinData.symbol})
Current Price: $${coinData.current_price}
30-day Change: ${coinData.price_change_percentage_30d}%
Market Cap: $${coinData.market_cap}
Volume: $${coinData.total_volume}

Historical prices (last 30 days): ${historicalData.map(h => h.price).join(', ')}

Provide your prediction as a JSON object with:
- prediction: estimated price change percentage for next 30 days (number)
- confidence: your confidence level 0-100 (number)
- reasoning: brief explanation (string)`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: 'You are a cryptocurrency market analyst. Respond only with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) throw new Error('OpenAI API error');

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return {
      provider: 'OpenAI GPT-4',
      prediction: result.prediction,
      confidence: result.confidence,
      reasoning: result.reasoning
    };
  } catch (error) {
    console.error('OpenAI analysis error:', error);
    throw error;
  }
}

export async function analyzeWithGemini(
  apiKey: string,
  coinData: any,
  historicalData: any[]
): Promise<PredictionResult> {
  try {
    const prompt = `Analyze this cryptocurrency and predict the price change for next 30 days. Respond with JSON only:
    
${coinData.name}: $${coinData.current_price}, 30d: ${coinData.price_change_percentage_30d}%
Historical: ${historicalData.slice(-10).map(h => h.price.toFixed(2)).join(', ')}

JSON format: {"prediction": number, "confidence": number, "reasoning": "string"}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024
          }
        })
      }
    );

    if (!response.ok) throw new Error('Gemini API error');

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const result = JSON.parse(jsonMatch ? jsonMatch[0] : text);

    return {
      provider: 'Google Gemini',
      prediction: result.prediction,
      confidence: result.confidence,
      reasoning: result.reasoning
    };
  } catch (error) {
    console.error('Gemini analysis error:', error);
    throw error;
  }
}

export async function analyzeWithAnthropic(
  apiKey: string,
  coinData: any,
  historicalData: any[]
): Promise<PredictionResult> {
  try {
    const prompt = `Analyze ${coinData.name} cryptocurrency. Current: $${coinData.current_price}, 30d change: ${coinData.price_change_percentage_30d}%. 
Historical prices: ${historicalData.slice(-10).map(h => h.price.toFixed(2)).join(', ')}

Predict price change % for next 30 days. Respond with JSON: {"prediction": number, "confidence": number, "reasoning": "string"}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) throw new Error('Anthropic API error');

    const data = await response.json();
    const text = data.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const result = JSON.parse(jsonMatch ? jsonMatch[0] : text);

    return {
      provider: 'Anthropic Claude',
      prediction: result.prediction,
      confidence: result.confidence,
      reasoning: result.reasoning
    };
  } catch (error) {
    console.error('Anthropic analysis error:', error);
    throw error;
  }
}

export function calculateConsensus(predictions: PredictionResult[]) {
  if (predictions.length === 0) return null;

  const avgPrediction = predictions.reduce((sum, p) => sum + p.prediction, 0) / predictions.length;
  const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;
  
  const variance = predictions.reduce((sum, p) => sum + Math.pow(p.prediction - avgPrediction, 2), 0) / predictions.length;
  const agreement = Math.max(0, 100 - Math.sqrt(variance));

  return {
    prediction: avgPrediction,
    confidence: avgConfidence,
    agreement,
    predictions
  };
}