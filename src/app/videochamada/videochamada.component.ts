import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';
import { ActivatedRoute } from '@angular/router';
import { VideoCall } from '../models/videocall.interface';
import { PusherService } from '../services/pusher.service';

@Component({
  selector: 'app-videochamada',
  templateUrl: './videochamada.component.html',
  styleUrls: ['./videochamada.component.css'],
  providers: [PusherService]
})
export class VideochamadaComponent implements OnInit, OnDestroy, VideoCall {

  activeCall: boolean = false;
  audioEnabled: boolean = true;
  videoEnabled: boolean = true;
  localStream: Stream
  remoteCalls: any = [];
  id:String;
  userId:string;

  constructor(
    private agoraService: AngularAgoraRtcService,
    private route: ActivatedRoute,
    private pusherService: PusherService) {
    
    this.agoraService.createClient();
  }


  ngOnInit() {
    this.userId = localStorage.getItem("id")
    this.id = "1000";
    this.route
		.queryParams
		.subscribe(params => {
			// Defaults to 0 if no query param provided.
			let id = params['id'];

			if(id!= undefined){
					this.id = id;
			}
    });

    this.start()
  }

  // Add
  start() {
    this.activeCall = true;
    this.agoraService.client.join(null, this.id, null, (uid) => {
      this.localStream = this.agoraService.createStream(uid, true, null, null, true, false);
      this.localStream.setVideoProfile('720p_3');
       this.pusherService.disponivel(this.userId);
      this.subscribe();
    });
  }

  // Add
   subscribe() {
    this.localStream.on("accessAllowed", () => {
      console.log("accessAllowed");
    });
    // The user has denied access to the camera and mic.
    this.localStream.on("accessDenied", () => {
      console.log("accessDenied");
    });

    this.localStream.init(() => {
      console.log("getUserMedia successfully");
      this.localStream.play('agora_local');
      this.agoraService.client.publish(this.localStream, function (err) {
        console.log("Publish local stream error: " + err);
      });
      this.agoraService.client.on('stream-published', function (evt) {
        console.log("Publish local stream successfully");
      });
    }, function (err) {
      console.log("getUserMedia failed", err);
    });

    this.agoraService.client.on('error', (err) => {
      console.log("Got error msg:", err.reason);
      if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.agoraService.client.renewChannelKey("", () => {
          console.log("Renew channel key successfully");
        }, (err) => {
          console.log("Renew channel key failed: ", err);
        });
      }
    });

    this.agoraService.client.on('stream-added', (evt) => {
      const stream = evt.stream;
      this.agoraService.client.subscribe(stream, (err) => {
        console.log("Subscribe stream failed", err);
      });
    });

    this.agoraService.client.on('stream-subscribed', (evt) => {
      const stream = evt.stream;
      
      if(this.remoteCalls==0){
         if (!this.remoteCalls.includes(`agora_remote${stream.getId()}`)){ 
             this.remoteCalls.push(`agora_remote${stream.getId()}`);
             this.pusherService.ocupado(this.userId);
         }
      }

      setTimeout(() => stream.play(`agora_remote${stream.getId()}`), 2000);
    });

    this.agoraService.client.on('stream-removed', (evt) => {
      console.log("Stream REMOVED")
      const stream = evt.stream;
      stream.stop();
      this.pusherService.disponivel(this.userId);
      this.remoteCalls = this.remoteCalls.filter(call => call !== `#agora_remote${stream.getId()}`);
      console.log(`Remote stream is removed ${stream.getId()}`);
    });

    this.agoraService.client.on('peer-leave', (evt) => {
      console.log("PEER LEAVE")
      const stream = evt.stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call === `#agora_remote${stream.getId()}`);
        console.log(`${evt.uid} left from this channel`);
        this.pusherService.disponivel(this.userId);
      }
    });
  }


  
  leave() {
    this.agoraService.client.leave(() => {
      this.activeCall = false;
      document.getElementById('agora_local').innerHTML = "";
      this.remoteCalls = []
      console.log("Leavel channel successfully");
      this.pusherService.ausente(this.userId);
    }, (err) => {
      console.log("Leave channel failed");
    });
  }

  toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
    if (this.audioEnabled) this.localStream.enableAudio();
    else this.localStream.disableAudio();
  }

  toggleVideo() {
    this.videoEnabled = !this.videoEnabled;
    if (this.videoEnabled) this.localStream.enableVideo();
    else this.localStream.disableVideo();
  }


  ngOnDestroy(){
    this.leave()
    this.pusherService.ausente(this.userId);
  }
}
