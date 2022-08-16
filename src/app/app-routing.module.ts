import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: 'add-user', component: UserComponent },
  { path: 'sign-in', component: SignInComponent },
  // { path: '**', component: PageNotFoundComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
