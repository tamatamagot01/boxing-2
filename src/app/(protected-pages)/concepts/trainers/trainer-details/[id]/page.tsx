import TrainerDetails from './_components/TrainerDetails'
import NoUserFound from '@/assets/svg/NoUserFound'
import getTrainer from '@/server/actions/getTrainer'
import isEmpty from 'lodash/isEmpty'

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params

    const data = await getTrainer(params)

    if (isEmpty(data)) {
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <NoUserFound height={280} width={280} />
                <h2 className="mt-4">No trainer found!</h2>
            </div>
        )
    }

    return <TrainerDetails data={data} />
}
