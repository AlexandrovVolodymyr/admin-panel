import { Injectable } from '@angular/core';
import { IPost } from '../../shared/interfaces/post';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private _http: HttpClient, private _auth: AuthService) { }

  public create(post: IPost) {
    // firebase naming table - [name].json
    return this._http.post<IPost>(`${environment.postsDBUrl}/posts.json`, post)
      .pipe(
        map((response: any) => {
          return {
            ...post,
            id: response.name
          };
        })
      );
  }

  public getAll(): Observable<IPost[]> {
    return this._http.get(`${environment.postsDBUrl}/posts.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return response && Object.keys(response).map(key => ({
            ...response[key],
            id: key
          }));
        })
      );
  }

  public remove(id: number | string): Observable<void> {
    return this._http.delete<void>(`${environment.postsDBUrl}/posts/${id}.json`);
  }
}
