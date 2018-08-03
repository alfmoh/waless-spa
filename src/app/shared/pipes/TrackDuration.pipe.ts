import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "trackDuration"
})
export class TrackDurationPipe implements PipeTransform {
  transform(value: number): any {
    const valStr = value.toString();
    let secs = +valStr.slice(valStr.indexOf(".") + 1, valStr.length);
    let min = +valStr.slice(0, valStr.indexOf("."));

    if (secs <= 59) {
      if (secs.toString().length < 2) return min + ":" + "0" + secs;
      return min + ":" + secs;
    }

    min = min + 1;
    secs = secs % 60;
    return this.transform(+(min + "." + secs));
  }
}
