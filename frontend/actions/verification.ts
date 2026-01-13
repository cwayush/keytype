export const verification = async (token: string) => {
  const res = await fetch(`/api/verification?token=${token}`, {
    method: "GET",
    cache: "no-store",
  });

  return await res.json();
};
