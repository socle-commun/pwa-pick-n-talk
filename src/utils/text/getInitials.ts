export default function getInitials(name: string): string {
  const parts = name.split(" ");
  let initials = "";
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length > 0 && parts[i] !== "") {
      initials += parts[i].charAt(0);
      if (initials.length >= 2) {
        break; // Stop after getting two initials
      }
    }
  }
  return initials.toUpperCase();
}
