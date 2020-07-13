import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpRequest, SignUpService} from './sign-up.service';
import {nameInPasswordValidator} from './sign-up.validators';
import {User} from './sign-up.model';


@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  signUpComplete = false;
  signedUpPerson: User;

  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService) {
  }

  ngOnInit(): void {
    this.signUpForm = this.getSignUpForm();
  }

  private getSignUpForm(): FormGroup {
    return this.formBuilder.group({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{1,}$'),
        ]),
      }, {
        validators: nameInPasswordValidator
      }
    );
  }

  signUp(): void {
    const request = this.signUpForm.getRawValue() as SignUpRequest;
    this.signUpService.signUp(request).subscribe((response: User) => {
      this.signUpComplete = true;
      this.signedUpPerson = response;
    });
  }

}




