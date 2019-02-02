

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HOST_URL } from '../models/request';

declare const Pusher: any;


@Injectable()
export class PusherService {
  pusher: any;
  channel: any;


  constructor(private http: HttpClient) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('status-channel');
  }

  changeUserStatus(status,userId) {
    this.http.post(HOST_URL+'/pusher/', 
    {'status': status,'userId':userId})
    .subscribe(data => {});
  }

  offLine(userId){
    this.changeUserStatus(0,userId)
  }

  disponivel(userId){
    this.changeUserStatus(1,userId)
  }

  ausente(userId){
    this.changeUserStatus(2,userId)
  }

  ocupado(userId){
    this.changeUserStatus(3,userId)
  }
}
