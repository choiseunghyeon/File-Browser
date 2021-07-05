export interface IPath {
    name: string;
    children?: IRenderTree[];
    id: string;
  }

export interface IRenderTree {
    id: string;
    name: string;
    parentNode: IRenderTree | null;
    children?: IRenderTree[];
  }