import { WalessService } from "src/app/shared/services/waless.service";
import { DeezerService } from "src/app/shared/services/deezer.service";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as playlistActions from "./playlist.actions";
import { map, mergeMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class PlaylistEffect {
  constructor(
    private action$: Actions,
    private deezer: DeezerService,
    private walessService: WalessService
  ) {}

  @Effect()
  loadPlaylists = this.action$.pipe(
    ofType(playlistActions.PlaylistActionTypes.LoadPlaylists),
    mergeMap(() => this.walessService.getPlaylists()),
    map(playlist => new playlistActions.LoadPlaylistsSuccess(playlist)),
    catchError(error => of(new playlistActions.LoadPlaylistFail(error)))
  );

  @Effect()
  loadPlaylist = this.action$.pipe(
    ofType(playlistActions.PlaylistActionTypes.LoadPlaylist),
    map((action: playlistActions.LoadPlaylist) => action.payload),
    mergeMap((playlistIdAndSource: string[]) =>
      this.playlistSource(playlistIdAndSource).pipe(
        map(playlist => new playlistActions.LoadPlaylistSuccess(playlist)),
        catchError(err => of(new playlistActions.LoadPlaylistFail(err)))
      )
    )
  );

  @Effect()
  addPlaylist = this.action$.pipe(
    ofType(playlistActions.PlaylistActionTypes.CreatePlaylist),
    map((action: playlistActions.CreatePlaylist) => action.payload),
    mergeMap((playlistContent: any) =>
      this.walessService.createPlaylist(playlistContent).pipe(
        map(
          playlist => new playlistActions.CreatePlaylistSuccess(<any>playlist)
        ),
        catchError(err => of(new playlistActions.CreatePlaylistFail(err)))
      )
    )
  );

  @Effect()
  deletePlaylist = this.action$.pipe(
    ofType(playlistActions.PlaylistActionTypes.DeletePlaylist),
    map((action: playlistActions.DeletePlaylist) => action.payload),
    mergeMap((playlistId: number) =>
      this.walessService.deletePlaylist(playlistId).pipe(
        map(() => new playlistActions.DeletePlaylistSuccess(playlistId)),
        catchError(err => of(new playlistActions.DeletePlaylistFail(err)))
      )
    )
  );

  private playlistSource(playlistIdAndSource: any) {
    const playlist =
      +playlistIdAndSource[1] === 1
        ? this.deezer.getPlaylist(playlistIdAndSource[0])
        : this.walessService.getPlaylist(playlistIdAndSource[0]);
    return playlist;
  }
}
