import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './container/main-page/main-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FilesComponent } from './components/files/files.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/create-post',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainPageComponent,
    children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'files', component: FilesComponent},
      {path: 'create-post', component: PostComponent},
      // {
      //   path: '**',
      //   redirectTo: '/dashboard'
      // }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
