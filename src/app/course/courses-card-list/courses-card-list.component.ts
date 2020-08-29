import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../../course-dialog/course-dialog.component';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss']
})
export class CoursesCardListComponent implements OnInit {
  @Input() courses: Course[] = [];

  @Output() private coursesChanged = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val),
        tap(() => this.coursesChanged.emit())
      )
      .subscribe();

    // The !! ensures the resulting type is a boolean (true or false).
    // ! returns true if the object is null, undefined or an empty string and false otherwise.
    // If you negate it again you get true for values that exist and false for the ones that do not.

    // tap: Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source.
  }
}
