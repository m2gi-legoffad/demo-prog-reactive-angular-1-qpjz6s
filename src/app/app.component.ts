import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  VERSION,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { filter, map, scan, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  L_obsPoints = new BehaviorSubject<Observable<string>[]>([]);
  pointerMove = fromEvent(document.body, 'pointermove');
  pointerUp = fromEvent(document.body, 'pointerup');

  constructor() {}

  startPolygone(evt: PointerEvent): void {
    const filtre = filter((e: PointerEvent) => e.pointerId == evt.pointerId);
    const obs: Observable<string> = this.pointerMove.pipe(
      filtre,
      scan(
        (str, p) => `${str} ${evt.clientX},${evt.clientY`,
        `${evt.clien`X},${evt.clientY`
``      ),
      takeUntil(this.pointerUp.pipe(filtre))
    );

    this.L_obsPoints.next([...this.L_obsPoints.value, obs]);

    //evt.pointerId;
    this.L_obsPoints.value; // -> tableau d'observable de string
  }
}
