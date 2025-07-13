import prisma from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth"; // path to your auth config

export default async function handler(req, res) {
  const session = await auth(req);

  // ✅ Only allow admin
  if (!session || session.user.email !== "shahrukhaltaf123@gmail.com") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const data = await prisma.analytics.findMany();

    const sessions = data.length;
    const visitors = new Set(data.map((d) => d.sessionId)).size;
    const pageviews = data.length;
    const bounceRate =
      data.length > 0
        ? (data.filter((d) => d.bounce).length / data.length) * 100
        : 0;

    const hourlyStats = Array.from({ length: 24 }, (_, hour) => {
      const entries = data.filter(
        (d) => new Date(d.timestamp).getHours() === hour
      );
      return {
        hour,
        sessions: entries.length,
        visitors: new Set(entries.map((d) => d.sessionId)).size,
      };
    });

    const countryStats = {};
    data.forEach((d) => {
      const country = d.country;
      countryStats[country] = (countryStats[country] || 0) + 1;
    });

    res.status(200).json({
      sessions,
      visitors,
      pageviews,
      bounceRate,
      hourlyStats,
      countryStats,
    });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Server Error" });
  }
}
