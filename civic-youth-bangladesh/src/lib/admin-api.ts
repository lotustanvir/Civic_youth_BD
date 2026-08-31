const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function adminFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}/admin${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    throw new Error("Unauthorized");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "Request failed");
  }

  return data;
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "Login failed");
  }

  return data;
}

export async function adminLogout() {
  await adminFetch("/logout", { method: "POST" });
}

export async function adminMe() {
  return adminFetch("/me");
}

export async function adminGetStats() {
  return adminFetch("/stats");
}

export async function adminGetMemberships(page = 1, limit = 10) {
  return adminFetch(`/memberships?page=${page}&limit=${limit}`);
}

export async function adminGetMembershipById(id: string) {
  return adminFetch(`/memberships/${id}`);
}

export async function adminUpdateMembershipStatus(id: string, status: string) {
  return adminFetch(`/memberships/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function adminGetVolunteers(page = 1, limit = 10) {
  return adminFetch(`/volunteers?page=${page}&limit=${limit}`);
}

export async function adminGetVolunteerById(id: string) {
  return adminFetch(`/volunteers/${id}`);
}

export async function adminUpdateVolunteerStatus(id: string, status: string) {
  return adminFetch(`/volunteers/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function adminGetPartnerships(page = 1, limit = 10) {
  return adminFetch(`/partnerships?page=${page}&limit=${limit}`);
}

export async function adminGetPartnershipById(id: string) {
  return adminFetch(`/partnerships/${id}`);
}

export async function adminUpdatePartnershipStatus(id: string, status: string) {
  return adminFetch(`/partnerships/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function adminGetContacts(page = 1, limit = 10) {
  return adminFetch(`/contacts?page=${page}&limit=${limit}`);
}

export async function adminGetContactById(id: string) {
  return adminFetch(`/contacts/${id}`);
}

export async function adminMarkContactRead(id: string) {
  return adminFetch(`/contacts/${id}/read`, { method: "PATCH" });
}
