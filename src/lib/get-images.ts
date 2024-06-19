import fs from 'fs';
import path from 'path';

export function getImages(asin: string) {
  const imageDir = path.join(process.cwd(), 'public', 'images', asin);
  let images: string[] = [];

  try {
    images = fs.readdirSync(imageDir).filter((file) => /^Image\d+\.jpg$/.test(file));
  } catch (error) {
    console.error('Failed to load images:', error);
  }

  return images;
}
