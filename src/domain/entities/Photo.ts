import { v4 as uuidv4 } from 'uuid';
class Photo {

  photoId: string;
  launchId: string;
  url: string;

  constructor(photoId: string, launchId: string, url: string) {
    this.photoId = photoId;
    this.launchId = launchId;
    this.url = url;
  }

  static create(launchId: string, url: string) {
    const photoId = uuidv4();
    return new Photo(photoId, launchId, url);
  }

}

export { Photo }

