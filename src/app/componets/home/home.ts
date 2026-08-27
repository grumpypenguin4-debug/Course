import { Component } from '@angular/core';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';


@Component({
  selector: 'app-home',
  imports: [CapitalizePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home { }
