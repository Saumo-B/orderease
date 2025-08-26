
import { getOrderById } from '@/lib/order-data'; // Assuming a server-side data fetching function
import type { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  const { token } = useParams();

  // Fetch order data on the server
  const currentOrder = getOrderById(token as string); // Assuming getOrderById fetches data based on token

  if (!currentOrder) {
    return (
      <Alert>
        <AlertTitle>Order Not Found</AlertTitle>
        <AlertDescription>The order with token {token} could not be found. Please check with the staff.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader className="bg-accent text-accent-foreground p-6 rounded-t-lg">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16" />
          </div>
          <CardTitle className="text-3xl font-headline">Order Placed!</CardTitle>
          <p>Thank you, {currentOrder.customerName}!</p>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-muted-foreground mb-2">Your token number is:</p>
          <p className="text-8xl font-bold text-primary tracking-tighter font-mono animate-pulse">
            {currentOrder.token}
          </p>
          <p className="text-muted-foreground mt-2">We will contact you at {currentOrder.customerPhone} if needed.</p>
          
          <Separator className="my-6" />

          <h3 className="font-bold text-lg mb-2 text-left">Order Summary</h3>
          <div className="space-y-2 text-left text-sm">
            {currentOrder.items.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>INR {(item.price * item.quantity)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total Paid</span>
              <span>INR {currentOrder.total}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Button asChild variant="outline" className="w-full">
                <Link href="/menu">Place Another Order</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
