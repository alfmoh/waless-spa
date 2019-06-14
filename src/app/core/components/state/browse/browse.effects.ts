import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as browseActions from "../../../state/core.actions";
import { map, catchError, switchMap } from "rxjs/operators";
import { of, forkJoin } from "rxjs";
import { DeezerService } from "src/app/shared/services/deezer.service";

@Injectable()
export class BrowseEffects {
  constructor(private actions$: Actions, private deezer: DeezerService) {}

  @Effect()
  loadBrowseCharts = this.actions$.pipe(
    ofType(browseActions.BrowseActionTypes.LoadBrowse),
    switchMap(() =>
      forkJoin([this.deezer.getChartAlbums(), this.deezer.getChartPlaylists(), this.deezer.getChartArtists()])
    ),
    map(data => new browseActions.LoadBrowseSuccess(data)),
    catchError(error => of(new browseActions.LoadBrowseFail(error)))
  );
}
