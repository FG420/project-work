import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const data = [
  {
    id: 1,
    purchaseId: 1,
    ASIN: 9,
    quantity: 3,
    price: 40,
  },
  {
    id: 2,
    purchaseId: 2,
    ASIN: 3,
    quantity: 10,
    price: 89,
  },
  {
    id: 3,
    purchaseId: 3,
    ASIN: 8,
    quantity: 21,
    price: 67,
  },
  {
    id: 4,
    purchaseId: 4,
    ASIN: 5,
    quantity: 40,
    price: 20,
  },
  {
    id: 5,
    purchaseId: 1,
    ASIN: 1,
    quantity: 6,
    price: 30,
  },
];



export default function PurchaseItemsPage({ params }: any) {


  
  const getData = data.filter((prodId) => prodId.purchaseId == params.id);

  return (
    <main>
      <div className="p-4 ">
        <h1 className="font-semibold text-2xl p-1">Items of Purchase {params.id}</h1>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-5">
          {getData.map((item) => (
            <Card className="w-[350px]" key={item.id}>
              <CardHeader>
                <CardTitle>Asin: {item.ASIN}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Qauntity: {item.quantity}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between">
                <CardDescription>Price: {item.price} €</CardDescription>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
