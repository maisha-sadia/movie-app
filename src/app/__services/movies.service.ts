import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}
  async index() {
    return await this.http.get<any>(`${environment.api.url}/users`).toPromise();
  }

  async signIn(model: any): Promise<any> {
    return await this.http
      .post(`${environment.api.url}/users/sign-in`, model)
      .toPromise();
  }

  async getAllMovies(): Promise<any> {
    return fetch('http://www.omdbapi.com/?i=tt3896198&apikey=52de1416')
      .then((response) => response.json())
      .then((res) => res);
  }

  async getUserById(model: any) {
    try {
      return this.http
        .post(`${environment.api.url}/users/user`, model)
        .toPromise();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async searchMovies(movieTitle: string): Promise<any> {
    return fetch(`http://www.omdbapi.com/?s=${movieTitle}&apikey=52de1416`)
      .then((response) => response.json())
      .then((res) => res.Search);
  }

  async getMoviePlot(imdbID: string): Promise<any> {
    return fetch(
      `http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=52de1416`
    )
      .then((response) => response.json())
      .then((res) => res);
  }

  async createUser(model: any) {
    try {
      return this.http
        .post(`${environment.api.url}/users/add-user`, model)
        .toPromise();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async addFavouriteMovie(user: any, model: any) {
    try {
      return this.http
        .post(`${environment.api.url}/users/favourite-movie/${user}`, {
          data: model,
        })
        .toPromise();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async removeFavouriteMovie(movieID: string) {
    try {
      return this.http
        .delete(`${environment.api.url}/users/favourite-movie/${movieID}`)
        .toPromise();
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
