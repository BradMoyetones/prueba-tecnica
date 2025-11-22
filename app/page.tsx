import { SearchInterface } from '@/components/search-interface';

export default function HomePage() {
    return (
        <main className="">
            <section className='relative bg-no-repeat bg-cover bg-center'>
                {/* Interfaz principal de busqueda y renderización de Aeropuertos */}
                <SearchInterface />
            </section>
        </main>
    );
}
