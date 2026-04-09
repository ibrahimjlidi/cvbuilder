export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateTime = (date: Date | string): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const daysAgo = (date: Date | string): string => {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
};

export const calculateSuccessRate = (
  totalApplications: number,
  successCount: number
): string => {
  if (totalApplications === 0) return "0%";
  const rate = (successCount / totalApplications) * 100;
  return `${rate.toFixed(1)}%`;
};

export const statusBadgeColor = (
  status: string
): "default" | "destructive" | "outline" | "secondary" => {
  switch (status.toLowerCase()) {
    case "accepted":
    case "interview":
      return "default";
    case "rejected":
      return "destructive";
    case "offer":
      return "secondary";
    default:
      return "outline";
  }
};
