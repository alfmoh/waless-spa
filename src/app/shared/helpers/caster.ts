import { Album } from "../models/Album";

export function albumCaster(album: Album) {
  return {
    id: album.id,
    title: album.title,
    cover: album.cover,
    cover_small: album.cover_small,
    cover_medium: album.cover_medium,
    cover_big: album.cover_big,
    cover_xl: album.cover_xl,
    tracklist: album.tracklist,
    type: album.type
  };
}
