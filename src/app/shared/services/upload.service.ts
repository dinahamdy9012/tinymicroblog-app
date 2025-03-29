import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = environment.uploadApiUrl;

  constructor(private http: HttpClient) {}
  

  uploadImage(file: File, fileId: string | null) {
    const formData = new FormData();
    formData.append('imageFile', file);
    if(fileId != null)
    {
      formData.append("fileId", fileId);
    }
    return this.http.post<any>(`${this.apiUrl}/Upload/UploadPostImage`, formData);
  }
}
