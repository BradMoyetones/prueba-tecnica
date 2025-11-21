import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { AirportDetails } from './components/airport-details'

interface AirportPageProps {
    params: Promise<{
        id: string
    }>  
}

export default async function AirportPage({ params }: AirportPageProps) {
    const { id } = await params

    return (
        <main className="min-h-screen bg-background">
            <Suspense
                fallback={
                    <div className="flex items-center justify-center min-h-screen">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                }
            >
                <AirportDetails airportId={id} />
            </Suspense>
        </main>
    )
}
