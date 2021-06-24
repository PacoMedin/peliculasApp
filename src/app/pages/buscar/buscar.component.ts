import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from 'src/app/interfaces/cartelera.response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public movies: Movie[] = [];
  public texto: string;
  public cargando: boolean = false;

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService ) { }

  ngOnInit(): void {

    this.cargando = true;

    this.activatedRoute.params.subscribe( params => {
      //console.log(params.texto);
      this.texto = params.texto;
      
      //TODO llamar el servicio
      this.peliculasService.buscarPeliculas( params.texto )
        .subscribe( resp => {
          //console.log(resp);
          this.movies = resp;
          this.cargando = false;

        });

    });
  }

}
