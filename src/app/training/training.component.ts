import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
ongoingTraining=false;
exerciseSubscription:Subscription;
  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription=this.trainingService.exerciseChanged.subscribe(
      exercise=>{
        if(exercise)
        {
          this.ongoingTraining=true;
        }else
        {
          this.ongoingTraining=false;
        }
      }
    );
  }

}
