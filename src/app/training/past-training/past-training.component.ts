import { Subscription } from 'rxjs';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit,AfterViewInit,ViewChild,OnDestroy } from '@angular/core';
import {MatTableDataSource,MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit,AfterViewInit,OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  pastExerciseSubscription:Subscription;

  @ViewChild(MatSort,null) sort:MatSort;   //expects two arguments so give null as second arg
  @ViewChild(MatPaginator,null) paginator:MatPaginator;
  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
   this.pastExerciseSubscription= this.trainingService.pastExercisesChanged.subscribe(
    (exercises:Exercise[])=>{
      this.dataSource.data=exercises
    }
   );
   this.trainingService.getCompletedOrCancelledExercises();
  }
  ngAfterViewInit()
  {
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }
  doFilter(filtervalue:string){
    this.dataSource.filter=filtervalue.trim().toLowerCase();
  }
  ngOnDestroy(){
    this.pastExerciseSubscription.unsubscribe();
  }

}
