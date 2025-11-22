import type { Airport, AirportApiResponse } from '@/types/airport';

// Data de ejemplo antes de hacer peticiones API
const mockAirports: Airport[] = [
    {
        id: '5586279',
        gmt: '-10',
        airport_id: '1',
        iata_code: 'AAA',
        city_iata_code: 'AAA',
        icao_code: 'NTGA',
        country_iso2: 'PF',
        geoname_id: '6947726',
        latitude: '-17.05',
        longitude: '-145.41667',
        airport_name: 'Anaa',
        country_name: 'French Polynesia',
        phone_number: null,
        timezone: 'Pacific/Tahiti',
    },
    {
        id: '5586280',
        gmt: '10',
        airport_id: '2',
        iata_code: 'AAB',
        city_iata_code: 'AAB',
        icao_code: 'YARY',
        country_iso2: 'AU',
        geoname_id: '7730796',
        latitude: '-26.7',
        longitude: '141.04167',
        airport_name: 'Arrabury',
        country_name: 'Australia',
        phone_number: null,
        timezone: 'Australia/Brisbane',
    },
    {
        id: '5586281',
        gmt: '2',
        airport_id: '3',
        iata_code: 'AAC',
        city_iata_code: 'AAC',
        icao_code: 'HEAR',
        country_iso2: 'EG',
        geoname_id: '6297289',
        latitude: '31.133333',
        longitude: '33.75',
        airport_name: 'El Arish International Airport',
        country_name: 'Egypt',
        phone_number: null,
        timezone: 'Africa/Cairo',
    },
    {
        id: '5586282',
        gmt: '1',
        airport_id: '4',
        iata_code: 'AAE',
        city_iata_code: 'AAE',
        icao_code: 'DABB',
        country_iso2: 'DZ',
        geoname_id: '2570559',
        latitude: '36.821392',
        longitude: '7.811857',
        airport_name: 'Les Salines',
        country_name: null,
        phone_number: null,
        timezone: 'Africa/Algiers',
    },
    {
        id: '5586283',
        gmt: '-5',
        airport_id: '5',
        iata_code: 'AAF',
        city_iata_code: 'AAF',
        icao_code: 'KAAF',
        country_iso2: 'US',
        geoname_id: '4146153',
        latitude: '29.733334',
        longitude: '-84.98333',
        airport_name: 'Apalachicola Regional',
        country_name: 'United States',
        phone_number: null,
        timezone: 'America/New_York',
    },
    {
        id: '5586284',
        gmt: '-3',
        airport_id: '6',
        iata_code: 'AAG',
        city_iata_code: 'AAG',
        icao_code: 'SSYA',
        country_iso2: 'BR',
        geoname_id: '3471795',
        latitude: '-24.103611',
        longitude: '-49.79',
        airport_name: 'Arapoti',
        country_name: 'Brazil',
        phone_number: null,
        timezone: 'America/Sao_Paulo',
    },
    {
        id: '5586285',
        gmt: '1',
        airport_id: '7',
        iata_code: 'AAH',
        city_iata_code: 'AAH',
        icao_code: 'EDKA',
        country_iso2: 'DE',
        geoname_id: '3207669',
        latitude: '50.75',
        longitude: '6.133333',
        airport_name: 'Aachen/Merzbruck',
        country_name: 'Germany',
        phone_number: null,
        timezone: 'Europe/Berlin',
    },
    {
        id: '5586286',
        gmt: '-3',
        airport_id: '8',
        iata_code: 'AAI',
        city_iata_code: 'AAI',
        icao_code: 'SWRA',
        country_iso2: 'BR',
        geoname_id: '7668483',
        latitude: '-12.916667',
        longitude: '-46.933334',
        airport_name: 'Arraias',
        country_name: 'Brazil',
        phone_number: null,
        timezone: 'America/Araguaina',
    },
    {
        id: '5586288',
        gmt: '12',
        airport_id: '10',
        iata_code: 'AAK',
        city_iata_code: 'AAK',
        icao_code: 'NGUK',
        country_iso2: 'KI',
        geoname_id: '7521791',
        latitude: '0.166667',
        longitude: '173.58333',
        airport_name: 'Aranuka',
        country_name: 'Kiribati',
        phone_number: null,
        timezone: 'Pacific/Tarawa',
    },
    {
        id: '5586289',
        gmt: '1',
        airport_id: '11',
        iata_code: 'AAL',
        city_iata_code: 'AAL',
        icao_code: 'EKYT',
        country_iso2: 'DK',
        geoname_id: '2624887',
        latitude: '57.08655',
        longitude: '9.872241',
        airport_name: 'Aalborg',
        country_name: 'Denmark',
        phone_number: null,
        timezone: 'Europe/Copenhagen',
    },
    {
        id: '5586290',
        gmt: '2',
        airport_id: '12',
        iata_code: 'AAM',
        city_iata_code: 'AAM',
        icao_code: 'FAMD',
        country_iso2: 'ZA',
        geoname_id: '7668229',
        latitude: '-24.8',
        longitude: '31.533333',
        airport_name: 'Mala Mala',
        country_name: 'South Africa',
        phone_number: null,
        timezone: 'Africa/Johannesburg',
    },
    {
        id: '5586291',
        gmt: '4',
        airport_id: '13',
        iata_code: 'AAN',
        city_iata_code: 'AAN',
        icao_code: 'OMAL',
        country_iso2: 'AE',
        geoname_id: '6300095',
        latitude: '24.260231',
        longitude: '55.616627',
        airport_name: 'Al Ain',
        country_name: 'United Arab Emirates',
        phone_number: null,
        timezone: 'Asia/Dubai',
    },
    {
        id: '5586293',
        gmt: '3',
        airport_id: '15',
        iata_code: 'AAQ',
        city_iata_code: 'AAQ',
        icao_code: 'URKA',
        country_iso2: 'RU',
        geoname_id: '6300989',
        latitude: '44.9',
        longitude: '37.316666',
        airport_name: 'Anapa',
        country_name: 'Russia',
        phone_number: null,
        timezone: 'Europe/Moscow',
    },
];

