'use client';

import BarChartPurchases from '@/components/charts/bar-chart-purchases';

export default function PurchaseAnalysis () {
    return (
        <main>
            <h1 className='text-center text-2xl p-8 font-semibold'>Purchase Analysis Page</h1>
            <BarChartPurchases />
        </main>
    );
}
