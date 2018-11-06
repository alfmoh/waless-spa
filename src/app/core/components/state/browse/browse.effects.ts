import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as browseActions from "../../../state/core.actions";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { DeezerService } from "src/app/shared/services/deezer.service";
import { Album } from "src/app/shared/models/Album";

@Injectable()
export class BrowseEffects {
  constructor(private actions$: Actions, private deezer: DeezerService) {}

  @Effect()
  loadChartAlbums = this.actions$.pipe(
    ofType(browseActions.BrowseActionTypes.LoadBrowse),
    mergeMap((action: browseActions.LoadBrowse) =>
      this.deezer.getChartAlbums().pipe(
        map((albums: Album[]) => new browseActions.LoadBrowseSuccess(albums)),
        catchError(error => of(new browseActions.LoadBrowseFail(error)))
      )
    )
  );
}
