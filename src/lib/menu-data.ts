
import type { MenuItem } from './types';
import menuData from './data/menu-data.json';

export function getMenuData(): MenuItem[] {
  // When importing a JSON file directly, Next.js handles parsing it at build time.
  // We just need to cast it to the correct type.
  return menuData as MenuItem[];
}
