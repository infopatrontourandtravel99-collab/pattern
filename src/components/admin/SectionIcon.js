import { CarFront, House, Images, Info, LayoutDashboard, LayoutGrid, Luggage, MapPin, Newspaper, Phone, Sparkles, UsersRound } from "lucide-react";

const icons = {
  dashboard: LayoutDashboard,
  settings: Phone,
  home: House,
  about: Info,
  team: UsersRound,
  packages: Luggage,
  destinations: MapPin,
  vehicles: CarFront,
  photos: Images,
  categories: LayoutGrid,
  experiences: Sparkles,
  blog: Newspaper,
};

export default function SectionIcon({ name, ...props }) {
  const Icon = icons[name] || LayoutDashboard;
  return <Icon aria-hidden="true" {...props} />;
}
