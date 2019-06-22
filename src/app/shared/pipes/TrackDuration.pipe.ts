import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "trackDuration"
})
export class TrackDurationPipe implements PipeTransform {
  transform(value: number): any {
    if (value <= 60) return this.dotToColon(value);
    else if (value <= 3600) return this.toMinutes(value);
    else if (value > 3600) return this.toHours(value);
  }

  private toMinutes(seconds) {
    const value = seconds / 60;
    const valStr = value.toString();
    if (valStr.length < 2) return `${valStr}:00`;
    return this.dotToColon(Math.round((value + 0.00001) * 100) / 100);
  }

  private toHours(seconds) {
    const value = seconds / 3600;
    const valStr = value.toString();
    if (valStr.length < 2) return valStr + " hours";
    const numColon = this.dotToColon(Math.round((value + 0.00001) * 100) / 100);
    const strArr = numColon.split("");
    const colonIndex = strArr.indexOf(":");
    +strArr[colonIndex - 1] > 1
      ? strArr.splice(colonIndex, 0, " hours ")
      : strArr.splice(colonIndex, 0, " hour ");
    strArr.splice(colonIndex + 2, 0, " ");
    strArr.push("mins");
    return strArr.join("");
  }

  private dotToColon(value): string {
    const valueToString = value.toString();
    if (valueToString.includes(".")) return valueToString.replace(".", ":");
    return valueToString;
  }
}
