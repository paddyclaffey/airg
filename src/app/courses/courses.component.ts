import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICourse } from '../models/golf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public courses: ICourse[];

  constructor(private serviceService: ServiceService,
              private router: Router) { 
    this.courses = [];
  }

  ngOnInit(): void {
    this.serviceService.getCourses()
      .pipe(takeUntil(this.destroy$)
    ).subscribe((courses) => {
      this.courses = courses;
      console.log(courses);

    })
  }

  goToCourse(course: ICourse): void {
    console.log(course)
    this.router.navigate(['/course', course.id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
