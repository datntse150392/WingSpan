import { Component, OnInit } from '@angular/core';
import { ToastService } from './core/services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private toastService: ToastService) {}
  ngOnInit(): void {
    // Subscribe to the toast$ Observable to receive toast messages
    this.toastService.toast$.subscribe((isLogin) => {
      if (isLogin) {
        this.toastService.showSuccess('Đăng nhập thành công!');
      } else {
        this.toastService.showFail('Tài khoản không chính xác!');
      }
    });

    // Subscribe to the toast$ Observable to receive toast messages for register
    this.toastService.toastRegister$.subscribe((isRegister) => {
      if (isRegister) {
        this.toastService.showSuccess('Đăng ký tài khoản thành công!');
      } else {
        this.toastService.showFail(
          'Thông tin hoặc mật khẩu bị trùng, mời bạn thử lại!'
        );
      }
    });

    // Subscribe to the toast$ Observable to receive toast messsages for enroll Course
    this.toastService.toastEnrollCourse$.subscribe((isEnrollCourse) => {
      if (isEnrollCourse) {
        this.toastService.showSuccess('Bạn đã đăng ký khóa học thành công!');
      } else {
        this.toastService.showFail(
          'Đăng ký khóa học thất bại, mời bạn thử lại!'
        );
      }
    });

    // Subscribe to the toast$ Observable to receive toast messsages for enroll Course
    this.toastService.toastEditInfo$.subscribe((isEditInfo) => {
      if (isEditInfo) {
        this.toastService.showSuccess('Bạn đã cập nhật thông tin thành công!');
      } else {
        this.toastService.showFail('Cập nhật thất bại, mời bạn thử lại!');
      }
    });

    // Subscribe to the toast$ Observable to receive toast messsages for Add To Cart
    this.toastService.toastAddToCart$.subscribe((isAddToCart) => {
      if (isAddToCart) {
        this.toastService.showSuccess('Thêm khóa học vào giỏ hàng thành công!');
      } else {
        this.toastService.showFail('Khóa học đã tồn tại trong giỏ hàng!');
      }
    });

    // Subscribe to the toast$ Observable to receive toast messsages for Transaction
    this.toastService.toastTransaction$.subscribe((isTransaction) => {
      if (isTransaction) {
        this.toastService.showSuccess('Thanh toán thành công');
      } else {
        this.toastService.showFail('Thanh toán thất bại, mời bạn thử lại');
      }
    });
  }
}
