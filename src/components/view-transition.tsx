import { unstable_ViewTransition as VT, type ViewTransitionProps } from 'react'

export const ViewTransition: React.FC<ViewTransitionProps> = ({
	children,
	...props
}) => <VT {...props}>{children}</VT>
