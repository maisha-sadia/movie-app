import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '../__services/movies.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  public userForm!: FormGroup;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isLoadingSubject.next(false);
    this.userForm = this.formBuilder.group({
      forename: ['', Validators.required],
      surname: ['', Validators.required],
    });
  }
  async submit() {
    try {
      this.isLoadingSubject.next(true);
      if (this.userForm.invalid) {
        return;
      }
      await this.moviesService.createUser(this.userForm.value);

      this.router.navigate(['/movies']);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      this.isLoadingSubject.next(false);
    }
  }
  get f() {
    return this.userForm.controls;
  }
}
