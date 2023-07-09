import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { Comment } from 'src/app/types/api-types';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges{
  @Input() comentss: Comment[] = []

  constructor(public apiService: ApiService, private cd: ChangeDetectorRef){}

  allComm: any = []


  ngOnInit(): void {
    console.log(this.comentss)
  }

  ngOnChanges(changes: SimpleChanges): void{
    console.log(changes)
    this.apiService._refreshNeeded$.next(changes)
    if(changes["comentss"].firstChange) return;
    this.parseData()
    this.cd.detectChanges()

  }

  parseData(){
    this.allComm = this.comentss;
  }

}
