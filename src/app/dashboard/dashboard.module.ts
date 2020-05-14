import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './container/main-page/main-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProfileComponent } from './components/profile/profile.component';
import { FilesComponent } from './components/files/files.component';
import { MatRippleModule } from '@angular/material/core';
import { PostComponent } from './components/post/post.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPostsPipe } from '../shared/pipes/search-posts.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { HighlightTextPipe } from '../shared/pipes/highlight-text.pipe';

@NgModule({
  declarations: [
    MainPageComponent,
    SidebarComponent,
    HeaderComponent,
    ProfileComponent,
    FilesComponent,
    PostComponent,
    SearchPostsPipe,
    HighlightTextPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatRippleModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class DashboardModule {
}
