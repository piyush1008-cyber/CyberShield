import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiAPI } from '../services/api';
import { HiChat, HiPaperAirplane, HiX, HiChevronDown, HiTranslate } from 'react-icons/hi';

const INDIAN_LANGUAGES = [
  { code: 'English', label: 'English', native: 'English' },
  { code: 'Hindi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'Hinglish', label: 'Hinglish', native: 'Hinglish' },
  { code: 'Marathi', label: 'Marathi', native: 'मराठी' },
  { code: 'Bengali', label: 'Bengali', native: 'বাংলা' },
  { code: 'Tamil', label: 'Tamil', native: 'தமிழ்' },
  { code: 'Telugu', label: 'Telugu', native: 'తెలుగు' },
  { code: 'Gujarati', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'Kannada', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'Malayalam', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'Punjabi', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

const GREETINGS = {
  English: "Hi! I'm CyberShield AI 🛡️ — your multilingual cybersecurity assistant. Ask me anything in any Indian language!",
  Hindi: "नमस्ते! मैं CyberShield AI 🛡️ हूँ। साइबर अपराध, ऑनलाइन फ्रॉड या शिकायत दर्ज करने से जुड़ा कोई भी सवाल पूछें।",
  Hinglish: "Hello! Main CyberShield AI 🛡️ hoon. UPI fraud, phishing ya complaint se related kuch bhi poochiye!",
  Marathi: "नमस्कार! मी CyberShield AI 🛡️ आहे. सायबर फसवणूक किंवा तक्रार नोंदणीबद्दल काहीही विचारा.",
  Bengali: "নমস্কার! আমি CyberShield AI 🛡️। সাইবার ক্রাইম বা অভিযোগ দায়ের সংক্রান্ত যেকোনো প্রশ্ন জিজ্ঞাসা করুন।",
  Tamil: "வணக்கம்! நான் CyberShield AI 🛡️. சைபர் கிரைம் அல்லது புகார் பதிவு பற்றிய கேள்விகளைக் கேளுங்கள்.",
  Telugu: "నమస్కారం! నేను CyberShield AI 🛡️. సైబర్ నేరాలు లేదా ఫిర్యాదు చేయడం గురించి ఏదైనా అడగండి.",
  Gujarati: "નમસ્તે! હું CyberShield AI 🛡️ છું. સાયબર ક્રાઇમ અથવા ફરિયાદ નોંધવા અંગે કંઈપણ પૂછો.",
  Kannada: "ನಮಸ್ಕಾರ! ನಾನು CyberShield AI 🛡️. ಸೈಬರ್ ಅಪರಾಧ ಅಥವಾ ದೂರು ದಾಖಲಿಸುವ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ.",
  Malayalam: "നമസ്കാരം! ഞാൻ CyberShield AI 🛡️ ആണ്. സൈബർ തട്ടിപ്പുകളെക്കുറിച്ചോ പരാതി നൽകുന്നതിനെക്കുറിച്ചോ ചോദിക്കാം.",
  Punjabi: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ CyberShield AI 🛡️ ਹਾਂ। ਸਾਈਬਰ ਧੋਖਾਧੜੀ ਜਾਂ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰਨ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ।",
};

const QUICK_PROMPTS = {
  English: ['What is phishing?', 'Money lost via UPI scam', 'Cyber Helpline 1930', 'How to file complaint?'],
  Hindi: ['ऑनलाइन फ्रॉड की शिकायत कैसे करें?', 'UPI से पैसे कट गए क्या करें?', 'साइबर हेल्पलाइन 1930 क्या है?', 'फिशिंग क्या होता है?'],
  Hinglish: ['Fake SMS se paise kat gaye', 'Complaint kaise file kare?', 'Helpline 1930 kab call kare?', 'Account freeze kaise kare?'],
  Marathi: ['ऑनलाइन फसवणूक झाली तर काय करावे?', 'तक्रार कशी नोंदवायची?', 'सायबर हेल्पलाइन १९३०'],
  Bengali: ['টাকা খোয়া গেলে কী করব?', 'অভিযোগ কীভাবে জানাব?', 'হেল্পলাইন ১৯৩০'],
  Tamil: ['ஆன்லைன் மோசடி புகார் செய்வது எப்படி?', 'UPI பணம் திருடப்பட்டால் என்ன செய்வது?', 'ஹெல்ப்லைன் 1930'],
  Telugu: ['ఆన్‌లైన్ మోసం ఫిర్యాదు ఎలా చేయాలి?', 'UPI ద్వారా డబ్బు పోయింది ఏం చేయాలి?', 'హెల్ప్‌లైన్ 1930'],
  Gujarati: ['ઓનલાઇન ફ્રોડની ફરિયાદ કેવી રીતે કરવી?', 'UPI થી પૈસા કપાઈ ગયા તો શું કરવું?', 'હેલ્પલાઇન 1930'],
  Kannada: ['ಆನ್‌ಲೈನ್ ವಂಚನೆ ದೂರು ನೀಡುವುದು ಹೇಗೆ?', 'ಯುಪಿಐ ಹಣ ಕಳೆದುಹೋದರೆ ಏನು ಮಾಡಬೇಕು?'],
  Malayalam: ['ഓൺലൈൻ തട്ടിപ്പ് പരാതി എങ്ങനെ നൽകാം?', 'യുപിഐ പണം നഷ്ടപ്പെട്ടാൽ എന്തുചെയ്യണം?'],
  Punjabi: ['ਆਨਲਾਈਨ ਧੋਖਾਧੜੀ ਦੀ ਸ਼ਿਕਾਇਤ ਕਿਵੇਂ ਕਰੀਏ?', 'UPI ਤੋਂ ਪੈਸੇ ਕੱਟੇ ਗਏ ਕੀ ਕਰੀਏ?'],
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: GREETINGS['English'] }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLang(newLang);
    const greeting = GREETINGS[newLang] || GREETINGS['English'];
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: `🌐 Language switched to **${newLang}**.\n\n${greeting}` }
    ]);
  };

  const handleSend = async (customText = null) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;
    const userMsg = textToSend.trim();
    if (!customText) setInput('');

    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await aiAPI.chat({
        message: userMsg,
        history: messages.slice(-8),
        language: selectedLang
      });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.data.reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't reach the server. Please verify your connection or try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const currentPrompts = QUICK_PROMPTS[selectedLang] || QUICK_PROMPTS['English'];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center hover:shadow-indigo-500/50 transition-all border border-indigo-400/40"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        title="CyberShield AI Assistant (Multi-Language)"
      >
        {open ? <HiX className="w-6 h-6 text-white" /> : <HiChat className="w-6 h-6 text-white" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[390px] h-[550px] max-w-[calc(100vw-2rem)] bg-[#0F172A] border border-slate-700/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 px-4 py-3 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-base">
                  🛡️
                </div>
                <div>
                  <div className="text-white font-semibold text-sm leading-tight flex items-center gap-1.5">
                    CyberShield AI
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-normal">Bharat</span>
                  </div>
                  <div className="text-white/80 text-[11px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Online & Multi-Lingual
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Language Picker Dropdown */}
                <div className="relative flex items-center bg-black/25 rounded-lg px-2 py-1 text-xs border border-white/20">
                  <HiTranslate className="w-3.5 h-3.5 mr-1 text-cyan-200" />
                  <select
                    value={selectedLang}
                    onChange={handleLanguageChange}
                    className="bg-transparent text-white text-xs focus:outline-none cursor-pointer pr-1"
                  >
                    {INDIAN_LANGUAGES.map(lang => (
                      <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                        {lang.native} ({lang.label})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  <HiChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Language Banner */}
            <div className="bg-slate-800/80 px-4 py-1.5 border-b border-slate-700/50 flex items-center justify-between text-[11px] text-slate-300">
              <span>🇮🇳 Replying in: <strong className="text-cyan-400">{selectedLang}</strong></span>
              <span className="text-slate-400">Helpline: <strong>1930</strong></span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-none shadow-md shadow-indigo-600/20'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-slate-700/50 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-xs text-slate-400 ml-1.5">Thinking in {selectedLang}...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 4 && (
              <div className="px-3 pb-2 pt-1 border-t border-slate-800/80 bg-slate-900/60 flex flex-wrap gap-1.5">
                {currentPrompts.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    disabled={loading}
                    className="text-[11px] bg-slate-800/70 border border-slate-700/50 text-slate-300 rounded-full px-2.5 py-1 hover:bg-indigo-600/30 hover:border-indigo-500/50 hover:text-white transition-all text-left"
                  >
                    💡 {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <div className="p-3 border-t border-slate-800 bg-slate-900/90">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={
                    selectedLang === 'Hindi'
                      ? 'यहाँ अपना सवाल लिखें...'
                      : selectedLang === 'Hinglish'
                      ? 'Apna question yahan likhein...'
                      : selectedLang === 'Marathi'
                      ? 'येथे प्रश्न विचारा...'
                      : selectedLang === 'Bengali'
                      ? 'এখানে আপনার প্রশ্ন লিখুন...'
                      : `Type your question in ${selectedLang}...`
                  }
                  className="flex-1 bg-slate-800/70 border border-slate-700/60 rounded-xl py-2 px-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-3 py-2 transition-all shadow-md active:scale-95 flex items-center justify-center"
                >
                  <HiPaperAirplane className="w-4 h-4 rotate-90" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
