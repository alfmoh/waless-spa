import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "trackDuration"
})
export class TrackDurationPipe implements PipeTransform {
  transform(value: number, prependMins: boolean): any {
    if (value <= 60) return this.dotToColon(value);
    else if (value <= 3600) return this.toMinutes(value, prependMins);
    else if (value > 3600) return this.toHours(value);
  }

  private toMinutes(seconds: number, prependMins: boolean) {
    const value = seconds / 60;
    const result = this.format(value);
    if (value.toString().length < 2) return `${value}:00`;
    const colonValue = this.dotToColon(result);
    const valueBeforeColon = colonValue.slice(0, colonValue.indexOf(":"));
    const valueAfterColon = colonValue.slice(
      colonValue.indexOf(":") + 1,
      colonValue.length
    );
    if (valueAfterColon.length === 1) {
      if (prependMins)
        return +valueAfterColon === 1
          ? `${valueBeforeColon} minutes : 0${valueAfterColon}second`
          : `${valueBeforeColon} minutes : 0${valueAfterColon}seconds`;
      return `${valueBeforeColon}:0${valueAfterColon}`;
    }
    return prependMins
      ? `${valueBeforeColon} minutes : ${valueAfterColon}seconds`
      : colonValue;
  }

  private toHours(seconds: number) {
    const value = seconds / 3600;
    const valStr = value.toString();
    if (valStr.length < 2) return valStr + " hours";
    const result = this.format(value);
    const numColon = this.dotToColon(result);
    const strArr = numColon.split("");
    const colonIndex = strArr.indexOf(":");
    +strArr[colonIndex - 1] > 1
      ? strArr.splice(colonIndex, 0, " hours ")
      : strArr.splice(colonIndex, 0, " hour ");
    strArr.splice(colonIndex + 2, 0, " ");
    strArr.push("mins");
    return strArr.join("");
  }

  private format(value: number) {
    const roundUp = Math.round((value + 0.00001) * 100) / 100;
    const strRoundUp = roundUp.toString();
    const dotIndex = strRoundUp.indexOf(".");
    let wholeNum = +strRoundUp.slice(0, dotIndex);
    let decimalNum = +strRoundUp.slice(dotIndex + 1, strRoundUp.length);
    while (decimalNum > 59) {
      wholeNum++;
      decimalNum = this.modulus60(decimalNum);
    }
    const result = `${wholeNum}.${decimalNum}`;
    return result;
  }

  private dotToColon(value: string | number): string {
    const valueToString = value.toString();
    if (valueToString.includes(".")) return valueToString.replace(".", ":");
    return valueToString;
  }

  private modulus60(value: number) {
    return value % 60;
  }
}
