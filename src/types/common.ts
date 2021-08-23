export interface IPath {
    name: string;
    children?: IRenderTree[];
    id: string;
  }

export interface IRenderTree {
    id: string;
    name: string;
    type: string;
    parentNode: IRenderTree | null;
    children?: IRenderTree[];
  }

export interface ITreeReq {
  path: string;
}

export interface ITreeRes {
  fileInfoList: FileInfo[];
}

export interface FileInfo {
  type: 'dir' | 'file';
  name: string;
}