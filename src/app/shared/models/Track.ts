import { Album } from "./Album";

import { Artist } from "./Artist";

export class Track {
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

