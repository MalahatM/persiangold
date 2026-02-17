import type { SortKey } from "./sort.types";


export const sortOptions: { label: string; value: SortKey }[] = [
  { label: "Alphabetical: A-Z", value: "title_asc" },
  { label: "Price: Low to High", value: "price_asc" },
];
