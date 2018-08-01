import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "trackDuration"
})
export class TrackDurationPipe implements PipeTransform {
  transform(value: number): any {
    return value.toString().substr(0, 1) + ":" + value.toString().substr(1, 2);
  }
}
