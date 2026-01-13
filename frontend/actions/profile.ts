export const getProfileData = async () => {
  try {
    const res = await fetch("/api/profile", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    return await res.json();
  } catch (err) {
    console.error("Profile fetch failed:", err);
    throw err;
  }
};
