import {Injectable} from "@angular/core";
import {of} from "rxjs";

@Injectable()
export class PropertyServiceMock {
  getProperty(id: number) {
    return of({id: 1});
  }
}
