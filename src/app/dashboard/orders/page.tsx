import { getOrders } from '@/lib/data-fetching';
import { columns } from '../../../components/table/columns';
import { DataOrderTable } from '../../../components/table/order-data-table';

export default async function OrdersPage () {
    const data = await getOrders();

    return (
        <>
            <div className=" ">
                <DataOrderTable columns={ columns } data={ data } />
            </div>
        </>
    );
}
