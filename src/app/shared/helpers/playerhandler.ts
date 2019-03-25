import { Store } from "@ngrx/store";
import { BehaviorSubject } from "rxjs";
import { PlayerService } from "./../../core/services/player.service";
import { Injectable } from "@angular/core";
import { DeezerService } from "../services/deezer.service";
import { Track } from "../models/Track";
import { sampleTracks } from "../temp/_lorem";
import { LoadQueueSuccess, LoadQueue } from "src/app/core/components/state/queue/queue.actions";

@Injectable({
  providedIn: "root"
})
export class PlayerHanlder {
  tracks$ = new BehaviorSubject<any>(sampleTracks);
  siteTitle;
  private queueIndexer = 0;
  queueArr = [];
  private interval: any;

  constructor(
    private playerService: PlayerService,
    private deezer: DeezerService,
    private store: Store<any>
  ) { }

  initTracks(tracks: Track[]): void {
    this.queueArr = [];

    this.looper(this.queueIndexer, tracks);
    this.interval = setInterval(() => {
      this.looper(this.queueIndexer + 1, tracks);
    }, 7000);
    this.playerService.init(tracks);
  }

  private looper(index, tracks) {
    for (let i = index; i < tracks.length; i++) {
      this.deezer.getTrack(tracks[i].id).subscribe(t => {
        this.queueArr.push(t);
        if (this.queueArr.length >= tracks.length) {
          this.queueIndexer = 0;
          this.tracks$.next(this.queueArr);
          clearInterval(this.interval);
          this.store.dispatch(new LoadQueueSuccess(this.queueArr));
        }
      });
      this.queueIndexer = i;
      if (i !== 0 && i % 48 === 0) {
        break;
      }
    }
  }

  play(index) {
    this.store.dispatch(new LoadQueue());
    isNaN(parseFloat(index))
      ? this.playerService.play(this.queueArr)
      : this.playerService.playNew(index, this.queueArr);
  }

  pause() {
    this.playerService.pause();
  }

  stop() {
    this.playerService.stop();
  }

  next() {
    this.playerService.playNext(this.queueArr);
  }

  previous() {
    this.playerService.playPrevious(this.queueArr);
  }

  isPlaying() {
    return this.playerService.playing;
  }

  onEnd() {
    this.next();
  }

  startAlbum(album) {
    if (!album.tracks) {
      this.deezer
        .getTrackList(album.tracklist)
        .subscribe((tracks: Track[]) => this.processTracks(tracks));
    } else {
      this.processTracks(album.tracks.data);
    }
  }

  startSelectedTrack(tracks, trackIndex) {
    this.processTracks(tracks, trackIndex);
  }

  initializeQueue(tracks, index, isQueue) {
    this.processTracks(tracks, index, isQueue);
  }

  private processTracks(tracks: any, index = null, isQueue = false) {
    if (isQueue) this.playerService.init(tracks);
    else {
      this.initTracks(tracks);
      if (isNaN(parseFloat(index))) this.playerService.index = 0;
    }
    this.play(index);
  }
}
