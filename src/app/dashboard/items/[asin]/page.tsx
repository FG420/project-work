import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import axiosInstance from '@/lib/axios';
import { Item } from '@/lib/types';
import fs from 'fs';
import Image from 'next/image';
import path from 'path';

async function getItem(asin: string) {
  console.log(asin);

  const res = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Item/${asin}`,
  );
  return res.data;
}

export default async function ItemPage({ params }: any) {
  console.log(params);
  const { asin } = params;

  const item: Item = await getItem(asin);
  const imageDir = path.join(process.cwd(), 'public', 'images', asin);

  let images: string[] = [];

  try {
    images = fs.readdirSync(imageDir).filter((file) => /^Image\d+\.jpg$/.test(file));
  } catch (error) {
    console.error('Failed to load images:', error);
  }

  return (
    <div style={{ border: '3px solid black', display: 'flex' }}>
      {images.length > 0 ? (
        <Carousel
          opts={{
            align: 'end',
          }}
          style={{ border: '1px solid black', width: '450px', marginLeft: '80px' }}
        >
          <CarouselContent>
            {images.map((filename, index) => (
              <CarouselItem key={index}>
                {/* <Image
                  src={`/images/${asin}/${filename}`}
                  width={1500}
                  height={200}
                  alt={`Item ${index + 1}`}
                /> */}
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

      <div>
        <p className="uppercase text-sm opacity-75">{item.categoryName}</p>
        <p className="text-3xl uppercase">{item.title}</p>
        <p>ASIN: {asin}</p>
      </div>
    </div>
  );
}
