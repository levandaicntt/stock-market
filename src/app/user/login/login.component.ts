import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/service-user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
    public loginForm: FormGroup;

    constructor(private fb: FormBuilder, private userService: UserService) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.userService.login(this.loginForm.value).subscribe({
                next: (res) => {
                    // Có thể hiển thị thông báo thành công hoặc chuyển hướng đã được thực hiện trong service
                    console.log('Đăng nhập thành công');
                },
                error: (err) => {
                    console.error('Đăng nhập thất bại', err);
                }
            });
        }
    }
}
