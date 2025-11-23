'use client'

import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import UserListProvider from './_components/UserListProvider'
import UserListActionTools from './_components/UserListActionTools'
import UsersListTableTools from './_components/UsersListTableTools'
import UserListTableFetcher from './_components/UserListTableFetcher'

export default function Page() {
    return (
        // 👇 ไม่ต้องส่ง userList เข้าไป
        <UserListProvider>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Users</h3>
                            <UserListActionTools />
                        </div>
                        <UsersListTableTools />
                        <UserListTableFetcher />
                    </div>
                </AdaptiveCard>
            </Container>
        </UserListProvider>
    )
}
