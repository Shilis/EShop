import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemApiService } from 'src/app/shared/item-api.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  
  items: Item[] = [];
  constructor(private itemService: ItemApiService) { }

  ngOnInit(): void {
    this.itemService.getItemList().subscribe( (data)=>{
      this.items = data;
    });
  }

}
