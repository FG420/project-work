"use client";

import { Card } from "@/components/ui/card";
import { Item } from "@/lib/interfaces";
import { items } from "@/lib/items";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Items() {
  const router = useRouter();

  function trimTitle(title: string, maxLength: number = 30) {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  }

  function clickItem(item: any) {
    console.log(item);

    // Navvigate to item page with the ASIN
    router.push(`/dashboard/items/${item.ASIN}`);
  }

  return (
    <>
      <h2 className="text-2xl">Items Page</h2>

      <div className="items-container" style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {items.map((item) => (
          <Card
            style={{ padding: "1rem", maxWidth: "320px", cursor: "pointer", display: "flex", gap: "10px" }}
            key={item.ASIN}
            onClick={() => clickItem(item)}
          >
            <Image src={"/images/B07D9SB7XW/Image1.jpg"} width={64} height={64} alt="test" />
            <span>
              <h1>{trimTitle(item.Title)}</h1>
              <p>ASIN: {item.ASIN}</p>
              <p>Giacenza: {item.Giacenza}</p>
              <p>Categoria: {item.CategoriaID}</p>
            </span>
          </Card>
        ))}
      </div>
    </>
  );
}
