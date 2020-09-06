import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  // a subject egy speciális Obseravable: a Subject has state, it keeps a list of observers.
  // a BehaviorSubject emlékszik is a Subject által utoljára emittelt értékre
  // a BehaviorSubject-nek mindig kell egy default érték
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // így más nem fér hozzá a loadingSubject-hez, de a loading mindig ugyanezt emaitteli, mint a loadingSubject
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    // az of egy rxjs factory method, ami az initial value-ját emitteli (jelen esetben null)
    // a tap-pel lehet triggerelni vmi side effectet
    // a concatMap fogja a source observable-t, jelen esetben a null-t és átalakítja egy új observable-é
    return of(null)
      .pipe(
        tap(() => this.loadingOn()),
        concatMap(() => obs$),
        finalize(() => this.loadingOff())
      );
  }

  private loadingOn() {
    // a next() -tel lehet új value-t emittelni a subjectből
    this.loadingSubject.next(true);
  }

  private loadingOff() {
    this.loadingSubject.next(false);
  }
}
