import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Generates a unique 18-digit ID as a String.
 * Using String instead of BigInt for IDs resolves serialization 
 * and Prisma Studio issues while keeping the numeric look.
 */
function generateId(): string {
  const base = 878600000000000000n;
  const randomPart = BigInt(Math.floor(Math.random() * 99999999999999));
  const id = base + randomPart;
  return id.toString();
}

async function main() {
  // Clear existing data
  await prisma.cRMActivity.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.account.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.dashboardTask.deleteMany();
  await prisma.dashboardEvent.deleteMany();
  await prisma.dashboardMention.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.bankAccount.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.savedReport.deleteMany();

  // 1. Create users with different roles
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const users = [
    { email: "superadmin@codegnan.com", name: "Super Admin", role: "SUPER_ADMIN" },
    { email: "admin@codegnan.com", name: "Administrator", role: "ADMINISTRATOR" },
    { email: "ops@codegnan.com", name: "Operations Head", role: "OPERATIONS_HEAD" },
    { email: "saleshead@codegnan.com", name: "Sales Head", role: "SALES_HEAD" },
    { email: "salesmanager@codegnan.com", name: "Sales Manager", role: "SALES_MANAGER" },
    { email: "sales@codegnan.com", name: "Sales Profile", role: "SALES_PROFILE" },
    { email: "telecaller@codegnan.com", name: "Tele Caller", role: "TELE_CALLER" },
    { email: "frontdesk@codegnan.com", name: "Front Desk", role: "FRONT_DESK" },
    { email: "associate@codegnan.com", name: "Associate Admin", role: "ASSOCIATE_ADMIN" },
    { email: "standard@codegnan.com", name: "Standard User", role: "STANDARD" },
  ];

  for (const userData of users) {
    const userId = generateId();
    await prisma.user.create({
      data: {
        id: userId,
        ...userData,
        password: hashedPassword,
        profile: {
          create: {
            id: generateId(),
            bio: `Hello, I am a ${userData.role} at Codegnan.`,
            location: "Guntur, IN",
            phone: "9705243061",
            skills: JSON.stringify(["Next.js", "React", "Prisma"]),
          }
        }
      },
    });
  }
  console.log("Seeded users and profiles.");

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
      awards: JSON.stringify(["Trophy", "Award"]) 
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
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.create({
      data: { id: generateId(), ...member },
    });
  }
  console.log("Seeded team members.");

  // 3. Create Dashboard Tasks
  const tasks = [
    { text: "Quarterly alignment meeting", time: "10:30 AM", priority: "high", completed: false },
    { text: "Review CRM leads migration", time: "1:15 PM", priority: "medium", completed: true },
  ];

  for (const task of tasks) {
    await prisma.dashboardTask.create({ data: { id: generateId(), ...task } });
  }
  console.log("Seeded dashboard tasks.");

  // 4. Create Dashboard Events
  const events = [
    { title: "Batch Kickoff: Python Full Stack", time: "10:00 AM", date: "Today", location: "Vijayawada", iconType: "zap" },
  ];

  for (const event of events) {
    await prisma.dashboardEvent.create({ data: { id: generateId(), ...event } });
  }
  console.log("Seeded dashboard events.");

  // 5. Create Dashboard Mentions
  const mentions = [
    { user: "Monika", initial: "MT", role: "Vijayawada Counsellor", text: "Jan, batch leads updated.", time: "2m ago", color: "text-orange-600", bg: "bg-orange-100" },
  ];

  for (const mention of mentions) {
    await prisma.dashboardMention.create({ data: { id: generateId(), ...mention } });
  }
  console.log("Seeded dashboard mentions.");

  // 6. CRM Module Data
  const leads = [
    { name: "Varun", email: "varun@example.com", phone: "+917842678078", source: "Direct Call", status: "Follow-up", score: 85 },
    { name: "Prashanth", email: "prashanth@example.com", phone: "+916302838097", source: "Just Dial", status: "New", score: 92 },
  ];

  for (const leadData of leads) {
    await prisma.lead.create({
      data: {
        id: generateId(),
        ...leadData,
        activities: {
          create: [
            { id: generateId(), type: "Call", title: "Initial Discovery", dueDate: new Date(), status: "Completed" },
          ]
        },
        deals: {
          create: [
            { id: generateId(), title: "Full Stack Web Dev", value: 45000, stage: "Qualified", probability: 75 }
          ]
        }
      }
    });
  }
  console.log("Seeded leads.");

  // 7. Finance Module Data
  const invoices = [
    { invoiceNumber: "INV-2024-001", customerName: "Varun", amount: 45000, status: "Paid", dueDate: new Date() },
  ];

  for (const inv of invoices) {
    await prisma.invoice.create({ data: { id: generateId(), ...inv } });
  }
  console.log("Seeded invoices.");

  const expenses = [
    { category: "Salaries", amount: 6400000, date: new Date(), description: "Monthly staff salaries" },
  ];

  for (const exp of expenses) {
    await prisma.expense.create({ data: { id: generateId(), ...exp } });
  }
  console.log("Seeded expenses.");

  const bankAccounts = [
    { name: "HDFC Primary", balance: 148662611, accountType: "Current" },
  ];

  for (const acc of bankAccounts) {
    await prisma.bankAccount.create({ data: { id: generateId(), ...acc } });
  }
  console.log("Seeded bank accounts.");

  // 8. Help Desk Module Data
  const tickets = [
    { subject: "Unable to access material", description: "404 error", status: "Open", priority: "High", requesterName: "Varun" },
  ];

  for (const ticket of tickets) {
    await prisma.ticket.create({ data: { id: generateId(), ...ticket } });
  }
  console.log("Seeded tickets.");

  // 9. Analytics Module Data
  const reports = [
    { title: "Revenue Growth", description: "Monthly review", data: JSON.stringify({ metrics: ["Revenue"] }) },
  ];

  for (const report of reports) {
    await prisma.savedReport.create({ data: { id: generateId(), ...report } });
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
