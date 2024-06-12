import { Card } from '@/components/ui/card';
import { items } from '@/lib/items';

export default function Items() {
  function trimTitle(title: string, maxLength: number = 30) {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  }

  return (
    <>
      <h1 style={{ fontSize: '3rem' }}>Items Page</h1>

      <div
        className="items-container"
        style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}
      >
        {items.map((item) => (
          <Card
            style={{ padding: '1rem', minWidth: '320px', cursor: 'pointer' }}
            key={item.ASIN}
          >
            <h1>{trimTitle(item.Title)}</h1>
            <p>ASIN: {item.ASIN}</p>
            <p>Giacenza: {item.Giacenza}</p>
            <p>Categoria: {item.CategoriaID}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
