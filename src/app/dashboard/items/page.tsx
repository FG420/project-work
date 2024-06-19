import ItemsDiplay from './items-dispaly';
import { getItems } from '@/lib/data-fetching';

export default async function Items() {
  const items = await getItems();

  return <ItemsDiplay items={items} />;
}
