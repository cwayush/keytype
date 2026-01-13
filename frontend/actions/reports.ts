import { ReportItem } from "./type";

export const fetchReports = async (): Promise<ReportItem[] | null> => {
  try {
    const res = await fetch("/api/reports", {
      cache: "no-store",
      credentials: "omit",
    });

    if (!res.ok) {
      console.error("Reports API failed with status", res.status);
      return null;
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Invalid reports format");
      return null;
    }

    return data as ReportItem[];
  } catch (err) {
    console.error("Error fetching reports:", err);
    return null;
  }
};
