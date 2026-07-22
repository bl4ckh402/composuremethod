import { getGeminiClient } from '../src/lib/gemini';

export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body: any = {};
  try {
    const chunks: Uint8Array[] = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    body = JSON.parse(Buffer.concat(chunks).toString());
  } catch {
    // body stays empty
  }

  const { stressLevel, primaryStressor, currentContext, energyLevel } = body || {};

  let aiClient;
  try {
    aiClient = getGeminiClient();
  } catch (err: any) {
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        protocolTitle: 'Standard Cortisol Reduction & Tactical Reset',
        cortisolTarget: 'Lower stress response by ~35% within 8 minutes',
        breathworkPattern: {
          name: 'Box Breathing (4-4-4-4)',
          inhale: 4,
          hold1: 4,
          exhale: 4,
          hold2: 4,
          cycles: 6,
        },
        pillars: [
          {
            step: 1,
            title: 'Cognitive De-escalation',
            action: `Acknowledge "${primaryStressor || 'current high cognitive load'}" without emotional attachment. Record the single metric that actually matters today.`,
          },
          {
            step: 2,
            title: 'Somatic Grounding',
            action: 'Drop shoulders away from ears. Place feet flat on floor. Unclench jaw and focus vision on a fixed distant horizontal plane for 90 seconds.',
          },
          {
            step: 3,
            title: 'Tactical Execution',
            action: 'Select ONE priority task. Clear all browser tabs except the required work document. Set a 25-minute uninterrupted execution timer.',
          },
        ],
        quote: 'Order is not the absence of pressure, but the architecture through which pressure is rendered harmless.',
      })
    );
    return;
  }

  try {
    const prompt = `
You are the ComposureMethod AI Clarity Architect, an elite performance and mental discipline system based on Botanical Technicality principles.
A high-performance individual has submitted their current mental state:
- Stress Level: ${stressLevel || 'Moderate'} / 10
- Primary Stressor / Focus Block: ${primaryStressor || 'Overwhelming cognitive load and scattered focus'}
- Context / Environment: ${currentContext || 'Desk work'}
- Energy Level: ${energyLevel || 'Medium'}

Generate a structured, highly disciplined, tactical 3-step Composure Protocol designed to lower cortisol, restore mental clarity, and establish immediate execution momentum.

Respond strictly in valid JSON format with the following keys:
{
  "protocolTitle": "Short precise title (e.g. Tactical Cortisol Dump & Focal Reset)",
  "cortisolTarget": "Estimated physiological outcome sentence",
  "breathworkPattern": {
    "name": "e.g. 4-7-8 Cortisol Dump or Tactical Box Breathing",
    "inhale": number_of_seconds,
    "hold1": number_of_seconds,
    "exhale": number_of_seconds,
    "hold2": number_of_seconds,
    "cycles": number_of_cycles
  },
  "pillars": [
    {
      "step": 1,
      "title": "Cognitive De-escalation",
      "action": "Specific concise instructions"
    },
    {
      "step": 2,
      "title": "Somatic Grounding",
      "action": "Specific concise physical alignment instructions"
    },
    {
      "step": 3,
      "title": "Environmental Discipline",
      "action": "Specific workspace / task clearing rule"
    }
  ],
  "quote": "A single disciplined, elegant sentence on mental order and composure"
}
`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const text = response.text || '{}';
    const data = JSON.parse(text);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  } catch (error: any) {
    console.error('Error generating clarity protocol:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message || 'Failed to generate protocol' }));
  }
};
