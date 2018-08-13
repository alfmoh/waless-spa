import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customSlice"
})
export class CustomSlice implements PipeTransform {
  transform(value: string, requiredCharNum: number): any {
    if (value.length > requiredCharNum)
      return value.slice(0, requiredCharNum) + "...";

    return value;
  }
}
