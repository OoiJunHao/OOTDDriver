import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImagePickerService {

  constructor(private camera: Camera) { }
  selectImage() {
    const options: CameraOptions = {			
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
      // Do something with the new photo
      console.log("Camera image captured");
		}, (err) => {
			// Handle error
			console.log("Camera issue: " + err);
		});
  }

}
