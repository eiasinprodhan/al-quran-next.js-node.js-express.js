const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function request(path) {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message || `Request failed (${res.status})`);
  }

  return res.json();
}

export async function getAllSurahs() {
  const json = await request("/surahs");
  return json.data; // array of 114 surahs
}

export async function getSurahById(id) {
  const json = await request(`/surahs/${id}`);
  return json.data; // surah + ayahs[]
}

export async function searchAyahs(query, page = 1, limit = 20) {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    limit: String(limit),
  });
  return request(`/search?${params}`); // { data, pagination, query }
}