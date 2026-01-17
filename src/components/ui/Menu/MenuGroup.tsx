import { useContext } from 'react'
import classNames from 'classnames'
import { GroupContextProvider } from './context/groupContext'
import MenuContext from './context/menuContext'
import type { CommonProps } from '../@types/common'
import type { ReactNode } from 'react'

export interface MenuGroupProps extends CommonProps {
    label: string | ReactNode
}

const MenuGroup = (props: MenuGroupProps) => {
    const { label, children, className } = props

    const { sideCollapsed } = useContext(MenuContext)

    const menuGroupDefaultClass = 'menu-group'
    const menuGroupClass = classNames(menuGroupDefaultClass, className)

    return (
        <div className={menuGroupClass}>
            {!sideCollapsed && (
                <div className="mx-3 border-t border-gray-700/50 mt-4 mb-2" />
            )}
            {label && !sideCollapsed && (
                <div className={classNames('menu-title')}>{label}</div>
            )}
            <GroupContextProvider value={null}>
                <ul>{children}</ul>
            </GroupContextProvider>
        </div>
    )
}

MenuGroup.displayName = 'MenuGroup'

export default MenuGroup
