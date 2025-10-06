'use client'

import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import TrainerListProvider from './_components/TrainerListProvider'
import TrainerListActionTools from './_components/TrainerListActionTools'
import TrainersListTableTools from './_components/TrainersListTableTools'
import TrainerListTableFetcher from './_components/TrainerListTableFetcher'

export default function Page() {
    return (
        <TrainerListProvider>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Trainers</h3>
                            <TrainerListActionTools />
                        </div>
                        <TrainersListTableTools />
                        <TrainerListTableFetcher />
                    </div>
                </AdaptiveCard>
            </Container>
        </TrainerListProvider>
    )
}