// Simulación de delay para mostrar estado de carga en modo Pruebas
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Busqueda cacheada
export function searchAirportsCached(cachedData: Airport[], query: string, offset = 0, limit = 12): AirportApiResponse {
    const lowerQuery = query.toLowerCase().trim();

    const filtered = lowerQuery
        ? cachedData.filter(
              (airport) =>
                  airport.airport_name.toLowerCase().includes(lowerQuery) ||
                  airport.iata_code?.toLowerCase().includes(lowerQuery) ||
                  airport.icao_code?.toLowerCase().includes(lowerQuery) ||
                  airport.city_iata_code.toLowerCase().includes(lowerQuery) ||
                  airport.country_name?.toLowerCase().includes(lowerQuery)
          )
        : cachedData;

    const paginatedData = filtered.slice(offset, offset + limit);

    return {
        data: paginatedData,
        pagination: {
            offset,
            limit,
            count: paginatedData.length,
            total: filtered.length,
        },
    };
}

// Busqueda API
export async function searchAirportsApi(query: string, offset = 0, limit = 10): Promise<AirportApiResponse> {
    /*
    // Simulación de llamada API
    await delay(100);

    // Filtrar data basados en la query
    const lowerQuery = query.toLowerCase().trim();

    const filtered = mockAirports.filter(
        (airport) => {
            if (!lowerQuery) return true;

            return(
                airport.airport_name.toLowerCase().includes(lowerQuery) ||
                airport.airport_id.toLowerCase().includes(lowerQuery)
            )
        }
    );

    const paginatedData = filtered.slice(offset, offset + limit)

    return {
        pagination: {
            count: filtered.length,
            limit,
            offset,
            total: filtered.length
        },
        data: paginatedData
    };
    */

    // Implementacion real de API
    try {
        const API_KEY = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY;
        const API_URL = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_URL;

        const response = await fetch(
            `${API_URL}/airports?access_key=${API_KEY}&search=${query}&limit=${limit}&offset=${offset}`,
            {
                next: { revalidate: 3600 }, // Cache por 1 hora (3600 segundos)
            }
        );

        if (!response.ok) {
            throw new Error('Fallo al buscar aeropuertos');
        }

        const data = await response.json();

        return {
            data: data.data,
            pagination: data.pagination,
        };
    } catch (error) {
        console.error('Error haciendo fetch:', error);
        throw error;
    }
}
