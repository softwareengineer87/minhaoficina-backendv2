class Photo {

  photoId: string;
  noteId: string;
  url: string;

  constructor(photoId: string, noteId: string, url: string) {
    this.photoId = photoId;
    this.noteId = noteId;
    this.url = url;
  }

  static create(noteId: string, url: string) {
    const photoId = crypto.randomUUID();
    return new Photo(photoId, noteId, url);
  }

}

export { Photo }

