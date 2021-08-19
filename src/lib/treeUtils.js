let uid = 1;
export const createTreeData = (parentNode, file) => ({
  id: "" + uid++,
  name: file.name,
  type: file.type,
  parentNode,
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

export const getCurrentPath = node => {
  let result = [];

  do {
    result.push({ ...node });
    node = node.parentNode;
  } while (node);

  return result.reverse();
};

export const getNodeById = (node, id) => {
  const q = [node];

  while (q.length !== 0) {
    const currentNode = q.shift();
    if (typeof currentNode === "undefined") break;

    if (currentNode.id === id) {
      return currentNode;
    }
    currentNode.children?.forEach(node => q.push(node));
  }
};

export const isDirectory = node => {
  return node.type === "dir";
};

export const hasDirectory = nodeList => {
  return nodeList.some(node => isDirectory(node));
};
