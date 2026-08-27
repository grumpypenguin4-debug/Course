import { Component } from '@angular/core';
import { MyProfileDirectiveDirective } from '../../directive/my-profile-directive.directive';


@Component({
  selector: 'app-profile',
  imports: [MyProfileDirectiveDirective],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile { }
