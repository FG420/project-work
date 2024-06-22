import { Item } from '@/lib/types';
import ItemsDiplay from './items-dispaly';
import { getItems } from '@/lib/data-fetching';

export default async function Items() {
  const items: Item[] = await getItems();

  return <ItemsDiplay items={items} />;
}
