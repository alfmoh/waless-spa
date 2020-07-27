import { Howl } from "howler";

export interface PlaylistTrack {
  id: number;
  playing: boolean;
  sound: Howl;
}
