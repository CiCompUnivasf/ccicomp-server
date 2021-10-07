import { S3 } from 'aws-sdk';
import { StoredObject } from './stored-object.interface';

export interface StoreNewObject extends StoredObject {
  bucket?: string;
  // Habilitar acesso publico ao arquivo
  public?: boolean;
  // Caso exista um arquivo com o mesmo nome, sobrescrever.
  override?: boolean;
  // Altera o nome caso o arquivo exista e não possa sobrescrever
  mixNameOnExists?: boolean;

  mimeType?: string;

  folder?: string;
}

export interface StoreNewObjectResult {
  success: boolean;
  message?: string;
  data?: S3.ManagedUpload.SendData;
}
