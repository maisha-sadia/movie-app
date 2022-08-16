import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '../__services/movies.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.isLoadingSubject.next(false);
  }
  async submit() {
    try {
      this.isLoadingSubject.next(true);
      if (this.userForm.invalid) {
        return;
      }
      const userDetails = await this.moviesService.signIn({
        forename: this.userForm.value.firstName,
        surname: this.userForm.value.lastName,
      });
      sessionStorage.setItem('current_user', JSON.stringify(userDetails));

      this.router.navigate(['/movies']);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      this.isLoadingSubject.next(false);
    }
  }
}
