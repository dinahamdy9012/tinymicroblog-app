import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';

export const routes: Routes = [
        { path: '', component: LoginComponent }, // ✅ Set LoginComponent as the home page
        { path: 'login', component: LoginComponent },
        {path:'posts', component:PostListComponent},
        {path:'create-post', component:CreatePostComponent},
      
];
