const RAW_API_URL = (import.meta.env as Record<string, string>)["VITE_API_URL"] || "http://localhost:5000";
const API_BASE_URL = RAW_API_URL.endsWith("/api") ? RAW_API_URL : `${RAW_API_URL}/api`;

export interface PetApiData {
  _id?: string;
  id?: string;
  petName: string;
  ownerName: string;
  petType: string;
  breed?: string;
  country: string;
  city: string;
  about: string;
  imageUrl: string;
  currentBid: number;
  rank?: number;
  views?: number;
  supportCount?: number;
  createdAt?: string;
}

export interface CreateBidResponse {
  success: boolean;
  message?: string;
  data?: {
    bidId: string;
    petId: string;
    amount: number;
    checkoutUrl: string;
  };
}

export async function fetchAllPets(): Promise<PetApiData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/pets/all`);
    if (!res.ok) throw new Error("Failed to fetch pets");
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("API fetchAllPets error:", err);
    return [];
  }
}

export async function fetchPetsByCountry(country: string): Promise<PetApiData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/pets/country/${encodeURIComponent(country)}`);
    if (!res.ok) throw new Error("Failed to fetch pets by country");
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("API fetchPetsByCountry error:", err);
    return [];
  }
}

export async function createPetApi(petData: {
  petName: string;
  ownerName: string;
  petType: string;
  breed?: string;
  country: string;
  city: string;
  about: string;
  imageUrl: string;
  currentBid: number;
}): Promise<{ success: boolean; data?: PetApiData; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/pets/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(petData),
    });
    const json = await res.json();
    if (!res.ok) {
      return { success: false, message: json.message || "Failed to create pet" };
    }
    return { success: true, data: json.data };
  } catch (err: any) {
    console.error("API createPet error:", err);
    return { success: false, message: err.message || "Network error" };
  }
}

export async function createBidApi(
  petId: string,
  amount: number
): Promise<CreateBidResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/bids/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ petId, amount }),
    });
    const json = await res.json();
    if (!res.ok) {
      return { success: false, message: json.message || "Failed to create bid" };
    }
    return json;
  } catch (err: any) {
    console.error("API createBid error:", err);
    return { success: false, message: err.message || "Network error" };
  }
}

export async function fetchBidsByDate(date: string): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/bids/date?date=${encodeURIComponent(date)}`);
    if (!res.ok) throw new Error("Failed to fetch bids by date");
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("API fetchBidsByDate error:", err);
    return [];
  }
}

export async function incrementPetViewsApi(petId: string): Promise<number | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/pets/${encodeURIComponent(petId)}/views`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to increment views");
    const json = await res.json();
    return json.views ?? null;
  } catch (err) {
    console.error("API incrementPetViewsApi error:", err);
    return null;
  }
}
