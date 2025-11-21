import { SearchInterface } from '@/components/search-interface';

export default function HomePage() {
    return (
        <main className="">
            <section className='relative bg-[url("/bg-1.png")] bg-no-repeat bg-cover bg-center'>
                <div className="absolute bg-black/80 z-0 w-full h-full" />

                <SearchInterface />
            </section>
        </main>
    );
}
