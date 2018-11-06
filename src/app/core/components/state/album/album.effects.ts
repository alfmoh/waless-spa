import { mergeMap, map, catchError } from "rxjs/operators";
import * as albumActions from "./album.actions";
import { DeezerService } from "./../../../../shared/services/deezer.service";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";

@Injectable()
export class AlbumEffects {
  constructor(private actions$: Actions, private deezer: DeezerService) {}

  @Effect()
  loadAlbum = this.actions$.pipe(
    ofType(albumActions.AlbumActionTypes.LoadAlbum),
    map((action: albumActions.LoadAlbum) => action.payload),
    mergeMap((albumId: number) =>
      this.deezer.getAlbum(albumId).pipe(
        map(album => new albumActions.LoadAlbumSuccess(album)),
        catchError(err => of(new albumActions.LoadAlbumFail(err)))
      )
    )
  );
}
