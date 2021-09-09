import { Component } from "@angular/core";
import { Observable } from "rxjs/observable";
import { switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

declare const require;
const xml2js = require("xml2js");

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  employees$: Observable<Array<any>>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.employees$ = this.getEmployees();
  }

  getEmployees() {
    return this.http
      .get("/assets/alljava.xml", { responseType: "text" })
      .pipe(
        switchMap(async xml => await this.parseXmlToJson(xml))
      );
  }

  async parseXmlToJson(xml) {
    // With parser
    /* const parser = new xml2js.Parser({ explicitArray: false });
    parser
      .parseStringPromise(xml)
      .then(function(result) {
        console.log(result);
        console.log("Done");
      })
      .catch(function(err) {
        // Failed
      }); */

    // Without parser
    return await xml2js
      .parseStringPromise(xml, { explicitArray: false })
      .then(response => {
        return response.article.sect1
      });
  }
}
