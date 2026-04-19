const BASE = process.env.NEXT_PUBLIC_API_URL || "https://al-quran-task.netlify.app/api";

async function request(path) {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.error || body?.message || `API Error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`❌ Quran API Fetch Failed:
      URL: ${url}
      Error: ${error.message}
    `);

    if (error.message === "Failed to fetch") {
      throw new Error("Could not reach the backend server. Please ensure it is running on port 5000.");
    }
    throw error;
  }
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