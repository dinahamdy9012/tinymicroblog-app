import { Component } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-post-list',
    imports: [
        CommonModule,
        TableModule,
        PaginatorModule,
        CardModule,
        ButtonModule 
    ],
    templateUrl: './post-list.component.html',
    styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  posts: any[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(private postService: PostService, private router:Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }
  loadPosts() {
    this.loading = true;
    this.postService.getPosts(this.currentPage+1, this.pageSize, window.innerWidth).subscribe(response => {
      this.posts = response.data;
      this.totalRecords = response.total;
      this.loading = false;
    });
  }
  onPageChange(event: any) {
    this.currentPage = event.page;
    this.loadPosts();
  }
  navigateToCreatePost(){
    this.router.navigate(['/create-post']);
  }
}
