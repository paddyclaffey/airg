import { Component, OnInit } from '@angular/core';
import { ICourse, IEvent } from '../models/golf';
import { ServiceService } from '../services/service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  private destroy$ = new Subject<void>();

  course: ICourse;

  constructor(private serviceService: ServiceService,
              private route: ActivatedRoute) { 
    this.course = null;
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const courseId = params['id'];
      // Use the courseId as needed
      if (courseId && !isNaN(courseId)) {
        this.getCourse(courseId);
      }
      console.log(courseId);
    });
  }

  private getCourse(courseId: number): void {
    this.serviceService.getCourse(courseId)
      .pipe(takeUntil(this.destroy$)
    ).subscribe((course) => {
      this.course = course;
      console.log(course);
      this.getEvents(course.id)

    })
  }


  private getEvents(courseId: number): void {
    this.serviceService.getEvents()
      .pipe(takeUntil(this.destroy$)
    ).subscribe((events) => {

      console.log(events);

    })
  }

  goToEvent(event: IEvent): void {
    console.log(event)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
