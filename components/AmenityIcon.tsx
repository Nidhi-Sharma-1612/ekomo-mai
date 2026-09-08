import {
  Check,
  Wifi,
  Wind,
  Flame,
  Dumbbell,
  Waves,
  WashingMachine,
  Refrigerator,
  Tv,
  ParkingCircle,
  Car,
  Siren,
  ShieldAlert,
  HeartPulse,
  ArrowUpDown,
  Bath,
  UtensilsCrossed,
  Lock,
  Camera,
  PawPrint,
  CigaretteOff,
  Sparkles,
  Sofa,
  type LucideIcon,
} from "lucide-react";

const PATTERNS: [RegExp, LucideIcon][] = [
  [/wi-?fi|internet|wireless/i, Wifi],
  [/air condition|a\/c\b/i, Wind],
  [/heat/i, Flame],
  [/gym|fitness/i, Dumbbell],
  [/pool|hot tub|spa|jacuzzi/i, Waves],
  [/wash(ing|er)/i, WashingMachine],
  [/dry(er|ing)/i, WashingMachine],
  [/fridge|refrigerator/i, Refrigerator],
  [/\btv\b|television|netflix|streaming/i, Tv],
  [/elevator|lift/i, ArrowUpDown],
  [/parking garage|parking lot/i, ParkingCircle],
  [/parking|driveway/i, Car],
  [/smoke detector/i, Siren],
  [/carbon monoxide/i, ShieldAlert],
  [/first aid/i, HeartPulse],
  [/bath|shower|hair dryer/i, Bath],
  [/kitchen|cooking|dishes/i, UtensilsCrossed],
  [/lock|safe|security/i, Lock],
  [/camera|surveillance/i, Camera],
  [/pet/i, PawPrint],
  [/no smoking|smoke-?free/i, CigaretteOff],
  [/clean(ing)?|essentials/i, Sparkles],
  [/sofa|couch|living/i, Sofa],
];

/** Best-effort icon for a free-text amenity label (Hostaway sends plain strings, no category ids). */
export function getAmenityIcon(amenity: string): LucideIcon {
  const match = PATTERNS.find(([pattern]) => pattern.test(amenity));
  return match ? match[1] : Check;
}
