import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type ProfileStat = {
  label: string;
  value: string;
  icon: string;
};

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  profile = {
    fullName: 'Mohamed Ali',
    email: 'mohamed.ali@example.com',
    phone: '+966 55 123 4567',
    location: 'Libaya, Tripoli',
    joinedAt: '2020-01-15',
    bio: 'Passionate frontend developer with 5 years of experience in building responsive web applications. Skilled in Angular, React, and Vue.js. Always eager to learn new technologies and improve coding skills.',
    status: 'Active',
    avatar: 'https://media.istockphoto.com/id/2168774111/vector/avatar-or-person-sign-profile-picture-portrait-icon-user-profile-symbol.jpg?s=612x612&w=0&k=20&c=6qw1LRG53z00RXJnVKQC58W7XnW2gdQfGBIR43E97Oc=',
  };

  stats: ProfileStat[] = [
    { label: 'Followers', value: '2.4K', icon: 'fa-solid fa-users' },
  ];
}
