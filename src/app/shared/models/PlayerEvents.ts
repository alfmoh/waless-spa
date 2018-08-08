import { EventEmitter } from "@angular/core";

export interface PlayerEvents {
  onEnd$: EventEmitter<any>;
  onStop$: EventEmitter<any>;
  onPlay$: EventEmitter<any>;
  onPause$: EventEmitter<any>;
  playing$: EventEmitter<any>;
}
