import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

  const fallbackData = {
    followers: "6",
    engagementRate: "N/A",
    reach: "N/A",
    reels: [
      { id: 1, title: "PC Setup", views: "N/A", likes: "49", comments: "0", img: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=600&q=80" }
    ]
  };

  if (!token || !accountId || token.includes("PASTE_YOUR")) {
    return NextResponse.json(fallbackData);
  }

  try {
    const url = "https://graph.facebook.com/v19.0/" + accountId + "?fields=followers_count,media{media_url,thumbnail_url,like_count,comments_count,media_type}&access_token=" + token;
    const res = await fetch(url);
    const json = await res.json();

    if (json.error) {
      console.error("Meta API Error:", json.error.message);
      return NextResponse.json(fallbackData);
    }

    const formatNumber = (num: number) => {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
      if (num >= 1000) return (num / 1000).toFixed(1) + "K";
      return num.toString();
    };

    const followers = json.followers_count ? formatNumber(json.followers_count) : fallbackData.followers;
    let reels = fallbackData.reels;

    if (json.media && json.media.data) {
      reels = json.media.data.slice(0, 4).map((item: any, idx: number) => ({
        id: item.id || idx,
        title: "Recent Post",
        views: "N/A",
        likes: item.like_count ? formatNumber(item.like_count) : "0",
        comments: item.comments_count ? formatNumber(item.comments_count) : "0",
        img: item.thumbnail_url || item.media_url || fallbackData.reels[idx]?.img || fallbackData.reels[0].img
      }));
    }

    return NextResponse.json({ ...fallbackData, followers, reels });
  } catch (error) {
    console.error("Fetch failed:", error);
    return NextResponse.json(fallbackData);
  }
}
