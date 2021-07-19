let uid = 1;
export const createTreeData = (parentNode, directory) => ({
  id: "" + uid++,
  name: directory.name,
  parentNode,
  // children: [],
});

export const getAbsolutePath = node => {
  let result = [];
  while (node !== null) {
    result.push(node.name);
    node = node.parentNode;
  }
  return result.reverse();
};

export const getCurrentPath = node => {
  let result = [];
  while (node) {
    result.push({ ...node });
    node = node.parentNode;
  }

  result.push({ ...node });

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

export const getNodeByName = (node, name) => {
  const q = [node];

  while (q.length !== 0) {
    const currentNode = q.shift();
    if (typeof currentNode === "undefined") break;

    if (currentNode.name === name) {
      return currentNode;
    }
    currentNode.children?.forEach(node => q.push(node));
  }
};
