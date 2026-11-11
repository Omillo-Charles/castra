import {
  LayoutGrid,
  BedDouble,
  Microwave,
  UtensilsCrossed,
  Archive,
  Tv,
  Lamp,
  Briefcase,
  Armchair,
  Gift,
  Shirt,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ReactElement } from "react";

type IconComponent = (props: LucideProps) => ReactElement;

export const CATEGORY_ICONS: Record<string, IconComponent> = {
  "All":               (p) => <LayoutGrid {...p} />,
  "Beddings":          (p) => <BedDouble {...p} />,
  "Home appliances":   (p) => <Microwave {...p} />,
  "Kitchenware":       (p) => <UtensilsCrossed {...p} />,
  "Organizers":        (p) => <Archive {...p} />,
  "Electronics":       (p) => <Tv {...p} />,
  "Decor":             (p) => <Lamp {...p} />,
  "Office Equipments": (p) => <Briefcase {...p} />,
  "Furniture":         (p) => <Armchair {...p} />,
  "Gifts":             (p) => <Gift {...p} />,
  "Clothing":          (p) => <Shirt {...p} />,
};

export function CategoryIcon({ category, ...props }: { category: string } & LucideProps) {
  const Icon = CATEGORY_ICONS[category] ?? CATEGORY_ICONS["All"];
  return <Icon {...props} />;
}
