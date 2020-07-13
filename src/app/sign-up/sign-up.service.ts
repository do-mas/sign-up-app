import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from './sign-up.model';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpClient: HttpClient) {
  }

  signUp(request: SignUpRequest): Observable<User> {
    return this.httpClient.post('https://demo-api.now.sh/users', request)
      .pipe(map(() => {
        // just for some data
        return request as User;
      }));
  }

}

export interface SignUpRequest extends User {
  password: string;
}

