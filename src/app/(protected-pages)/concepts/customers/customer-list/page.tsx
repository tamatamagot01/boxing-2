'use client'

import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import CustomerListProvider from './_components/CustomerListProvider'
import CustomerListActionTools from './_components/CustomerListActionTools'
import CustomersListTableTools from './_components/CustomersListTableTools'
import CustomerListTableFetcher from './_components/CustomerListTableFetcher'

export default function Page() {
    return (
        // 👇 ไม่ต้องส่ง customerList เข้าไป
        <CustomerListProvider>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Customers</h3>
                            <CustomerListActionTools />
                        </div>
                        <CustomersListTableTools />
                        <CustomerListTableFetcher />
                    </div>
                </AdaptiveCard>
            </Container>
        </CustomerListProvider>
    )
}
