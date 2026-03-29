const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchFromBackend(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
    if (!response.ok) throw new Error(`Backend fetch failed: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
}

const json = (data: any) => JSON.stringify(data);

export const api = {
  // Leads
  getLeads: (params?: Record<string, string>) => {
    const query = params ? new URLSearchParams(params).toString() : "";
    return fetchFromBackend(`/leads${query ? `?${query}` : ""}`);
  },
  createLead: (data: any) => fetchFromBackend("/leads", { method: "POST", body: json(data) }),
  updateLead: (id: string, data: any) => fetchFromBackend(`/leads/${id}`, { method: "PUT", body: json(data) }),
  deleteLead: (id: string) => fetchFromBackend(`/leads/${id}`, { method: "DELETE" }),
  convertLead: (id: string) => fetchFromBackend(`/leads/${id}/convert`, { method: "POST" }),

  // Contacts
  getContacts: () => fetchFromBackend("/contacts"),
  createContact: (data: any) => fetchFromBackend("/contacts", { method: "POST", body: json(data) }),
  updateContact: (id: string, data: any) => fetchFromBackend(`/contacts/${id}`, { method: "PUT", body: json(data) }),
  deleteContact: (id: string) => fetchFromBackend(`/contacts/${id}`, { method: "DELETE" }),

  // Deals
  getDeals: () => fetchFromBackend("/deals"),
  createDeal: (data: any) => fetchFromBackend("/deals", { method: "POST", body: json(data) }),
  updateDeal: (id: string, data: any) => fetchFromBackend(`/deals/${id}`, { method: "PUT", body: json(data) }),
  deleteDeal: (id: string) => fetchFromBackend(`/deals/${id}`, { method: "DELETE" }),

  // Dashboard / Team / Profile
  getDashboard: () => fetchFromBackend("/dashboard"),
  getTeam: () => fetchFromBackend("/team"),
  getUsers: () => fetchFromBackend("/users"),
  getProfile: (id: string) => fetchFromBackend(`/profile/${id}`),
  updateProfile: (data: any) => fetchFromBackend("/profile", { method: "POST", body: json(data) }),
};
