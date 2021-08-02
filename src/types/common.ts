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