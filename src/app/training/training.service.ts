import { AngularFirestore } from '@angular/fire/firestore';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import{Subject} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged=new Subject<Exercise>();
  exercisesChanged=new Subject<Exercise[]>();
pastExercisesChanged=new Subject<Exercise[]>();
availableExercises:Exercise[]=[];
 private runningExercise:Exercise;
 private pastExercises:Exercise[]=[];
 constructor(private db:AngularFirestore) { }

getAvailableExercises(){
  this.db.collection('availableExercises')
  .snapshotChanges().pipe(map(docArray=>{
    return docArray.map(doc=>{
      return {
        id:doc.payload.doc.id,
        name:doc.payload.doc.data()['name'],
        duration:doc.payload.doc.data()['duration'],
        calories:doc.payload.doc.data()['calories'],
      };
    });
  })).subscribe((exercises:Exercise[])=>
   {

     this.availableExercises=exercises;
     this.exercisesChanged.next([...this.availableExercises]);
   }
  );
}
startExercise(selectedId:string){
  this.runningExercise=this.availableExercises.find(
    ex=>ex.id===selectedId
    );
  this.exerciseChanged.next({...this.runningExercise});
}
completeExercise(){
  this.addDataToDatabase(
    {...this.runningExercise,date:new Date(),state:'completed'});
    console.log(this.pastExercises);
    this.runningExercise=null;
    this.exerciseChanged.next(null);

}
cancelExercise(progress:number){
  this.addDataToDatabase(
    {...this.runningExercise,
      date:new Date(),
      duration:this.runningExercise.duration*(progress/100),
      calories:this.runningExercise.calories*(progress/100),
      state:'cancelled'});
    this.runningExercise=null;
    this.exerciseChanged.next(null);

}
getCompletedOrCancelledExercises()
{
  this.db.collection('finishedExercises').valueChanges()
  .subscribe(
    (exercises:Exercise[])=>{
    this.pastExercisesChanged.next(exercises);
    }
    );
}

getRunningExercise()
{
  return {...this.runningExercise};
}

private addDataToDatabase(exercise:Exercise){
  this.db.collection('finishedExercises').add(exercise);
}


}
