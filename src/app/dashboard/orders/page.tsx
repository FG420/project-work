import { getOrders } from '@/lib/data-fetching';
import { columns } from '../../../components/table/columns';
import { DataOrderTable } from '../../../components/table/order-data-table';

export default async function OrdersPage () {
    const data = await getOrders();

    return (
        <>
            <div className="container mx-auto py-10 ">
                <DataOrderTable columns={ columns } data={ data } />
            </div>
        </>
    );
}
