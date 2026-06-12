export const DEVICE_CATEGORIES = [
  "Smartphones", "Tablets", "Laptops", "Desktops", "Monitors",
  "TVs", "Smart TVs", "LED TVs", "OLED TVs", "QLED TVs", "CRT TVs",
  "Refrigerators", "Freezers", "Washing Machines", "Dryers",
  "Microwave Ovens", "Electric Ovens", "Induction Cookers",
  "Home Theater Systems", "Amplifiers", "Speakers", "DJ Equipment",
  "Gaming Consoles", "PlayStation", "Xbox", "Nintendo",
  "Printers", "UPS Systems", "CCTV Systems", "DVRs", "NVRs",
  "Industrial Boards", "SMPS Boards", "Control Boards"
];

export const REPAIR_STATUSES = [
  { id: "received", label: "Received", color: "bg-blue-500" },
  { id: "diagnosing", label: "Diagnosing", color: "bg-yellow-500" },
  { id: "waiting_parts", label: "Waiting for Parts", color: "bg-orange-500" },
  { id: "repairing", label: "Repairing", color: "bg-indigo-500" },
  { id: "testing", label: "Testing", color: "bg-purple-500" },
  { id: "ready", label: "Ready for Collection", color: "bg-green-500" },
  { id: "delivered", label: "Delivered", color: "bg-emerald-600" },
  { id: "unrepairable", label: "Unrepairable", color: "bg-red-500" },
  { id: "cancelled", label: "Cancelled", color: "bg-gray-500" }
];

export const SHOP_INFO = {
  name: "E Tech All Tech",
  phones: ["+251912606627", "+251929434732"],
  country: "Ethiopia",
  currency: "ETB",
  address: "Addis Ababa, Ethiopia",
  tagline: "Your Premium Electronics Solution"
};

export const USER_ROLES = ["Super Admin", "Admin", "Receptionist", "Technician", "Accountant"];
