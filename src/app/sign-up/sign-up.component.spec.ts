import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignUpComponent} from './sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {SignUpRequest, SignUpService} from './sign-up.service';
import {of} from 'rxjs';

describe('SingUpComponent', () => {
  let component: SignUpComponent;
  let service: SignUpService;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);

    service = TestBed.inject(SignUpService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('Sing up form', () => {

    it('should have invalid form if one of the form fields is empty', () => {

      component.signUpForm.controls.firstName.setValue('');
      component.signUpForm.controls.lastName.setValue('lastname');
      component.signUpForm.controls.email.setValue('first@name');
      component.signUpForm.controls.password.setValue('hjlhllkjklkjklWWW');

      expect(component.signUpForm.valid).toBeFalse();

      component.signUpForm.controls.firstName.setValue('first name');
      component.signUpForm.controls.lastName.setValue('');
      component.signUpForm.controls.email.setValue('firstn@ame');
      component.signUpForm.controls.password.setValue('hjlhllkjklkjklWWW');

      expect(component.signUpForm.valid).toBeFalse();

      component.signUpForm.controls.firstName.setValue('first name');
      component.signUpForm.controls.lastName.setValue('last name');
      component.signUpForm.controls.email.setValue('');
      component.signUpForm.controls.password.setValue('hjlhllkjklkjklWWW');

      expect(component.signUpForm.valid).toBeFalse();

      component.signUpForm.controls.firstName.setValue('first name');
      component.signUpForm.controls.lastName.setValue('last name');
      component.signUpForm.controls.email.setValue('email@em.com');
      component.signUpForm.controls.password.setValue('');

      expect(component.signUpForm.valid).toBeFalse();


    });

    it('should have invalid form if password contains first name or last name', () => {

      component.signUpForm.controls.email.setValue('first@name');
      component.signUpForm.controls.firstName.setValue('firstname');
      component.signUpForm.controls.lastName.setValue('lastname');

      component.signUpForm.controls.password.setValue('hjlhllfirstnamekjklkjklWWW');
      expect(component.signUpForm.valid).toBeFalse();

      component.signUpForm.controls.password.setValue('hjlhllfilastnamekjklkjklWWW');
      expect(component.signUpForm.valid).toBeFalse();

    });


    it('should have invalid form if invalid email', () => {

      component.signUpForm.controls.firstName.setValue('firstname');
      component.signUpForm.controls.lastName.setValue('lastname');
      component.signUpForm.controls.email.setValue('invalid');
      component.signUpForm.controls.password.setValue('hjlhllkjklkjklWWW');

      expect(component.signUpForm.valid).toBeFalse();

    });
  });

  describe('Sing up form', () => {

    it('should call service with correct request and should set the component state to view results after service call', () => {

      // set up
      component.signUpForm.controls.firstName.setValue('firstname');
      component.signUpForm.controls.lastName.setValue('lastname');
      component.signUpForm.controls.email.setValue('test@email.com');
      component.signUpForm.controls.password.setValue('Password');

      const request = {firstName: 'firstname', lastName: 'lastname', email: 'test@email.com', password: 'Password'} as SignUpRequest;

      spyOn(service, 'signUp').withArgs(request).and.returnValue(of(request));

      // execute
      component.signUp();

      // assert
      expect(component.signUpComplete).toBeTrue();
      expect(component.signedUpPerson.firstName).toBe('firstname');


    });

  });

});
