import {getTestBed, TestBed} from '@angular/core/testing';

import {SignUpRequest, SignUpService} from './sign-up.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('SignUpService', () => {
  let service: SignUpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SignUpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('singUp()', () => {

    it('should call httpClient with correct endpoint and method', () => {

      const request = {firstName: 'first name', lastName: 'last name', password: 'the password', email: 'test@email.com'} as SignUpRequest;

      service.signUp(request).subscribe(response => {
        expect(response.firstName).toEqual('first name');
        expect(response.lastName).toEqual('last name');
      });

      const req = httpMock.expectOne(`https://demo-api.now.sh/users`);
      expect(req.request.method).toBe('POST');
      req.flush({});

    });

  });

});
