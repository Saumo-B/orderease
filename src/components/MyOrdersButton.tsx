
'use client';

import { ListOrdered } from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MyOrdersButton() {
  const { myOrders } = useOrder();
  const pathname = usePathname();
  const isActive = pathname === '/my-orders';
  const activeOrders = myOrders.filter((o) => o.status === 'new').length;

  return (
    <Button variant={isActive ? 'default' : 'ghost'} asChild className="relative">
      <Link href="/my-orders" className="flex items-center gap-2">
        <ListOrdered />
        {activeOrders > 0 && (
           <Badge
            variant={isActive ? 'secondary' : 'default'}
            className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0"
          >
            {activeOrders}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
