import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, EventEmitter,Output,OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {

  @Output() trainingStart=new EventEmitter<void>();
  exercises:Exercise[];
  exerciseSubscription:Subscription;
  isLoading=true;
  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
   this.exerciseSubscription= this.trainingService.exercisesChanged.subscribe(
      exercise=>{
        this.isLoading=false;
        this.exercises=exercise;
      }
    );
    this.trainingService.getAvailableExercises();
  }
onStartTraining(form:NgForm){
  this.trainingService.startExercise(form.value.exercise);
}
ngOnDestroy()
{
  this.exerciseSubscription.unsubscribe();
}
}


// Operators & RxJS 6
// In case you're using RxJS 6 or higher (check the package.json ) AND you're NOT using rxjs-compat  (which you can install via npm install --save rxjs-compat  - no changes to the code would then be required), the following adjustment needs to be made when working with RxJS operators.

// Instead of

// ....snapshotChanges()
//     .map(docArray => { ... })
// you should use the pipe()  method provided by RxJS:

// ....snapshotChanges()
//     .pipe(map(docArray => { ... }))
// It simply wrap the RxJS operator you want to use - in this case map() . You can actually use multiple pipe()  calls on the same observable - simply chain them after each other.

// For this to work, you'll need to import the map()  method though:

// import { map } from 'rxjs/operators';

// After adding this at the top of your file, you should be good to go.

// Max
