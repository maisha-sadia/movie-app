import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MoviesService } from './__services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'movies-app';
  currentUser = sessionStorage.getItem('current_user');
  currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    this.currentUser
  );
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();
  constructor(private moviesService: MoviesService, private router: Router) {}
  signOut() {
    this.currentUserSubject.next(sessionStorage.removeItem('current_user'));
    location.reload();
  }

  async migrateData() {
    const users = [
      {
        forename: 'Anona',
        surname: 'Cruz',
        favourite_movies: ['tt0848228', 'tt4154756', 'tt2395427,tt4154796'],
      },
      {
        forename: 'Camilla',
        surname: 'Sayer',
        favourite_movies: ['tt4154756', 'tt10515848', 'tt0120575'],
      },
      {
        forename: 'Ganesh',
        surname: 'Zentai',
        favourite_movies: [
          'tt0287871',
          'tt2975590',
          'tt0103776',
          'tt4116284',
          'tt2313197',
        ],
      },
      {
        forename: 'Vivien',
        surname: 'Straub',
        favourite_movies: ['tt0926084', 'tt0417741'],
      },
      {
        forename: 'Bernardita',
        surname: 'Bishop',
        favourite_movies: ['tt0389860'],
      },
    ];
    for (let user of users) {
      const newUser: any = await this.moviesService.createUser(user);
      for (let movie of user.favourite_movies) {
        const data = { imdbID: movie };
        await this.moviesService.addFavouriteMovie(newUser._id, data);
      }
    }
    this.router.navigate(['/movies']);
  }
}
