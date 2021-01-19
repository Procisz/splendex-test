import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MemoryCardModel } from '../models/memory-card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  public revertingDelay: number = 1000;
  public numberOfRotates: number = 0;
  public permissionToRotate: BehaviorSubject<boolean>;
  public mockData: Array<MemoryCardModel> = [
    {
      id: 1,
      title: 'Card 1',
      imageURL: 'assets/images/1.jpeg',
      rotated: false
    },
    {
      id: 2,
      title: 'Card 2',
      imageURL: 'assets/images/2.jpeg',
      rotated: false
    },
    {
      id: 3,
      title: 'Card 3',
      imageURL: 'assets/images/3.jpeg',
      rotated: false
    },
    {
      id: 4,
      title: 'Card 4',
      imageURL: 'assets/images/4.jpeg',
      rotated: false
    },
    {
      id: 5,
      title: 'Card 5',
      imageURL: 'assets/images/5.jpeg',
      rotated: false
    },
    {
      id: 6,
      title: 'Card 6',
      imageURL: 'assets/images/6.jpeg',
      rotated: false
    },
    {
      id: 7,
      title: 'Card 7',
      imageURL: 'assets/images/7.jpeg',
      rotated: false
    },
    {
      id: 8,
      title: 'Card 8',
      imageURL: 'assets/images/8.jpeg',
      rotated: false
    },
    {
      id: 9,
      title: 'Card 9',
      imageURL: 'assets/images/9.jpeg',
      rotated: false
    },
    {
      id: 10,
      title: 'Card 10',
      imageURL: 'assets/images/10.jpeg',
      rotated: false
    },
  ]

  constructor() {
    this.permissionToRotate = new BehaviorSubject<boolean>(true);
  }

  public getCards() {
    return of(this.mockData);
  }

  public increasingNumberOfRotates(): void {
    if (this.numberOfRotates === 0) {
      this.numberOfRotates += 1;
    }
    else if (this.numberOfRotates === 1) {
      this.numberOfRotates += 1;
      this.revertCardsToDefaultPosition();
    }
  }

  public checkCardRotatability(): Observable<boolean> {
    return this.permissionToRotate.asObservable();
  }

  private revertCardsToDefaultPosition() {

    this.numberOfRotates = 0;
    this.permissionToRotate.next(false);

    setTimeout(() => {
      this.permissionToRotate.next(true);

    }, 5000);
  }
}
