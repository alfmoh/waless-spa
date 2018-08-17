import { Howl } from "howler";
import { Track } from "../../shared/models/Track";
import { PlaylistTrack } from "../../shared/models/PlaylistTrack";
import { PlayerEvents } from "../../shared/models/PlayerEvents";

let playing = false;

export function initPlaylist(
  tracks: Track[],
  playerEvents: PlayerEvents
): PlaylistTrack[] {
  return setEvents(
    tracks.map((track: Track) => {
      return <PlaylistTrack>{
        id: track.id,
        playing: false,
        sound: new Howl({ src: [track.preview] })
      };
    }),
    playerEvents
  );
}

function setEvents(playlist: PlaylistTrack[], playerEvents: PlayerEvents): PlaylistTrack[] {
  playlist.forEach(track => {
    track.sound.on("end", () => {
      togglePlaying();
      playerEvents.onEnd$.emit(null);
      playerEvents.playing$.emit(playing);
    });

    track.sound.on("stop", () => {
      togglePlaying();
      playerEvents.onStop$.emit(null);
      playerEvents.playing$.emit(playing);
    });

    track.sound.on("play", () => {
      togglePlaying();
      playerEvents.onPlay$.emit(null);
      playerEvents.playing$.emit(playing);
    });

    track.sound.on("pause", () => {
      togglePlaying();
      playerEvents.onPause$.emit(null);
      playerEvents.playing$.emit(playing);
    });

  });
  return playlist;
}

function togglePlaying() {
  return (playing = !playing);
}

export function newSong(playlist: PlaylistTrack[], index: number): PlaylistTrack[] {
  let newSong = playlist[index];
  play(newSong);
  return playlist;
}

export function stop(song: PlaylistTrack) {
  song.sound.stop();
  song.playing = false;
}

export function play(song: PlaylistTrack) {
  song.sound.play();
  song.playing = true;
}

export function pause(song: PlaylistTrack) {
  song.sound.pause();
  song.playing = false;
}
