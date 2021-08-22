import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Constructor } from './constructor.type';

export function SubscriptionHandler<T extends Constructor<any>>(Base: T) {
  return class extends Base implements OnDestroy {
    subscriptionHandler$: Subject<never>;

    constructor(...args: any[]) {
      super(...args);
      this.subscriptionHandler$ = new Subject();
    }

    ngOnDestroy() {
      this.subscriptionHandler$.next();
      this.subscriptionHandler$.complete();
    }
  };
}
