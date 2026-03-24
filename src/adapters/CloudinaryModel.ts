
interface CloudinaryModel {
  public_id: string,
  version: number,
  signature: string,
  width: number,
  height: number,
  format: number,
  resource_type: 'image' | 'video',
  created_at: string,
  bytes: number,
  type: 'upload' | 'delete',
  url: string,
  secure_url: string
}

export { CloudinaryModel }

