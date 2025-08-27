
'use client';

import { Header } from '@/components/Header';
import { getMenuData } from '@/lib/menu-data';
import type { MenuItem } from '@/lib/types';
import { MenuItemCard } from '@/components/MenuItemCard'; 
import { useState, useEffect } from 'react';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const initialMenuData = getMenuData();
    let outOfStockItems: { [key: string]: boolean } = {};
    if (typeof window !== 'undefined') {
      const storedStatus = localStorage.getItem('outOfStockItems');
      if (storedStatus) {
        outOfStockItems = JSON.parse(storedStatus);
      }
    }

    const updatedMenuItems = initialMenuData.map(item => ({
      ...item,
      isOutOfStock: outOfStockItems[item.id] || false,
    }));
    setMenuItems(updatedMenuItems);
  }, []);
  return (
    <>
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Our Menu</h1>
          <p className="text-lg text-muted-foreground mt-2">Freshly prepared, just for you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
          {menuItems.map((item: MenuItem) => (
            <MenuItemCard 
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </main>
    </>
  );
}
