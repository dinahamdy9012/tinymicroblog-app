import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = environment.postApiUrl; // Replace with your backend

  constructor(private http: HttpClient) {}

  getPosts(page:number, pageSize:number, screenSize:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/post/GetPosts?PageIndex=${page}&PageSize=${pageSize}&screenSize=${screenSize}`);
  }

  createPost(postText: string, imageUrl: string | null, latitude:number, longitude:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/post/CreatePost`, { postText, imageUrl,latitude, longitude });
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.apiUrl}/upload`, formData);
  }
}
