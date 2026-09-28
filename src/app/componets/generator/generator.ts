import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generator',
  imports: [CommonModule, FormsModule],
  templateUrl: './generator.html',
  styleUrl: './generator.scss',
})
export class Generator {
  password = signal<string>('xQ9$vL2#mP5@kR8*nB1!');
  length = signal<number>(16);

  includeUppercase = signal<boolean>(true);
  includeLowercase = signal<boolean>(false);
  includeNumbers = signal<boolean>(true);
  includeSymbols = signal<boolean>(false);

  strengthText = signal<string>('Strong');
  strengthLevel = signal<string>('Strong');
  activeBars = signal<number>(4);
  copied = signal<boolean>(false);

  constructor() {
    this.generatePassword();
  }

  toggleOption(option: 'upper' | 'lower' | 'numbers' | 'symbols') {
    switch (option) {
      case 'upper': this.includeUppercase.update(v => !v); break;
      case 'lower': this.includeLowercase.update(v => !v); break;
      case 'numbers': this.includeNumbers.update(v => !v); break;
      case 'symbols': this.includeSymbols.update(v => !v); break;
    }
    this.generatePassword();
  }

  generatePassword() {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let validChars = '';
    if (this.includeUppercase()) validChars += upperChars;
    if (this.includeLowercase()) validChars += lowerChars;
    if (this.includeNumbers()) validChars += numberChars;
    if (this.includeSymbols()) validChars += symbolChars;

    if (!validChars) {
      this.password.set('');
      this.strengthText.set('None');
      return;
    }

    let result = '';
    for (let i = 0; i < this.length(); i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      result += validChars[randomIndex];
    }

    this.password.set(result);
    this.calculateStrength();
  }

  calculateStrength() {
    const len = this.length();
    const hasUpper = this.includeUppercase();
    const hasLower = this.includeLowercase();
    const hasNum = this.includeNumbers();
    const hasSym = this.includeSymbols();

    let score = 0;

    if (len >= 8) score++;
    if (len >= 12) score++;
    if (hasUpper && hasLower) score++;
    if (hasNum && hasSym) score++;


    this.activeBars.set(score);

    if (score >= 4) {
      this.strengthText.set('Strong');
      this.strengthLevel.set('Strong');
    } else if (score >= 2) {
      this.strengthText.set('Medium');
      this.strengthLevel.set('Medium');
    } else {
      this.strengthText.set('Weak');
      this.strengthLevel.set('Weak');
    }
  }

  copyPassword() {
    navigator.clipboard.writeText(this.password());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  saveToVault() {

    console.log('Saved to vault:', this.password());
  }
}
