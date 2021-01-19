import { Component, OnInit } from '@angular/core';
import { MemoryCardModel } from 'src/app/models/memory-card.model';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public cardList: Array<MemoryCardModel> = [];
  private compareCardList: Array<MemoryCardModel> = [];

  constructor(private cardsSercice: CardsService) { }

  ngOnInit(): void {
    this.cardsSercice.getCards().subscribe((result) => {
      if (result) {
        this.cardList = result
      }
    })
  }

  public compareCards(card: MemoryCardModel) {
    if (!this.compareCardList.length) {
      this.compareCardList.push(card);
    }

    console.log('this.compareCardList: ', this.compareCardList);
  }
}
