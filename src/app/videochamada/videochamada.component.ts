import { Component, OnInit } from '@angular/core';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc';

@Component({
  selector: 'app-videochamada',
  templateUrl: './videochamada.component.html',
  styleUrls: ['./videochamada.component.css']
})
export class VideochamadaComponent implements OnInit {

  localStream: Stream

  constructor(private agoraService: AngularAgoraRtcService) {
    
    this.agoraService.createClient();
  }

  ngOnInit() {
  }

  // Add
  startCall() {
    this.agoraService.client.join(null, '1000', null, (uid) => {
      this.localStream = this.agoraService.createStream(uid, true, null, null, true, false);
      this.localStream.setVideoProfile('720p_3');
      this.subscribeToStreams();
    });
  }

  // Add
  private subscribeToStreams() {
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
  }

}
