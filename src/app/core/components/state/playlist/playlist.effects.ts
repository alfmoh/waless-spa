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
    mergeMap((playlistId: number) =>
      this.playlistSource(playlistId).pipe(
        map(playlist => new playlistActions.LoadPlaylistSuccess(playlist)),
        catchError(err => of(new playlistActions.LoadPlaylistFail(err)))
      )
    )
  );

  private playlistSource(playlistId: number) {
    const playlist = this.deezer.getPlaylist(playlistId);
    return playlist;
  }
}
