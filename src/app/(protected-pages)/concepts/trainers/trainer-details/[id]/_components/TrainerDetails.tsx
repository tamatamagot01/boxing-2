'use client'

import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import ProfileSection from './ProfileSection'
import BillingSection from './BillingSection'
import ActivitySection from './ActivitySection'
import type { Trainer } from '../types'

type TrainerDetailsProps = {
    data: Trainer
}

const { TabNav, TabList, TabContent } = Tabs

const TrainerDetails = ({ data }: TrainerDetailsProps) => {
    return (
        <div className="flex flex-col xl:flex-row gap-4">
            <div className="min-w-[330px] 2xl:min-w-[400px]">
                <ProfileSection data={data} />
            </div>
            <Card className="w-full">
                <Tabs defaultValue="billing">
                    <TabList>
                        <TabNav value="billing">Billing</TabNav>
                        <TabNav value="activity">Activity</TabNav>
                    </TabList>
                    <div className="p-4">
                        <TabContent value="billing">
                            <BillingSection data={data} />
                        </TabContent>
                        <TabContent value="activity">
                            <ActivitySection
                                trainerName={data.name}
                                id={data.id}
                            />
                        </TabContent>
                    </div>
                </Tabs>
            </Card>
        </div>
    )
}

export default TrainerDetails
