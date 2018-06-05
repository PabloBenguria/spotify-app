import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  loadingArtist:boolean;
  artista:any = {};
  topTracks:any[] = [];

  constructor(private activatedRoute:ActivatedRoute,
  						private spotify:SpotifyService) {
  	
    this.loadingArtist = true;

  	this.activatedRoute.params.subscribe(params => {

  	this.getArtista(params['id']);

    this.getTopTracks(params['id']);

  	});
  }

  ngOnInit() {
  }

  getArtista(id:string){
    this.loadingArtist = true;
  	this.spotify.getArtista(id)
  		.subscribe(data => {
        this.artista = data;
        this.loadingArtist = false;
  		});
  }

  getTopTracks(id:string){
    this.spotify.getTopTracks(id)
      .subscribe(data => {
        this.topTracks = data;
      });
  }

}
