import { stackMiddlewares } from '@server/middlewares/stacks'
import { withHeaders } from '@server/middlewares/withHeaders'
export default stackMiddlewares([withHeaders])

export const config = {
	matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}
