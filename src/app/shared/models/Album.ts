import { Artist } from './Artist';
export class Album {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  tracklist: string;
  explicit_lyrics: boolean;
  position: number;
  artist: Artist;
  type: string;
}
