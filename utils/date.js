export function normalDate(dateString) {
  return new Date(dateString).toLocaleString("pl-PL");
}

export const formatDate = (dateString) => {
  const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
  const date = new Date(dateString);
  const dayOfWeek = days[date.getDay()];
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${dayOfWeek} ${day}-${month}-${year}`;
};
