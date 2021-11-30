import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CreateSubredditComponent } from './pages/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './pages/list-subreddits/list-subreddits.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'create-subreddit', component: CreateSubredditComponent },
  { path: 'list-subreddits', component: ListSubredditsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
