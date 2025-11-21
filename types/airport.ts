export interface Airport {
    id: string;
    gmt: string;
    airport_id: string;
    iata_code: string | null;
    city_iata_code: string;
    icao_code: string | null;
    country_iso2: string;
    geoname_id: string;
    latitude: string;
    longitude: string;
    airport_name: string;
    country_name: string | null;
    phone_number: string | null;
    timezone: string;
}

export interface AirportApiResponse {
    data: Airport[]
    pagination?: {
        offset: number
        limit: number
        count: number
        total: number
    }
}
