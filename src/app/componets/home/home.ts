import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DEFAULT_HOME_DATA } from '../../models/all.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  today = new Date();

  stats = DEFAULT_HOME_DATA.stats;
  quickActions = DEFAULT_HOME_DATA.quickActions;
  recentActivities = DEFAULT_HOME_DATA.recentActivities;
  workload = DEFAULT_HOME_DATA.workload;

  formattedDate: string = this.today.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

}
