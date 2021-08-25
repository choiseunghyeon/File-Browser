let uid = 1;
export const createTreeData = (parentNode, file) => ({
  id: "" + uid++,
  name: file.name,
  type: file.type,
  parentNodeId: parentNode.id,
  // children: [],
});

export const getAbsolutePath = node => {
  let result = [];
  while (node !== null) {
    result.push(node.name);
    node = node.parentNode;
  }
  return result.reverse().join("/");
};

export const getAbsolutePathIn = (flatMap, id) => {
  let result = [];
  let node = flatMap[id];

  while (node) {
    result.push(node.name);
    node = flatMap[node.parentNodeId];
  }
  return result.reverse().join("/");
};

export const getCurrentPath = (map, nodeId) => {
  // let result = [];

  // do {
  //   result.push({ ...node });
  //   node = node.parentNode;
  // } while (node);

  // return result.reverse();
  let result = [];

  let node = map[nodeId];
  if (!node) return;

  do {
    result.push({ ...node });
    node = map[node.parentNodeId];
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

export const changeTreeIntoFlatMap = tree => {
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

export const updateTreeChildrenIntoFlatMap = (tree, flatMap) => {
  const q = [tree, ...tree.children];

  while (q.length !== 0) {
    const currentNode = q.shift();
    if (typeof currentNode === "undefined") break;

    const key = currentNode.id;
    flatMap[key] = currentNode;
  }

  return flatMap;
};
