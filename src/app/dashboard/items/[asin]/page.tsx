import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import fs from "fs";
import Image from "next/image";
import path from "path";

const ItemPage = ({ params }) => {
  console.log(params);
  const { asin } = params;

  const imageDir = path.join(process.cwd(), "public", "images", asin);

  let images: string[] = [];

  try {
    images = fs.readdirSync(imageDir).filter((file) => /^Image\d+\.jpg$/.test(file));
  } catch (error) {
    console.error("Failed to load images:", error);
  }

  return (
    <div className="flex items-center" style={{ border: "3px solid black" }}>
      <h1>Item Page</h1>
      <p>ASIN: {asin}</p>

      {images.length > 0 ? (
        <Carousel style={{ border: "1px solid red", width: "500px", height: "500px" }}>
          <CarouselContent>
            {images.map((filename, index) => (
              <CarouselItem key={index}>
                <Image
                  src={`/images/${asin}/${filename}`}
                  style={{ height: "500px !important" }}
                  width={500}
                  height={200}
                  alt={`Item ${index + 1}`}
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
  );
};

export default ItemPage;
