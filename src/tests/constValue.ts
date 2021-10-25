function createTestSelector(name, value) {
  return `[${name}=${value}]`;
}

const dataSetNameForTest = "data-testid";
export const itemValue = "item";
export const pathValue = "pathSpan";
export const pathArrowValue = "pathNavigation";
export const treeValue = "treeItem";
export const layerPathValue = "layerPath";
export const nextPathValue = "nextPath";
export const previousPathValue = "previousPath";
export const emptySpaceValue = "emptySpace";

export const itemSelector = createTestSelector(dataSetNameForTest, itemValue);
export const pathSelector = createTestSelector(dataSetNameForTest, pathValue);
export const pathArrowSelector = createTestSelector(dataSetNameForTest, pathArrowValue);
export const treeItemSelector = createTestSelector(dataSetNameForTest, treeValue);
export const layerPathSelector = createTestSelector(dataSetNameForTest, layerPathValue);
export const nextPathSelector = createTestSelector(dataSetNameForTest, nextPathValue);
export const previousPathSelector = createTestSelector(dataSetNameForTest, previousPathValue);
export const emptySpaceSelector = createTestSelector(dataSetNameForTest, emptySpaceValue);

export const initialPath = "C:/";
export const nextPath = "C:/Data";
export const BASE_URL = "http://localhost:5000";

export const APP_STORY_URL = `http://localhost:6006/iframe.html?id=app--default&args=&viewMode=story`;

export const initialState = [
  { type: "dir", name: "Data" },
  { type: "dir", name: "Image" },
  { type: "dir", name: "Setup" },
  { type: "file", name: "testFile" },
];

export const nextState = [
  { type: "dir", name: "history" },
  { type: "dir", name: "nextFolder" },
  { type: "file", name: "nextFile" },
];

export const rootStateAfterImagePaste = [
  { type: "dir", name: "Data" },
  { type: "dir", name: "Image" },
  { type: "dir", name: "Setup" },
  { type: "file", name: "testFile" },
  { type: "dir", name: "Image - 복사본 1" },
];

export const nextStateAfterPaste = [
  { type: "dir", name: "history" },
  { type: "dir", name: "nextFolder" },
  { type: "file", name: "nextFile" },
  { type: "dir", name: "Image" },
];
