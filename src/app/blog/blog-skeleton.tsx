import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card'
import { Badge } from '@ui/badge'
import { Skeleton } from '@ui/skeleton'
export function BlogSkeleton() {
	return (
    <div className='grid gap-8'>
      {Array.from({length: 10}).map((_, id) => (
        <Card key={id} className='overflow-hidden'>
          <CardHeader className='pb-2'>
            <div className='flex items-start justify-between'>
              <Badge variant='outline' className='mb-2 border border-primary'>
                <Skeleton className='h-4 w-16' />
              </Badge>
              <span className='text-muted-foreground text-sm'>
                <Skeleton className='h-4 w-20' />
              </span>
            </div>
            <CardTitle className='transition-colors hover:text-primary'>
              <Skeleton className='h-6 w-full' />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className='h-16 w-full' />
          </CardContent>
          <CardFooter className='flex items-center justify-between'>
            <Skeleton className='h-4 w-24' />
            <div className='mt-2 flex w-4/5 flex-wrap justify-end gap-2'>
              {Array.from({length: 3}).map((_, i) => (
                <Badge key={i} variant='outline'>
                  <Skeleton className='h-4 w-12' />
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
	)
}
