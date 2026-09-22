export const entityTypeOptions = [
  { value: "hotel", label: "Hotel" },
  { value: "restaurant", label: "Restaurant" },
  { value: "lounge", label: "Lounge" },
  { value: "bar", label: "Bar" },
  { value: "tour_operator", label: "Tour Operator" },
  { value: "travel_agent", label: "Travel Agent" },
  { value: "hospitality_org", label: "Hospitality Organization" },
  { value: "other", label: "Other" },
] as const;

export type EntityTypeValue = (typeof entityTypeOptions)[number]["value"];

// Entity types that use the hotel-specific fields (room count, bed spaces, facilities).
export const HOTEL_LIKE_TYPES: EntityTypeValue[] = ["hotel"];

// Entity types that use the seating/service-type fields.
export const DINING_LIKE_TYPES: EntityTypeValue[] = ["restaurant", "lounge", "bar"];

export const hotelFacilityOptions = [
  "Swimming Pool",
  "Gym",
  "Free WiFi",
  "Restaurant",
  "Bar",
  "Conference Room",
  "Parking",
  "Air Conditioning",
  "Laundry Service",
  "24-Hour Security",
  "Elevator",
  "Room Service",
];

export const diningServiceTypeOptions = [
  "Dine-In",
  "Takeout",
  "Delivery",
  "Live Music",
  "Outdoor Seating",
  "Catering",
  "Private Events",
  "Bar Service",
];
