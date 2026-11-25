import { CarFront, House, Info, LayoutDashboard, Luggage, MapPin, Phone, UsersRound } from "lucide-react";

const icons = {
  dashboard: LayoutDashboard,
  settings: Phone,
  home: House,
  about: Info,
  team: UsersRound,
  packages: Luggage,
  destinations: MapPin,
  vehicles: CarFront,
};

export default function SectionIcon({ name, ...props }) {
  const Icon = icons[name] || LayoutDashboard;
  return <Icon aria-hidden="true" {...props} />;
}
