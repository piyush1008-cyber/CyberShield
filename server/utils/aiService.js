const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
// Using a getter function for the model so it gets the process.env later
const getModel = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

/**
 * Uses Google Gemini to analyze a complaint and determine its priority.
 * Returns one of: 'Low', 'Medium', 'High', 'Critical'
 */
const determinePriority = async (title, description, category) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Defaulting to Medium priority.');
      return 'Medium';
    }

    const model = getModel();

    const prompt = `
      You are an expert cybersecurity triage AI.
      Your job is to read a cybercrime complaint and determine its priority level based on severity, financial loss, urgency, and potential threat to life/security.
      
      Complaint Title: "${title}"
      Category: "${category}"
      Description: "${description}"
      
      Respond with EXACTLY ONE WORD from this list: Low, Medium, High, Critical
      
      Guidelines:
      - Critical: Imminent threat to life, massive financial fraud (e.g. >10 Lakhs in progress), ransomware on critical infrastructure, severe data breaches.
      - High: Significant financial loss, active ongoing harassment/doxxing, phishing with compromised bank accounts.
      - Medium: Standard scams, identity theft with no immediate massive fallout, resolved or old phishing attempts.
      - Low: Spam, generic inquiries, minor annoyances with no financial loss.
      
      Return ONLY the priority word.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Ensure the AI only returns a valid enum
    const validPriorities = ['Low', 'Medium', 'High', 'Critical'];
    const matchedPriority = validPriorities.find(p => responseText.includes(p));

    return matchedPriority || 'Medium';

  } catch (error) {
    console.error('AI Priority Generation Error:', error.message);
    return 'Medium'; // Fallback to Medium if API fails
  }
};

module.exports = {
  determinePriority
};
