'use client'

import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Affix from '@/components/shared/Affix'
import Card from '@/components/ui/Card'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import { apiGetProductList } from '@/services/ProductService'
import ProductSelectSection from './components/ProductSelectSection'
import CustomerDetailSection from './components/CustomerDetailSection'
import BookingDetailSection from './components/BookingDetailSection'
import Navigator from './components/Navigator'
import { useOrderFormStore } from './store/orderFormStore'
import useLayoutGap from '@/utils/hooks/useLayoutGap'
import useSWR from 'swr'
import isEmpty from 'lodash/isEmpty'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ReactNode } from 'react'
import type {
    GetProductListResponse,
    BookingFormSchema,
    SelectedProduct,
    BaseOrderFormSchema,
} from './types'
import type { TableQueries, CommonProps } from '@/@types/common'

type OrderFormProps = {
    children: ReactNode
    onFormSubmit: (values: BaseOrderFormSchema) => void
    defaultValues?: BookingFormSchema
    defaultProducts?: SelectedProduct[]
    newOrder?: boolean
} & CommonProps

const validationSchema = z.object({
    firstName: z.string().min(1, { message: 'First name required' }),
    lastName: z.string().min(1, { message: 'Last name required' }),
    email: z
        .string()
        .min(1, { message: 'Email required' })
        .email({ message: 'Invalid email' }),
    phone: z.string().min(1, { message: 'Please select your country code' }),
})

const BookingForm = (props: OrderFormProps) => {
    const { onFormSubmit, children, defaultValues, defaultProducts } = props

    const { setProductOption, setProductList, setSelectedProduct } =
        useOrderFormStore()

    const { getTopGapValue } = useLayoutGap()

    useSWR(
        [
            '/api/products',
            {
                pageIndex: '1',
                pageSize: '10',
                query: '',
            },
        ],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetProductList<GetProductListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
            onSuccess: (resp) => {
                const list = resp.list.map(
                    ({ id: value, name: label, img, stock: quantity }) => ({
                        label,
                        value,
                        img,
                        quantity,
                    }),
                )
                setProductList(resp.list)
                setProductOption(list)
            },
        },
    )

    useEffect(() => {
        if (defaultProducts) {
            setSelectedProduct(defaultProducts)
        }
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        return () => {
            setSelectedProduct([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = (values: BaseOrderFormSchema) => {
        onFormSubmit?.(values)
    }

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<BaseOrderFormSchema>({
        defaultValues: {
            ...(defaultValues ? defaultValues : {}),
        },
        resolver: zodResolver(validationSchema),
    })

    return (
        <div className="flex">
            <Form
                className="flex-1 flex flex-col overflow-hidden"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <div className="flex gap-4">
                        <div className="w-[360px] hidden lg:block">
                            <Affix offset={getTopGapValue()}>
                                <Card>
                                    <Navigator />
                                </Card>
                            </Affix>
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col gap-4">
                                <ProductSelectSection />
                                <CustomerDetailSection
                                    control={control}
                                    errors={errors}
                                />
                                <BookingDetailSection
                                    control={control}
                                    errors={errors}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomStickyBar>{children}</BottomStickyBar>
            </Form>
        </div>
    )
}

export default BookingForm
