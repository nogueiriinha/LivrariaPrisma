import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('carrossel', { static: false }) carrossel!: ElementRef;

  rolarCarrossel(direcao: number) {
    const elemento = this.carrossel.nativeElement;
    const larguraItem = 265; // Largura do card + o gap (ajuste se necessário)
    elemento.scrollBy({
      left: direcao * larguraItem,
      behavior: 'smooth'
    });
  }
}