import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  template: '',
})
export class AutoUnsubscribe implements OnDestroy {
  private subscribed$ = new Subject<any>();

  public ngOnDestroy() {
    this.subscribed$.complete();
  }

  protected unsubsribeOnDestroy = (
    source: Observable<any>
  ): Observable<any> => {
    return source.pipe(takeUntil(this.subscribed$));
  };
}
