import { Track } from "./Track";

export interface Playlist {
  playlistId: number;
  id: number;
  title: string;
  description: string;
  duration: number;
  public: boolean;
  is_loved_track: boolean;
  collaborative: boolean;
  nb_tracks: number;
  fans: number;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  checksum: string;
  tracklist: string;
  creation_date: string;
  creator: Creator;
  type: string;
  tracks: Track[];
}

interface Creator {
  id: string;
  name: string;
  tracklist: string;
  type: string;
}
