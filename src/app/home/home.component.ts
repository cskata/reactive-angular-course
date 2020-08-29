import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.service';
import { Category } from '../course/category.enum';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService, private dialog: MatDialog) {
  }

  ngOnInit() {
    const courses$ = this.coursesService.loadAllCourses();

    this.beginnerCourses$ = this.filterCoursesByCategory(courses$, Category.Beginner);
    this.advancedCourses$ = this.filterCoursesByCategory(courses$, Category.Advanced);
  }

  filterCoursesByCategory(courses$: Observable<Course[]>, category: Category) {
    return courses$.pipe(
      map(courses => courses.filter(course => course.category === category))
    );
  }

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
  }

}




