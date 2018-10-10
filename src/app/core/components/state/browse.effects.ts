import { Album } from "./../../../shared/models/Album";
import { DeezerService } from "./../../../shared/services/deezer.service";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as browseActions from "../../state/core.actions";
import { mergeMap, map } from "rxjs/operators";

@Injectable()
export class BrowseEffects {
  constructor(private actions$: Actions, private deezer: DeezerService) {}

  @Effect()
  loadChartAlbums = this.actions$.pipe(
    ofType(browseActions.BrowseActionTypes.LoadBrowse),
    mergeMap((action: browseActions.LoadBrowse) =>
      this.deezer
        .getChartAlbums()
        .pipe(
          map((albums: Album[]) => new browseActions.LoadBrowseSuccess(albums))
        )
    )
  );
}
