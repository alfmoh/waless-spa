import { Genre } from "./Genre";
import { Artist } from "./Artist";
import { Track } from "./Track";

export interface Album {
  id: number;
  title: string;
  upc: string;
  link: string;
  share: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  genre_id: number;
  genres: Genre;
  label: string;
  nb_tracks: number;
  duration: number;
  fans: number;
  rating: number;
  release_date: string;
  record_type: string;
  available: boolean;
  tracklist: string;
  explicit_lyrics: boolean;
  contributors: any[];
  position: number;
  artist: Artist;
  type: string;
  tracks: Track;
}
