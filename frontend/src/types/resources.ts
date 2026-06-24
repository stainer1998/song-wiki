export interface Country {
  id: number
  name: string
  iso_code: string
}

export interface Genre {
  id: number
  name: string
  slug: string
  description: string
}

export interface RecordLabel {
  id: number
  name: string
  slug: string
  country: number | null
  country_name: string | null
  founded_year: number | null
}

export interface Person {
  id: number
  full_name: string
  slug: string
  birth_date: string | null
  death_date: string | null
  nationality: number | null
  nationality_name: string | null
  bio: string
}

export interface Artist {
  id: number
  name: string
  slug: string
  artist_type: 'solo' | 'orchestra'
  bio: string
  formed_year: number | null
  disbanded_year: number | null
  nationality: number | null
  nationality_name: string | null
  genres: number[]
}

export interface Album {
  id: number
  title: string
  slug: string
  artist: number
  artist_name: string | null
  release_year: number | null
  release_date: string | null
  record_label: number | null
  record_label_name: string | null
  album_type: 'studio' | 'live' | 'compilation' | 'ep' | 'single'
  genres: number[]
}

export interface Song {
  id: number
  title: string
  slug: string
  duration: number | null
  year: number | null
  lyrics: string
  genres: number[]
}

export interface Track {
  id: number
  album: number
  song: number
  song_title: string | null
  track_number: number
  disc_number: number
  duration_override: number | null
  is_bonus: boolean
}

export interface SongCredit {
  id: number
  song: number
  song_title: string | null
  person: number
  person_name: string | null
  role: string
  role_display: string | null
  instrument: string
  as_name: string
}
