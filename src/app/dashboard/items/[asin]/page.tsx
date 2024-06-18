import DeleteItem from '@/components/delete-item';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import UpdateStock from '@/components/update-stock';
import axiosInstanceServer from '@/lib/axios-server';
import { getImages } from '@/lib/get-images';
import { Item } from '@/lib/types';

async function getItem(asin: string) {
  const res = await axiosInstanceServer.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Item/${asin}`,
  );
  return res.data;
}

export default async function ItemPage({ params }: any) {
  const { asin } = params;
  const item: Item = await getItem(asin);
  const images: string[] = getImages(asin);

  return (
    <div className="flex" style={{ height: '90vh' }}>
      <div className="mt-6">
        {images.length > 0 ? (
          <Carousel
            opts={{
              align: 'end',
            }}
            style={{ width: '450px', marginLeft: '80px', marginRight: '60px' }}
          >
            <CarouselContent>
              {images.map((filename, index) => (
                <CarouselItem key={index}>
                  <img
                    src={`/images/${asin}/${filename}`}
                    style={{ width: '500px', height: '500px' }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <p>No images found.</p>
        )}
      </div>

      <div className="mt-6">
        <p className="text-3xl uppercase font-extrabold">{item.title}</p>
        <p className="mt-1 uppercase text-sm opacity-75">
          {item.category.description} | ASIN: {item.asin}
        </p>
        <p className="mt-1">Stock: {item.stock}</p>

        <hr />

        <div className="flex gap-3 mt-4">
          <UpdateStock asin={asin} stock={item.stock} />
          <DeleteItem asin={asin} />
        </div>
      </div>
    </div>
  );
}
