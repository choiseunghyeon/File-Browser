export interface IPath {
  name: string;
  children?: IRenderTree[];
  id: string;
}

export interface ITree {
  /** 트리 데이터 입니다. */
  tree: IRenderTree;
}

export interface IRenderTree {
  id: string;
  name: string;
  type: string;
  parentNodeId: string | null;
  children?: IRenderTree[];
}

export interface IFlatMap {
  [key: string]: IRenderTree;
}

export interface IPasteReq {
  type: "dir" | "file";
  path: string;
  name: string;
  destPath: string;
}

export interface ITreeReq {
  path: string;
}

export interface ITreeRes {
  fileInfoList: FileInfo[];
}

export interface FileInfo {
  type: "dir" | "file";
  name: string;
}
