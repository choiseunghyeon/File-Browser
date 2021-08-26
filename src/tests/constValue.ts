
function createTestSelector(name, value) {
    return `[${name}=${value}]`;
}

const dataSetNameForTest = 'data-testid';
export const itemValue = 'item';
export const pathValue = 'pathSpan';
export const pathArrowValue = 'pathNavigation';
export const treeValue = 'treeItem';
export const layerPathValue = 'layerPath';
export const nextPathValue = 'nextPath';
export const previousPathValue = 'previousPath';

export const itemSelector = createTestSelector(dataSetNameForTest, itemValue);
export const pathSelector = createTestSelector(dataSetNameForTest, pathValue);
export const pathArrowSelector = createTestSelector(dataSetNameForTest, pathArrowValue);
export const treeItemSelector = createTestSelector(dataSetNameForTest, treeValue);
export const layerPathSelect = createTestSelector(dataSetNameForTest, layerPathValue);
export const nextPathSelector = createTestSelector(dataSetNameForTest, nextPathValue);
export const previousPathSelector = createTestSelector(dataSetNameForTest, previousPathValue);

export const initialPath = "C:/";
export const nextPath = "C:/Data";
export const BASE_URL = "http://localhost:5000";

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
