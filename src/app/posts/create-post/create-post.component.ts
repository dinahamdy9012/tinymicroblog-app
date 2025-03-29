import { Component } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { UploadService } from '../../shared/services/upload.service';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-create-post',
    imports: [FileUploadModule, FormsModule, CommonModule, ButtonModule,
       TextareaModule, CardModule ],
    templateUrl: './create-post.component.html',
    styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  postContent: string = '';
  selectedFile: File | null = null;
  fileId: string | null = null;
  imageUrl: string | null = null;
  loading: boolean = false;
  latitude: number | null = null;
  longitude: number | null = null;

  constructor(private postService: PostService, private uploadService: UploadService,
    private router:Router
  ) {}

  private generateRandomCoordinates(): void {
    const minLat = -90, maxLat = 90;
    const minLng = -180, maxLng = 180;
    
    this.latitude = (Math.random() * (maxLat - minLat) + minLat);
    this.longitude = (Math.random() * (maxLng - minLng) + minLng);
  }

  onFileSelected(event: any) {
    const file = event.files[0];
    if (file) {
      this.loading=true;
      this.uploadFile(event);
    }
  }

  uploadFile(event: any) {
    const file = event.files[0];
   
    if (file) {
      this.uploadService.uploadImage(file, this.fileId).subscribe(response => {
        this.loading=false;
        this.fileId = response.fileId;
        this.imageUrl = response.imageUrl;
      });
    }
  }

  submitPost() {
    this.loading=true;
    this.generateRandomCoordinates(); 
      this.postService.createPost(this.postContent, this.imageUrl, this.latitude!, this.longitude!).subscribe(() => {
        this.loading=false;
        this.router.navigate(['/posts']);
      });
    
    }
}
