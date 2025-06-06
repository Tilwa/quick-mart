export default function getDriveDirectLink(url) {
  const match = url.match(/\/d\/(.*?)\//);
  if (!match || !match[1]) return url; // fallback to original if not matching
  return `https://drive.google.com/uc?export=view&id=${match[1]}`;
}
