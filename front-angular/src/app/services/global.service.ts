import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// TODO remove that service
@Injectable()
export class GlobalService {

    isProfilOpen = false;
    isProfilOpenSubject = new Subject<boolean>();

    constructor() { }

    emitIsProfilOpenSubject() {
        this.isProfilOpenSubject.next(this.isProfilOpen);
    }

    switchIsProfilOpen(isProfilOpen: boolean) {
        this.isProfilOpen = isProfilOpen;
        this.emitIsProfilOpenSubject();
    }
}
