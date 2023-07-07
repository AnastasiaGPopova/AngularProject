import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/types/api-types';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.css']
})
export class ErrorBoxComponent implements OnInit{
  @Input() errors:any =""

  ngOnInit(): void {
    console.log(this.errors)
  }


}