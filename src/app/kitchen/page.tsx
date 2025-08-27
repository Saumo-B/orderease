'use client';
'use client';

import { OrderCard } from '@/components/OrderCard';
import { useOrder } from '@/context/OrderContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChefHat } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import initialMenuData from '@/lib/data/menu-data.json';
import { useState } from 'react';

export default function KitchenPage() {
  const { orders } = useOrder();
  const newOrders = orders.filter((o) => o.status === 'new');
  const completedOrders = orders.filter((o) => o.status === 'completed');

  // Initialize state with initial data, then check localStorage
  const [menuItems, setMenuItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedStockStatus = localStorage.getItem('outOfStockItems');
      if (savedStockStatus) {
        const outOfStockItems = JSON.parse(savedStockStatus);
        return initialMenuData.map(item => ({
          ...item,
          isOutOfStock: outOfStockItems[item.id] || false,
        }));
      }
    }
    return initialMenuData;
  });

  const toggleStockStatus = (itemId: string) => {
    setMenuItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, isOutOfStock: !item.isOutOfStock } : item
      );

      // Update localStorage
      if (typeof window !== 'undefined') {
        const outOfStockStatus = updatedItems.reduce((acc, item) => {
          if (item.isOutOfStock) {
            acc[item.id] = true;
          }
          return acc;
        }, {} as Record<string, boolean>);
        localStorage.setItem('outOfStockItems', JSON.stringify(outOfStockStatus));
      }

      return updatedItems;
    });
  };


  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-background shadow-sm sticky top-0 z-10">
        <div className="container mx-auto p-4 flex justify-center items-center">
          <div className="flex items-center gap-3 cursor-default">
             <ChefHat className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-headline">Kitchen</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <section>
          <h2 className="text-2xl font-semibold font-headline text-primary mb-4">New Orders ({newOrders.length})</h2>
          {newOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newOrders.map((order) => (
                <OrderCard key={order.token} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-background rounded-lg">
              <p className="text-muted-foreground">No new orders at the moment.</p>
            </div>
          )}
        </section>

        <Separator className="my-12" />

        <section>
          <h2 className="text-2xl font-semibold font-headline text-muted-foreground mb-4">Completed Orders ({completedOrders.length})</h2>
           {completedOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {completedOrders.map((order) => (
                <OrderCard key={order.token} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-background rounded-lg">
              <p className="text-muted-foreground">No orders have been completed yet.</p>
            </div>
          )}
        </section>

        <Separator className="my-12" />

        <section>
          <h2 className="text-2xl font-semibold font-headline text-primary mb-4">
            Menu Stock Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {menuItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-background p-4 rounded-lg shadow-sm">
                <div>
                  <p className={`font-semibold ${item.isOutOfStock ? 'line-through text-muted-foreground' : ''}`}>{item.name}</p>
                  <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <Button
                  variant={item.isOutOfStock ? 'default' : 'outline'}
                  onClick={() => toggleStockStatus(item.id)}
                >
                  {item.isOutOfStock ? 'In Stock' : 'Out of Stock'}
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
