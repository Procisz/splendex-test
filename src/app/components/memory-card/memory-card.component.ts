import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MemoryCardModel } from 'src/app/models/memory-card.model';
import { CardsService } from 'src/app/services/cards.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss']
})

export class MemoryCardComponent implements OnInit {
  @Input() public item: MemoryCardModel;
  public isCardRotated: boolean = false;
  public isCardRotetable: boolean = false;
  private cardChange: Subscription;
  private unSub = new Subject();
  @Output() cardClick = new EventEmitter();

  constructor(public cardsSercice: CardsService) { }

  ngOnInit(): void {
    this.cardChange = this.cardsSercice.checkCardRotatability()
      .pipe(takeUntil(this.unSub))
      .subscribe((result) => {
        this.isCardRotetable = result;
        // console.log('result: ', result);
      });
  }

  public rotateCard(): void {
    if (this.isCardRotetable) {
      this.isCardRotated = !this.isCardRotated;
      this.cardsSercice.increasingNumberOfRotates();
      this.cardClick.emit(this.item);
    }
  }

  ngOnDestroy(): void {
    this.unSub.next();
    this.unSub.complete();
  }
}
