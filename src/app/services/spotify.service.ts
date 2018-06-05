import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyService {

  constructor(private http:HttpClient) { }

  getQuery(query:string){
    const API_URL = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDlrYeHyL-kssuqx05jhy8A_D1LUlqz8Bn0cacAIGDS-E4rPJROb614ZUcv9zbKuVBVmHRrAREVQif0KqY'
    });
    return this.http.get(API_URL, { headers });
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map(data => data['albums'].items));
  }

  getArtistas(termino:string){
    return this.getQuery(`search?q=${ termino }&type=artist&market=ES&limit=10`)
      .pipe(map(data => data['artists'].items));
  }

  getArtista(id:string){
    return this.getQuery(`artists/${ id }`);
  }

  getTopTracks(id:string){
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
      .pipe(map(data => data['tracks']));
  }

}
