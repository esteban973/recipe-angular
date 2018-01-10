import { Subject } from 'rxjs/Subject';

export class FlashService {
    flashBag = new Subject<string>();
}
