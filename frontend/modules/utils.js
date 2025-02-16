export function formatDate(dateString) {
  return new Date(dateString).toLocaleString("hr-HR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
