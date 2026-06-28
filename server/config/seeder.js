const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const Complaint = require('../models/Complaint');
const Investigation = require('../models/Investigation');
const Notification = require('../models/Notification');

dotenv.config();

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

// Demo Users
const users = [
  { name: 'Abdul Rahman', email: 'citizen@demo.com', phone: '9876543210', password: 'password123', role: 'citizen' },
  { name: 'Sara Khan', email: 'citizen2@demo.com', phone: '9876543211', password: 'password123', role: 'citizen' },
  { name: 'Raj Patel', email: 'citizen3@demo.com', phone: '9876543212', password: 'password123', role: 'citizen' },
  { name: 'Officer Vikram', email: 'investigator@demo.com', phone: '9876543220', password: 'password123', role: 'investigator' },
  { name: 'Inspector Priya', email: 'investigator2@demo.com', phone: '9876543221', password: 'password123', role: 'investigator' },
  { name: 'System Admin', email: 'admin@demo.com', phone: '9876543230', password: 'password123', role: 'admin' },
];

// Demo Complaints
const complaints = [
  {
    trackingId: 'CS-2026-A7B3K9',
    title: 'Unauthorized Bank Transaction - Rs. 50,000 Debited',
    description: 'On June 25, 2026, I noticed an unauthorized transaction of Rs. 50,000 from my savings account. I did not authorize this transaction and did not share my OTP with anyone. The transaction was made to an unknown account. I have attached the bank statement and transaction notification screenshots as evidence.',
    category: 'Financial Fraud',
    status: 'Under Investigation',
    priority: 'High',
    incidentDate: new Date('2026-06-25'),
  },
  {
    trackingId: 'CS-2026-B2C4D6',
    title: 'Phishing Email - Fake Bank Login Page',
    description: 'I received an email that appeared to be from my bank asking me to verify my account details. The email contained a link to a fake login page that looked identical to my bank website. I entered my credentials before realizing it was a scam. I have since changed my password but I am concerned about potential identity theft.',
    category: 'Phishing / Social Engineering',
    status: 'Assigned',
    priority: 'Medium',
    incidentDate: new Date('2026-06-20'),
  },
  {
    trackingId: 'CS-2026-E5F7G8',
    title: 'Online Harassment on Social Media Platform',
    description: 'I have been receiving threatening messages and defamatory posts from an anonymous account on Instagram for the past 2 weeks. The person is using a fake profile and has been posting edited photos of me with abusive captions. I have reported the account but the platform has not taken action.',
    category: 'Online Harassment / Cyberbullying',
    status: 'Submitted',
    priority: 'Medium',
    incidentDate: new Date('2026-06-15'),
  },
  {
    trackingId: 'CS-2026-H1J2K3',
    title: 'Ransomware Attack on Business Computer',
    description: 'My business laptop was infected with ransomware that encrypted all files and demanded Rs. 2,00,000 in Bitcoin for decryption. The attack happened when I opened an attachment from what appeared to be a vendor email. All business documents, client data, and financial records are now inaccessible.',
    category: 'Ransomware / Malware Attack',
    status: 'Resolved',
    priority: 'Critical',
    incidentDate: new Date('2026-06-10'),
  },
  {
    trackingId: 'CS-2026-L4M5N6',
    title: 'Identity Theft - Fake Aadhaar Card Used for Loan',
    description: 'I discovered that someone has used my Aadhaar number and PAN card details to apply for a personal loan of Rs. 5,00,000 from an NBFC. I never applied for this loan. I found out when I received collection calls and noticed the loan entry in my CIBIL report.',
    category: 'Identity Theft',
    status: 'Under Review',
    priority: 'High',
    incidentDate: new Date('2026-06-18'),
  },
  {
    trackingId: 'CS-2026-P7Q8R9',
    title: 'Online Job Scam - Advance Fee Fraud',
    description: 'I applied for a work-from-home job posted on a job portal. After a fake interview on WhatsApp, they asked me to pay Rs. 15,000 as registration and training fees. After payment, the company went silent and blocked my number. The job posting has since been removed.',
    category: 'Online Scam',
    status: 'Closed',
    priority: 'Low',
    incidentDate: new Date('2026-06-05'),
  },
  {
    trackingId: 'CS-2026-S1T2U3',
    title: 'Data Breach - Personal Photos Leaked Online',
    description: 'My personal photos stored on a cloud service were leaked online. I found them posted on multiple websites without my consent. The cloud service confirmed a security breach that affected several accounts. I need help getting these images removed and identifying the perpetrators.',
    category: 'Data Breach',
    status: 'Assigned',
    priority: 'Critical',
    incidentDate: new Date('2026-06-22'),
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Complaint.deleteMany({});
    await Investigation.deleteMany({});
    await Notification.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const createdUsers = await User.create(users);
    console.log(`👥 Created ${createdUsers.length} users`);

    const citizen1 = createdUsers.find(u => u.email === 'citizen@demo.com');
    const citizen2 = createdUsers.find(u => u.email === 'citizen2@demo.com');
    const citizen3 = createdUsers.find(u => u.email === 'citizen3@demo.com');
    const investigator1 = createdUsers.find(u => u.email === 'investigator@demo.com');
    const investigator2 = createdUsers.find(u => u.email === 'investigator2@demo.com');

    // Assign citizens and investigators to complaints
    const complaintData = complaints.map((c, i) => ({
      ...c,
      citizenId: [citizen1, citizen2, citizen3, citizen1, citizen2, citizen3, citizen1][i]._id,
      assignedTo: ['Under Investigation', 'Assigned', 'Resolved', 'Closed'].includes(c.status)
        ? [investigator1, investigator2, investigator1, investigator2, investigator1, investigator1, investigator2][i]._id
        : null
    }));

    const createdComplaints = await Complaint.create(complaintData);
    console.log(`📋 Created ${createdComplaints.length} complaints`);

    // Create investigations for assigned/investigating/resolved/closed complaints
    const investigationComplaints = createdComplaints.filter(c =>
      ['Assigned', 'Under Investigation', 'Resolved', 'Closed'].includes(c.status)
    );

    for (const comp of investigationComplaints) {
      await Investigation.create({
        complaintId: comp._id,
        investigatorId: comp.assignedTo,
        status: comp.status === 'Resolved' || comp.status === 'Closed' ? 'Completed' : 'Active',
        notes: [
          {
            content: `Case ${comp.trackingId} has been assigned. Beginning preliminary investigation.`,
            addedBy: comp.assignedTo,
            addedAt: new Date()
          },
          ...(comp.status === 'Under Investigation' ? [{
            content: 'Contacted relevant parties for additional information. Awaiting response.',
            addedBy: comp.assignedTo,
            addedAt: new Date(Date.now() + 86400000)
          }] : []),
          ...(comp.status === 'Resolved' ? [{
            content: 'Investigation complete. Perpetrator identified and evidence compiled for legal proceedings.',
            addedBy: comp.assignedTo,
            addedAt: new Date(Date.now() + 172800000)
          }] : [])
        ],
        communications: [
          {
            senderId: comp.assignedTo,
            senderRole: 'investigator',
            message: `Hello, I have been assigned to your case ${comp.trackingId}. I will review the details and get back to you shortly.`,
            sentAt: new Date()
          },
          {
            senderId: comp.citizenId,
            senderRole: 'citizen',
            message: 'Thank you, officer. Please let me know if you need any additional information.',
            sentAt: new Date(Date.now() + 3600000)
          }
        ],
        resolvedAt: comp.status === 'Resolved' || comp.status === 'Closed' ? new Date() : null
      });
    }
    console.log(`🔍 Created ${investigationComplaints.length} investigations`);

    // Create notifications
    const notifications = createdComplaints.map(c => ({
      userId: c.citizenId,
      type: 'complaint_submitted',
      title: 'Complaint Submitted',
      message: `Your complaint "${c.title}" has been submitted. Tracking ID: ${c.trackingId}`,
      relatedComplaint: c._id,
      isRead: true
    }));

    // Add extra notifications for assigned cases
    investigationComplaints.forEach(c => {
      notifications.push({
        userId: c.citizenId,
        type: 'complaint_assigned',
        title: 'Investigator Assigned',
        message: `Your complaint ${c.trackingId} has been assigned to an investigator.`,
        relatedComplaint: c._id,
        isRead: false
      });
    });

    await Notification.create(notifications);
    console.log(`🔔 Created ${notifications.length} notifications`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Demo Accounts:');
    console.log('   👤 Citizen:      citizen@demo.com / password123');
    console.log('   🔍 Investigator: investigator@demo.com / password123');
    console.log('   ⚙️  Admin:       admin@demo.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();
