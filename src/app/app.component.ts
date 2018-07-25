import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  values;

  constructor(private http:HttpClient) {
    this.values = http.get("http://localhost:5000/api/values");
  }
}
