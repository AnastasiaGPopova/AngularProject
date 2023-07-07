import { Component, Input, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Post } from 'src/types/api-types';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit{
  @Input() postssss: Post[] = []

  ngOnInit(): void {
    console.log(this.postssss)
  }


}
