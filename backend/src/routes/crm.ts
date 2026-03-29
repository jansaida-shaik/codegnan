import { Router } from "express";
import { prisma } from "../index";
import bcrypt from "bcryptjs";

const router = Router();

// Leads Routes
router.get("/leads", async (req, res) => {
  try {
    const { status, source, search, page = "1", limit = "50" } = req.query;
    
    const where: any = {};
    if (status) where.status = status;
    if (source) where.source = source;
    if (search) {
      where.OR = [
        { name: { contains: String(search) } },
        { email: { contains: String(search) } },
        { phone: { contains: String(search) } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [leads, totalCount] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take,
        include: {
          deals: true,
          activities: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.lead.count({ where }),
    ]);

    res.json({
      data: leads,
      pagination: {
        total: totalCount,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCount / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

router.post("/leads", async (req, res) => {
  try {
    const { name, email, phone, mobile, walkInCounsellor, source, status, score, userId } = req.body;
    if (!name || !phone) return res.status(400).json({ error: "Name and phone are required" });
    const lead = await prisma.lead.create({
      data: { 
        name, 
        email: email || "", 
        phone, 
        mobile: mobile || "",
        walkInCounsellor: walkInCounsellor || "",
        source: source || "Direct Call", 
        status: status || "New", 
        score: score || 0,
        userId: userId || null
      },
      include: { assignedTo: true }
    });
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ error: "Failed to create lead" });
  }
});

router.put("/leads/:id", async (req, res) => {
  try {
    const { name, email, phone, mobile, walkInCounsellor, source, status, score, userId } = req.body;
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: { 
        name, email, phone, mobile, walkInCounsellor, source, status, 
        score: score ? Number(score) : undefined,
        userId: userId || undefined
      },
      include: { assignedTo: true }
    });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead" });
  }
});

router.delete("/leads/:id", async (req, res) => {
  try {
    await prisma.lead.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete lead" });
  }
});

// Dashboard Routes
router.get("/dashboard", async (req, res) => {
  try {
    const [tasks, events, mentions, leadCounts, statusCounts, sourceCounts, todaysLeads] = await Promise.all([
      prisma.dashboardTask.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.dashboardEvent.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.dashboardMention.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.lead.count(),
      prisma.lead.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
      prisma.lead.groupBy({
        by: ["source"],
        _count: { _all: true },
      }),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { assignedTo: true }
      }),
    ]);

    const stats = {
      totalLeads: leadCounts,
      newLeads: statusCounts.find((s: any) => s.status === "New")?._count._all || 0,
      followUpLeads: statusCounts.find((s: any) => s.status === "Follow-up")?._count._all || 0,
      dnpLeads: statusCounts.find((s: any) => s.status === "DNP")?._count._all || 0,
    };

    res.json({ 
      tasks, 
      events, 
      mentions, 
      stats,
      todaysLeads: todaysLeads.map((l: any) => ({
        name: l.name,
        email: l.email,
        phone: l.phone,
        mobile: l.mobile,
        walkInCounsellor: l.walkInCounsellor,
        source: l.source,
        status: l.status,
        owner: l.assignedTo?.name || "Admin",
      })),
      statusCounts: statusCounts.map((s: any) => ({ name: s.status, value: s._count._all })),
      sourceCounts: sourceCounts.map((s: any) => ({ name: s.source, value: s._count._all })),
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

// Team Routes
router.get("/team", async (req, res) => {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { name: "asc" },
    });
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

// Users Route (for dropdowns)
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
      orderBy: { name: "asc" },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Profile Routes
router.get("/profile/:id", async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: req.params.id },
    });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

router.post("/profile", async (req, res) => {
  try {
    const { id, name, email, ...rest } = req.body;
    
    // First update the core user fields
    await prisma.user.update({
      where: { id },
      data: { name, email }
    });

    // Then upsert the profile metadata
    const profile = await prisma.profile.upsert({
      where: { userId: id },
      update: { ...rest },
      create: { userId: id, ...rest },
      include: { user: true }
    });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Deals Routes
router.get("/deals", async (req, res) => {
  try {
    const deals = await prisma.deal.findMany({
      include: { lead: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});

router.put("/deals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { stage, probability } = req.body;
    
    const deal = await prisma.deal.update({
      where: { id },
      data: { stage, probability: Number(probability) },
      include: { lead: true }
    });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: "Failed to update deal" });
  }
});

router.post("/deals", async (req, res) => {
  try {
    const { title, value, stage, probability, closeDate, leadId } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    const deal = await prisma.deal.create({
      data: {
        title,
        value: Number(value) || 0,
        stage: stage || "Qualified",
        probability: Number(probability) || 10,
        closeDate: closeDate ? new Date(closeDate) : null,
        leadId: leadId || null,
      },
      include: { lead: true },
    });
    res.status(201).json(deal);
  } catch (error) {
    res.status(500).json({ error: "Failed to create deal" });
  }
});

router.delete("/deals/:id", async (req, res) => {
  try {
    await prisma.deal.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete deal" });
  }
});

// Contacts Routes
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

router.post("/contacts", async (req, res) => {
  try {
    const { name, email, phone, accountId } = req.body;
    if (!name || !phone) return res.status(400).json({ error: "Name and phone are required" });
    const contact = await prisma.contact.create({
      data: { name, email: email || "", phone, accountId: accountId || null },
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Failed to create contact" });
  }
});

router.put("/contacts/:id", async (req, res) => {
  try {
    const { name, email, phone, accountId } = req.body;
    const contact = await prisma.contact.update({
      where: { id: req.params.id },
      data: { name, email, phone, accountId: accountId || null },
    });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact" });
  }
});

router.delete("/contacts/:id", async (req, res) => {
  try {
    await prisma.contact.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// Lead Conversion Tool
router.post("/leads/:id/convert", async (req, res) => {
  try {
    const { id } = req.params;
    
    // 1. Fetch the lead
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: { deals: true, activities: true }
    });
    
    if (!lead) return res.status(404).json({ error: "Lead not found" });

    // 2. We use a transaction to safely convert the lead into a Contact
    const result = await prisma.$transaction(async (tx) => {
      // 2a. Create the Contact
      const newContact = await tx.contact.create({
        data: {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          userId: lead.userId,
        }
      });

      // 2b. Move Deals over to Contact
      await tx.deal.updateMany({
        where: { leadId: lead.id },
        data: { contactId: newContact.id, leadId: null as any }
      });

      // 2c. Move Activities over
      await tx.cRMActivity.updateMany({
        where: { leadId: lead.id },
        data: { contactId: newContact.id, leadId: null as any }
      });

      // 2d. Delete the original Lead
      await tx.lead.delete({ where: { id: lead.id } });

      return newContact;
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to convert lead" });
  }
});

// Auth Routes
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user || !user.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});
export default router;
