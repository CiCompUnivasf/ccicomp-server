import { S3 } from 'aws-sdk';

export interface StoredObject {
  name: string;
  content: S3.Body;
  contentType?: S3.ContentType;
}
