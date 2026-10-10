import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineX, HiOutlineMail, HiOutlinePhone, HiOutlineDocumentDuplicate } from 'react-icons/hi';

const CyberSOSModal = ({ isOpen, onClose }) => {
  const [bank, setBank] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');

  if (!isOpen) return null;

  const generateEmail = () => {
    if (!bank || !amount || !transactionId) {
      toast.error('Please fill in all details to generate the dispute email');
      return;
    }

    const emailBody = `Subject: URGENT: Reporting Unauthorized Fraudulent Transaction - Account Freeze Request

Dear Branch Manager,

I am writing to urgently report a fraudulent transaction on my account. I have not authorized this transaction, and my account has been compromised. Please immediately freeze my account to prevent further losses and initiate a chargeback/dispute process for this amount as per RBI guidelines.

Bank Name: ${bank}
Stolen Amount: ₹${amount}
Transaction ID: ${transactionId}

Please acknowledge receipt of this complaint immediately. I will also be filing a formal complaint on the CyberCrime portal.

Sincerely,
[Your Name]
[Your Account Number]
[Your Contact Number]`;

    navigator.clipboard.writeText(emailBody);
    toast.success('Dispute email copied to clipboard!');
  };

  const emergencyContacts = [
    { name: 'National Cyber Crime Helpline', number: '1930' },
    { name: 'SBI Fraud Control', number: '1800 11 1109' },
    { name: 'HDFC Fraud Control', number: '1800 258 6161' },
    { name: 'ICICI Fraud Control', number: '1800 266 2' },
    { name: 'UPI Help (NPCI)', number: '1800 120 1740' },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-red-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">🚨</span>
            <h2 className="text-xl font-bold text-white">Cyber SOS: Rapid Financial Freeze Kit</h2>
          </div>
          <button onClick={onClose} className="text-red-200 hover:text-white transition-colors">
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8">
          {/* Section 1: Emergency Numbers */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HiOutlinePhone className="w-5 h-5 text-red-600" />
              1. Call Immediately to Freeze Accounts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {emergencyContacts.map((contact) => (
                <div key={contact.name} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-sm font-semibold text-slate-700">{contact.name}</span>
                  <a href={`tel:${contact.number.replace(/\s/g, '')}`} className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg border border-red-100 hover:bg-red-100">
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 bg-amber-50 text-amber-700 p-2 rounded border border-amber-200">
              <strong>Golden Hour Rule:</strong> Reporting financial fraud within the first 2 hours drastically increases the chances of recovering your stolen funds.
            </p>
          </section>

          {/* Section 2: Dispute Generator */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HiOutlineMail className="w-5 h-5 text-red-600" />
              2. Generate Formal Dispute Email
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Enter the transaction details below. We will generate a formal, legally-sound dispute letter that you can instantly email to your bank manager.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bank / Wallet Name</label>
                <input
                  type="text"
                  placeholder="e.g. HDFC, Paytm"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-red-500/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Stolen Amount (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-red-500/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Transaction ID / UTR</label>
                <input
                  type="text"
                  placeholder="e.g. UPI12345678"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-red-500/50 outline-none"
                />
              </div>
            </div>
            
            <button
              onClick={generateEmail}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <HiOutlineDocumentDuplicate className="w-5 h-5" />
              Generate & Copy Dispute Email
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CyberSOSModal;
