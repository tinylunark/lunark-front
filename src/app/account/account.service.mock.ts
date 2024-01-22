import {Injectable} from "@angular/core";

@Injectable()
export class AccountServiceMock {
  getRole() {
    return 'GUEST';
  }
}
