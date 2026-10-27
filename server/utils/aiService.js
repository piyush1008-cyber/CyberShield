const { GoogleGenerativeAI } = require('@google/generative-ai');

const MODELS_TO_TRY = [
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
  'gemini-1.5-flash'
];

/**
 * Robust helper to generate content with multi-model fallback
 */
async function generateWithFallback(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  let lastError = null;

  for (const modelName of MODELS_TO_TRY) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch (err) {
      lastError = err;
      console.warn(`Model ${modelName} unavailable (${err.message.substring(0, 50)}), trying next fallback...`);
    }
  }

  throw lastError;
}

/**
 * Rule-based heuristic priority fallback when AI services are offline
 */
function heuristicPriority(title = '', description = '', category = '') {
  const text = `${title} ${description} ${category}`.toLowerCase();

  // Critical threats: ransomware, suicide/threat to life, critical infra, massive sums
  if (
    text.includes('ransomware') ||
    text.includes('encrypt') ||
    text.includes('threat to life') ||
    text.includes('blackmail') ||
    text.includes('suicide') ||
    text.includes('crore') ||
    text.includes('extortion') ||
    text.includes('lakh')
  ) {
    return 'Critical';
  }

  // High threats: active bank debit, phishing with lost money, identity theft, OTP fraud
  if (
    text.includes('otp') ||
    text.includes('debited') ||
    text.includes('unauthorized') ||
    text.includes('bank') ||
    text.includes('upi') ||
    text.includes('fraud') ||
    text.includes('hacked') ||
    text.includes('harassment')
  ) {
    return 'High';
  }

  // Low threats: spam, general inquiries, minor issues
  if (
    text.includes('spam') ||
    text.includes('advertisement') ||
    text.includes('inquiry') ||
    text.includes('question')
  ) {
    return 'Low';
  }

  return 'Medium';
}

/**
 * Uses Google Gemini with model fallback and local heuristics to determine complaint priority.
 * Returns one of: 'Low', 'Medium', 'High', 'Critical'
 */
const determinePriority = async (title, description, category) => {
  try {
    const prompt = `
      You are an expert cybersecurity triage AI for the CyberShield cybercrime portal.
      Analyze this cybercrime complaint and determine its priority level based on severity, financial loss, urgency, and security threat.
      
      Complaint Title: "${title}"
      Category: "${category}"
      Description: "${description}"
      
      Respond with EXACTLY ONE WORD from this list: Low, Medium, High, Critical
      
      Guidelines:
      - Critical: Imminent threat to life, massive financial fraud (>5 Lakhs / Crores), active ransomware, critical infrastructure breach.
      - High: Significant financial loss, unauthorized bank/UPI debit, active harassment/doxxing, compromised accounts.
      - Medium: Standard scams, identity theft with no immediate massive fallout, resolved or isolated phishing attempts.
      - Low: Spam, generic inquiries, minor annoyances with no financial loss.
      
      Return ONLY the priority word.
    `;

    const responseText = await generateWithFallback(prompt);

    const validPriorities = ['Low', 'Medium', 'High', 'Critical'];
    const matchedPriority = validPriorities.find(p => responseText.includes(p));

    return matchedPriority || heuristicPriority(title, description, category);

  } catch (error) {
    console.warn('AI Priority API unavailable, using local heuristic triage:', error.message);
    return heuristicPriority(title, description, category);
  }
};

module.exports = {
  determinePriority,
  generateWithFallback,
  heuristicPriority
};
