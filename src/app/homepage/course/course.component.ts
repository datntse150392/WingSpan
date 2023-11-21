import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/CourseModel';
import { BillBoard } from 'src/app/models/BillboardModel';
import { HomepageService } from '../homepage.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  // Fake data
  responsiveOptions: any[] | undefined;
  listBillBoard: BillBoard[] = [];
  hover: boolean = false;
  listCourses: Course[] = [];
  constructor(private homepageService: HomepageService) {}

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllBillBoard();
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  getAllCourses() {
    this.homepageService.getAllCourses().subscribe((res: any) => {
      this.listCourses = res.data;
      console.log(this.listCourses);
    });
  }
  getAllBillBoard() {
    this.homepageService.getAllBillBoards().subscribe((res: any) => {
      this.listBillBoard = res.data;
    });
  }
}
