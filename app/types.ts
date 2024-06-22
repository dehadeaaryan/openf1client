
export interface Session {
    circuit_key: number;
    circuit_short_name: string;
    country_code: string;
    country_key: number;
    country_name: string;
    date_end: string;
    date_start: string;
    gmt_offset: string;
    location: string;
    meeting_key: number;
    session_key: number;
    session_name: string;
    session_type: string;
    year: number;
}

export interface DriverInfo {
    session_key: number;
    meeting_key: number;
    broadcast_name: string;
    country_code: string;
    first_name: string;
    full_name: string;
    headshot_url: string;
    last_name: string;
    driver_number: number;
    team_colour: string;
    team_name: string;
    name_acronym: string;
}

export interface DriverInfoWithPosition extends DriverInfo {
    position: number;
}

export interface Position {
    session_key: number;
    meeting_key: number;
    driver_number: number;
    date: string;
    position: number;
}