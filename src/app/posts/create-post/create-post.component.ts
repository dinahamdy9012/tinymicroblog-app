import { Component } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { UploadService } from '../../shared/services/upload.service';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FileUploadModule,FormsModule, CommonModule ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  postContent: string = '';
  selectedFile: File | null = null;
  fileId: string | null = null;
  imageUrl: string | null = null;

  constructor(private postService: PostService, private uploadService: UploadService) {}

  onFileSelected(event: any) {
    const file = event.files[0];
    if (file) {
      this.uploadFile(event);
    }
  }

  uploadFile(event: any) {
    const file = event.files[0];
   
    if (file) {
      this.uploadService.uploadImage(file, this.fileId).subscribe(response => {
        this.fileId = response.fileId;
        this.imageUrl = response.imageUrl;
      });
    }
  }

  submitPost() {

      this.postService.createPost(this.postContent, this.imageUrl).subscribe(() => {
        alert('Post Created!');
      });
    
    }
}
