import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.loadAllCourses();
  }

  loadAllCourses() {
    // Stateless observable service design pattern
    const courses$ = this.coursesService.loadAllCourses();

    this.beginnerCourses$ = this.filterCoursesByCategory(courses$, Category.Beginner);
    this.advancedCourses$ = this.filterCoursesByCategory(courses$, Category.Advanced);
  }

  filterCoursesByCategory(courses$: Observable<Course[]>, category: Category) {
    return courses$.pipe(
      map(courses => courses.filter(course => course.category === category))
    );
  }
}




