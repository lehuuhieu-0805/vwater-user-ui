import { FilterOptions } from "./header.model";

export const headerFilters = [
  {
    id: FilterOptions.quickFilter.id,
    lable: FilterOptions.quickFilter.name,
    options: [
      { value: 1, label: "Khuyến mãi" },
      { value: 2, label: "Quán mở cửa" },
    ],
  },
  {
    id: FilterOptions.arrangeFilter.id,
    lable: FilterOptions.arrangeFilter.name,
    options: [
      { value: 1, label: "Bán chạy nhất" },
      { value: 2, label: "A-Z" },
      { value: 3, label: "Z-A" },
    ],
  },
  {
    id: FilterOptions.menuFilter.id,
    lable: FilterOptions.menuFilter.name,
    options: [
      { value: 1, label: "Satori" },
      { value: 2, label: "Viva" },
      { value: 3, label: "Miocen" },
    ],
  },
];
