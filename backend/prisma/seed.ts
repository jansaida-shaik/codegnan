import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Create users with different roles
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const users = [
    { email: "superadmin@codegnan.com", name: "Super Admin", role: "SUPER_ADMIN" as const },
    { email: "admin@codegnan.com", name: "Administrator", role: "ADMINISTRATOR" as const },
    { email: "ops@codegnan.com", name: "Operations Head", role: "OPERATIONS_HEAD" as const },
    { email: "saleshead@codegnan.com", name: "Sales Head", role: "SALES_HEAD" as const },
    { email: "salesmanager@codegnan.com", name: "Sales Manager", role: "SALES_MANAGER" as const },
    { email: "sales@codegnan.com", name: "Sales Profile", role: "SALES_PROFILE" as const },
    { email: "telecaller@codegnan.com", name: "Tele Caller", role: "TELE_CALLER" as const },
    { email: "frontdesk@codegnan.com", name: "Front Desk", role: "FRONT_DESK" as const },
    { email: "associate@codegnan.com", name: "Associate Admin", role: "ASSOCIATE_ADMIN" as const },
    { email: "standard@codegnan.com", name: "Standard User", role: "STANDARD" as const },
  ];

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: hashedPassword,
        profile: {
          create: {
            bio: `Hello, I am a ${userData.role} at Codegnan.`,
            location: "Guntur, IN",
            phone: "9705243061",
            skills: JSON.stringify(["Next.js", "React", "Prisma"]),
          }
        }
      },
    });
    console.log(`Created ${userData.role} user:`, user.email);
  }

  // 2. Create Team Members
  const teamMembers = [
    {
      name: "Jan Saida Shaik",
      role: "Super Admin",
      status: "offline",
      initial: "JS",
      color: "text-blue-600",
      bg: "bg-blue-50",
      email: "jansaida@codegnan.com",
      phone: "9705243061",
      userid: "600381",
      location: "Vijayawada, IN",
      rating: 5,
      badges: JSON.stringify(["Founder", "Direct"]),
      awards: JSON.stringify(["Trophy", "Award"]) // Simplified for storage
    },
    {
      name: "Anush Kumar",
      role: "Associate Admin",
      status: "offline",
      initial: "AK",
      color: "text-blue-600",
      bg: "bg-blue-50",
      email: "anush@codegnan.com",
      phone: "9876543210",
      userid: "600382",
      location: "Hyderabad, IN",
      rating: 4.8,
      badges: JSON.stringify(["Admin", "Sync"]),
      awards: JSON.stringify(["Medal"])
    },
    {
      name: "Battula Kranthi Kumar",
      role: "Hyderabad Counsellor",
      status: "offline",
      initial: "BK",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      email: "kranthi@codegnan.com",
      phone: "9123456789",
      userid: "600383",
      location: "Hyderabad, IN",
      rating: 4.9,
      badges: JSON.stringify(["Top Seller", "Coach"]),
      awards: JSON.stringify(["Trophy", "Star"])
    },
    {
      name: "Bhanu Satish Kotha",
      role: "Associate Admin",
      status: "offline",
      initial: "BS",
      color: "text-amber-600",
      bg: "bg-amber-50",
      email: "bhanu@codegnan.com",
      phone: "9000000000",
      userid: "600384",
      location: "Vijayawada, IN",
      rating: 4.7,
      badges: JSON.stringify(["Lead"]),
      awards: JSON.stringify(["Award"])
    },
    {
      name: "Deva Anil Pedda",
      role: "Vijayawada Counsellor",
      status: "offline",
      initial: "DP",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      email: "anil@codegnan.com",
      phone: "9111111111",
      userid: "600385",
      location: "Vijayawada, IN",
      rating: 4.6,
      badges: JSON.stringify(["Growth"]),
      awards: JSON.stringify(["Medal"])
    },
    {
      name: "Sushmitha",
      role: "Front Desk Vijayawada",
      status: "offline",
      initial: "SM",
      color: "text-rose-600",
      bg: "bg-rose-50",
      email: "sushmitha@codegnan.com",
      phone: "9222222222",
      userid: "600386",
      location: "Vijayawada, IN",
      rating: 4.5,
      badges: JSON.stringify(["Support"]),
      awards: JSON.stringify(["Star"])
    },
    {
      name: "Jaya Sri",
      role: "Administrator",
      status: "offline",
      initial: "JS",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      email: "jayasri@codegnan.com",
      phone: "9333333333",
      userid: "600387",
      location: "Vijayawada, IN",
      rating: 4.7,
      badges: JSON.stringify(["Admin", "Ops"]),
      awards: JSON.stringify(["Award"])
    },
    {
      name: "Kala Sowmya Devara",
      role: "Visakhapatnam Counsellor",
      status: "offline",
      initial: "KD",
      color: "text-teal-600",
      bg: "bg-teal-50",
      email: "kala@codegnan.com",
      phone: "9444444444",
      userid: "600388",
      location: "Vizag, IN",
      rating: 4.8,
      badges: JSON.stringify(["Sales", "Vizag"]),
      awards: JSON.stringify(["Trophy"])
    },
    {
      name: "Kondeti Sai Venkata Pavan",
      role: "Hyderabad Counsellor",
      status: "offline",
      initial: "KP",
      color: "text-purple-600",
      bg: "bg-purple-50",
      email: "pavan@codegnan.com",
      phone: "9555555555",
      userid: "600389",
      location: "Hyderabad, IN",
      rating: 4.9,
      badges: JSON.stringify(["Top Seller"]),
      awards: JSON.stringify(["Star", "Medal"])
    },
    {
      name: "Lakshmi Sowjanya",
      role: "Front Desk Hyderabad",
      status: "offline",
      initial: "LS",
      color: "text-pink-600",
      bg: "bg-pink-50",
      email: "lakshmi@codegnan.com",
      phone: "9666666666",
      userid: "600390",
      location: "Hyderabad, IN",
      rating: 4.6,
      badges: JSON.stringify(["Service"]),
      awards: JSON.stringify(["Award"])
    },
    {
      name: "Modali Srinivas",
      role: "Tele Caller",
      status: "offline",
      initial: "MS",
      color: "text-slate-600",
      bg: "bg-slate-50",
      email: "srinivas@codegnan.com",
      phone: "9777777777",
      userid: "600391",
      location: "Vijayawada, IN",
      rating: 4.4,
      badges: JSON.stringify(["Leads"]),
      awards: JSON.stringify(["Star"])
    },
    {
      name: "Monika",
      role: "Vijayawada Counsellor",
      status: "offline",
      initial: "MT",
      color: "text-orange-600",
      bg: "bg-orange-50",
      email: "monika@codegnan.com",
      phone: "9888888888",
      userid: "600392",
      location: "Vijayawada, IN",
      rating: 4.8,
      badges: JSON.stringify(["Top Talent"]),
      awards: JSON.stringify(["Trophy"])
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { email: member.email },
      update: member,
      create: member,
    });
  }
  console.log("Seeded team members.");

  // 3. Create Dashboard Tasks
  const tasks = [
    { text: "Quarterly alignment meeting", time: "10:30 AM", priority: "high", completed: false },
    { text: "Review CRM leads migration", time: "1:15 PM", priority: "medium", completed: true },
    { text: "Security audit - Q1 protocol", time: "4:00 PM", priority: "high", completed: false },
  ];

  for (const task of tasks) {
    await prisma.dashboardTask.create({ data: task });
  }
  console.log("Seeded dashboard tasks.");

  // 4. Create Dashboard Events
  const events = [
    { title: "Batch Kickoff: Python Full Stack", time: "10:00 AM", date: "Today", location: "Vijayawada", iconType: "zap" },
    { title: "Weekly CRM Alignment", time: "02:30 PM", date: "Today", location: "Zoom Sync", iconType: "globe" },
    { title: "Hyderabad Campus Review", time: "04:00 PM", date: "Tomorrow", location: "Hyderabad", iconType: "trending-up" },
  ];

  for (const event of events) {
    await prisma.dashboardEvent.create({ data: event });
  }
  console.log("Seeded dashboard events.");

  // 5. Create Dashboard Mentions
  const mentions = [
    { user: "Monika", initial: "MT", role: "Vijayawada Counsellor", text: "Jan, the Vijayawada batch leads are updated for this week.", time: "2m ago", color: "text-orange-600", bg: "bg-orange-100" },
    { user: "Battula Kranthi Kumar", initial: "BK", role: "Hyderabad Counsellor", text: "Report for Hyderabad Q1 enrollment is ready for review.", time: "15m ago", color: "text-emerald-600", bg: "bg-emerald-100" },
    { user: "Deva Anil Pedda", initial: "DP", role: "Vijayawada Counsellor", text: "New lead converted in the portal from the morning sync.", time: "2h ago", color: "text-indigo-600", bg: "bg-indigo-100" },
  ];

  for (const mention of mentions) {
    await prisma.dashboardMention.create({ data: mention });
  }
  console.log("Seeded dashboard mentions.");

  // 6. CRM Module Data
  const leads = [
    { name: "Varun", email: "varun@example.com", phone: "+917842678078", source: "Direct Call", status: "Follow-up", score: 85 },
    { name: "Prashanth", email: "prashanth@example.com", phone: "+916302838097", source: "Just Dial", status: "New", score: 92 },
    { name: "Sonteena Divya", email: "divya@example.com", phone: "+918886268479", source: "WhatsApp", status: "New", score: 78 },
    { name: "Nanubala", email: "nanubala@example.com", phone: "+917395380508", source: "Suman TV", status: "Follow-up", score: 65 },
    { name: "Maji Sai Nikhil", email: "nikhil@example.com", phone: "+913298471504", source: "WhatsApp", status: "DNP", score: 45 },
  ];

  for (const leadData of leads) {
    const lead = await prisma.lead.create({
      data: {
        ...leadData,
        activities: {
          create: [
            { type: "Call", title: "Initial Discovery Call", dueDate: new Date(), status: "Completed" },
            { type: "Task", title: "Send Brochure", dueDate: new Date(Date.now() + 86400000), status: "Pending" },
          ]
        },
        deals: {
          create: [
            { title: "Full Stack Web Dev Course", value: 45000, stage: "Qualified", probability: 75 }
          ]
        }
      }
    });
    console.log(`Created lead: ${lead.name}`);
  }

  // 7. Finance Module Data
  const invoices = [
    { invoiceNumber: "INV-2024-001", customerName: "Varun", amount: 45000, status: "Paid", dueDate: new Date() },
    { invoiceNumber: "INV-2024-002", customerName: "Prashanth", amount: 35000, status: "Unpaid", dueDate: new Date(Date.now() + 604800000) },
    { invoiceNumber: "INV-2024-003", customerName: "Sonteena Divya", amount: 15000, status: "Overdue", dueDate: new Date(Date.now() - 432000000) },
  ];

  for (const inv of invoices) {
    await prisma.invoice.create({ data: inv });
  }
  console.log("Seeded invoices.");

  const expenses = [
    { category: "Salaries", amount: 6400000, date: new Date(), description: "Monthly staff salaries" },
    { category: "Marketing", amount: 3400000, date: new Date(), description: "Meta and Google Ads" },
    { category: "Infrastructure", amount: 1500000, date: new Date(), description: "Office rent and cloud bills" },
  ];

  for (const exp of expenses) {
    await prisma.expense.create({ data: exp });
  }
  console.log("Seeded expenses.");

  const bankAccounts = [
    { name: "HDFC Primary", balance: 148662611, accountType: "Current" },
    { name: "ICICI Operational", balance: 5523524, accountType: "Current" },
  ];

  for (const acc of bankAccounts) {
    await prisma.bankAccount.create({ data: acc });
  }
  console.log("Seeded bank accounts.");

  // 8. Help Desk Module Data
  const tickets = [
    { subject: "Unable to access course material", description: "Student reporting 404 error on Python module", status: "Open", priority: "High", requesterName: "Varun" },
    { subject: "Payment confirmation pending", description: "Client sent screenshot but status not updated", status: "Pending", priority: "Medium", requesterName: "Prashanth" },
    { subject: "Course completion certificate request", description: "Requesting manual generation of certificate", status: "Resolved", priority: "Low", requesterName: "Anil" },
  ];

  for (const ticket of tickets) {
    await prisma.ticket.create({ data: ticket });
  }
  console.log("Seeded tickets.");

  // 9. Analytics Module Data
  const reports = [
    { title: "Monthly Revenue Growth", description: "Comparison of revenue across all campuses", data: JSON.stringify({ chartType: "Bar", metrics: ["Revenue", "Growth"] }) },
    { title: "Lead Conversion Matrix", description: "Source-wise conversion analysis", data: JSON.stringify({ chartType: "Donut", metrics: ["Source", "Conversion Rate"] }) },
  ];

  for (const report of reports) {
    await prisma.savedReport.create({ data: report });
  }
  console.log("Seeded saved reports.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
