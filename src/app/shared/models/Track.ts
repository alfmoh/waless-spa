import { Album } from "./Album";
import { Artist } from "./Artist";

export interface Track {
  id: number;
  title: string;
  title_short: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  preview: string;
  position: number;
  artist: Artist;
  album: Album;
  type: string;
}

export interface CastTrack {
  id: string;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: string;
  rank: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  time_add: number;
  artist: CastArtist;
  album: CastAlbum;
  type: string;
}

interface CastAlbum {
  id: string;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  tracklist: string;
  type: string;
}

interface CastArtist {
  id: string;
  name: string;
  link: string;
  tracklist: string;
  type: string;
}
