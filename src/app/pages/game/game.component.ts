import { Component, OnInit } from '@angular/core';
import { MemoryCardModel } from 'src/app/models/memory-card.model';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public cardList: MemoryCardModel[] = [];
  private compareCardList: MemoryCardModel[] = [];

  constructor(private cardsSercice: CardsService) { }

  ngOnInit(): void {
    this.cardsSercice.getCards().subscribe((result) => {
      if (result) {
        this.cardList = result
      }
    })
  }

  public createArrayForCompare(card: MemoryCardModel) {
    if (!this.compareCardList.length) {
      this.compareCardList.push(card);
    }

    else if (this.compareCardList.length === 1) {
      this.compareCardList.push(card);
      this.compareCards();
    }
  }

  private compareCards() {
    if (this.compareCardList[0].title === this.compareCardList[0].title) {
      this.cardsSercice.removeCardsFromDeck(this.compareCardList)
    }
    else {
      this.compareCardList = [];
    }
  }
}
