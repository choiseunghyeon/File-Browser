import { IFlatMap, IPasteReq, IRenderTree } from "../types/common";

let uid = 1;
export const createTreeData = (parentNode, file) => ({
  id: "" + uid++,
  name: file.name,
  type: file.type,
  parentNodeId: parentNode.id,
  // children: [],
});

export const createPasteReq = (flatMap: IFlatMap, node: IRenderTree, destNode: IRenderTree): IPasteReq => {
  return {
    type: isDirectory(node) ? 'dir' : 'file',
    path: getAbsolutePathIn(flatMap, node.id),
    name: node.name,
    destPath: getAbsolutePathIn(flatMap, destNode.id),
  };
};

export const createFileDataWithNode = (node) => ({
  name: node.name,
  type: node.type,
})

export const getAbsolutePathIn = (flatMap, id) => {
  let result: string[] = [];
  let node = flatMap[id];

  while (node) {
    result.push(node.name);
    node = flatMap[node.parentNodeId];
  }
  return result.reverse().join("/");
};

export const getCurrentPath = (map, nodeId) => {
  let result: IRenderTree[] = [];

  let node: IRenderTree = map[nodeId];
  if (!node) return;

  do {
    result.push({ ...node });
    if (node.parentNodeId === null) {
      break;
    } else {
      node = map[node.parentNodeId];
    }
  } while (node);

  return result.reverse();
};

export const getNodeInTree = (tree, id) => {
  const q = [tree];

  while (q.length !== 0) {
    const currentNode = q.shift();
    if (typeof currentNode === "undefined") break;

    if (currentNode.id === id) {
      return currentNode;
    }

    currentNode.children?.forEach(node => q.push(node));
  }
};

export const getNodeInFlatMap = (flatMap, id) => {
  return flatMap[id];
};

export const isDirectory = node => {
  return node.type === "dir";
};

export const hasDirectory = nodeList => {
  return nodeList.some(node => isDirectory(node));
};

export const changeTreeIntoFlatMap = (tree: IRenderTree): IFlatMap => {
  const flatMap = {};
  const q = [tree];
  while (q.length !== 0) {
    const currentNode = q.shift();
    if (typeof currentNode === "undefined") break;

    const key = currentNode.id;
    flatMap[key] = currentNode;

    currentNode.children?.forEach(node => q.push(node));
  }

  return flatMap;
};

export const updateFlatMap = (flatMap: IFlatMap, nodes: IRenderTree[]) => {
  const q = nodes;

  while (q.length !== 0) {
    const currentNode = q.shift();
    if (typeof currentNode === "undefined") break;

    const key = currentNode.id;
    flatMap[key] = currentNode;
  }

  return flatMap;
};

export const deleteChildNode = (node: IRenderTree, flatMap: IFlatMap, targetNodeId: string) => {
  if (node.children === undefined) return;

  const removableIndex = node.children.findIndex((childNode) => childNode.id === targetNodeId);
  node.children.splice(removableIndex, 1);

  delete flatMap[targetNodeId];
}


export const updateHistory = (history, currentIndex, nodeId) => {
  const lastIndex = history.length -1;
  if (lastIndex !== currentIndex) {
    const nextIndex = currentIndex + 1;
    history.splice(nextIndex);
  }

  history.push(nodeId);
} 


export const validateIndex = (arr, index) => {
  if (arr.length === 0) return false;
  
  const firstIndex = 0;
  const lastIndex = arr.length - 1;
  return index >= firstIndex && index <= lastIndex;
} 
