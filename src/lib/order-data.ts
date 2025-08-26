import type { Order } from '@/lib/types';

export function getOrderById(token: string): Order | null {
  // Hardcoded dummy order for testing
  const dummyOrder: Order = {
    token: "dummy-token-123",
    customerName: "John Doe",
    customerPhone: "555-1234",
    items: [
      {
        id: "item-1",
        name: "Burger",
        price: 10,
        quantity: 2,
        imageUrl: "/images/burger.png",
        description: "Delicious burger"
      },
      {
        id: "item-2",
        name: "Fries",
        price: 3,
        quantity: 1,
        imageUrl: "/images/fries.png",
        description: "Crispy fries"
      },
    ],
    total: 23, // 10*2 + 3*1
    timestamp: Date.now(),
  };

  if (token === "dummy-token-123") {
    return dummyOrder;
  } else {
    return null;
  }
}