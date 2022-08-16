import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { MoviesService } from '../__services/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: any = [];
  title: any;
  movie: any;
  moviesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);
  movies$: Observable<any> = this.moviesSubject.asObservable();
  usersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);
  users$: Observable<any> = this.usersSubject.asObservable();
  currentUser;
  searchBox: any;
  movieSearchBox: any;
  constructor(private movieService: MoviesService) {
    this.currentUser = sessionStorage.getItem('current_user');
    this.currentUser = JSON.parse(this.currentUser);
  }

  async ngOnInit() {
    let users = await this.movieService.index();

    for (let user of users) {
      for (let movie of user.favourite_movies) {
        movie.details = await this.movieService.getMoviePlot(movie.imdbID);
      }
    }

    this.searchBox = document.getElementById('search-list');
    this.movieSearchBox = document.getElementById('movie-search-box');
    this.usersSubject.next(users);
  }

  async addFavouriteMovie(user: any, movie: any) {
    let users: any = this.usersSubject.value;
    let getMoviePlot = await this.movieService.getMoviePlot(movie.imdbID);
    users = users.map((item: any) => {
      if (this.currentUser) {
        if (item._id.toString() === user._id.toString()) {
          item.favourite_movies.push({ details: getMoviePlot });
        }
        return item;
      }
      return item;
    });
    await this.movieService.addFavouriteMovie(this.currentUser._id, {
      imdbID: movie.imdbID,
    });
    this.usersSubject.next(users);
    this.ngOnInit();
    this.searchBox.classList.add('hide-search-list');
  }

  async searchByTitle(event: any) {
    this.movies = await this.movieService.searchMovies(event.target.value);
    if (event.target.value.length > 0) {
      this.searchBox.classList.remove('hide-search-list');
      this.moviesSubject.next(this.movies);
    } else {
      this.searchBox.classList.add('hide-search-list');
    }
  }

  async removeMovie(user: any, movie: any) {
    const users = this.usersSubject.value.map(async (item) => {
      if (item.id === user.id) {
        const index = item.favourite_movies.findIndex((object: any) => {
          return object.imdbID === movie.imdbID;
        });
        if (index > -1) {
          item.favourite_movies.splice(index, 1);
          if (movie._id) {
            await this.movieService.removeFavouriteMovie(movie._id);
            await this.ngOnInit();
          }
        }

        return item;
      }
      return item;
    });
    this.usersSubject.next(users);
  }
}
