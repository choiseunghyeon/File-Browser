const initialState = [
  { type: "dir", name: "Data" },
  { type: "dir", name: "Image" },
  { type: "dir", name: "Setup" },
  { type: "file", name: "testFile" },
];

const nextState = [
  { type: "dir", name: "history" },
  { type: "dir", name: "nextFolder" },
  { type: "file", name: "nextFile" },
];

const itemSelector = "[data-testid=item]";
const pathSelector = "[data-testid=pathSpan]";
const pathArrowSelector = "[data-testid=pathNavigation]";
const treeItemSelector = "[data-testid=treeItem]";

const initialPath = "C:/";
const nextPath = "C:/Data";
const BASE_URL = "http://localhost:5000";

beforeEach(() => {
  cy.intercept("GET", `${BASE_URL}/all?path=${initialPath}`, {
    body: initialState,
    //path=C://Bitnami HTTP/1.1
    //   query: {
    //     path: "C:/",
    //   },
  });

  cy.intercept("GET", `${BASE_URL}/all?path=${nextPath}`, {
    body: nextState,
  });
});

describe("render file-browser", () => {
  it("render correctly", () => {
    cy.visit("/");

    // main
    cy.get(itemSelector).within(items => {
      expect(items).to.have.length(initialState.length);
      expect(items[0]).to.have.contain("폴더");
      expect(items[0]).to.have.contain("Data");

      expect(items[1]).to.have.contain("폴더");
      expect(items[1]).to.have.contain("Image");

      expect(items[3]).to.have.contain("파일");
      expect(items[3]).to.have.contain("testFile");
    });

    // navigation
    cy.get(pathSelector).contains(initialPath);
    cy.get(pathArrowSelector);

    // tree
    cy.get(treeItemSelector)
      .within(items => {
        expect(items).to.have.length(1);
        expect(items[0]).to.have.contain(initialPath);
      })
      .click();
    cy.get(treeItemSelector).within(items => {
      expect(items).to.have.length(4);
      expect(items[1]).to.have.contain("Data");
      expect(items[2]).to.have.contain("Image");
      expect(items[3]).to.have.contain("Setup");
    });
  });
});

describe("when item dblclick then move next path correctly", () => {
  it("when mainbody item dblclick then move next path", () => {
    /**
     * navigation, tree, mainBody에서 folder 이동 기능 테스트
     */
    cy.visit("/");

    cy.get(itemSelector).contains("Data").dblclick();

    cy.get(itemSelector).within(items => {
      expect(items).to.have.length(nextState.length);
      expect(items[0]).to.have.contain("폴더");
      expect(items[0]).to.have.contain("history");

      expect(items[1]).to.have.contain("폴더");
      expect(items[1]).to.have.contain("nextFolder");

      expect(items[2]).to.have.contain("파일");
      expect(items[2]).to.have.contain("nextFile");
    });
  });

  it("when tree item dblclick then move next path", () => {
    cy.visit("/");

    cy.get(treeItemSelector).contains("C:/").click();

    cy.get(treeItemSelector).contains("Data").click();

    cy.get(itemSelector).within(items => {
      expect(items).to.have.length(nextState.length);
      expect(items[0]).to.have.contain("폴더");
      expect(items[0]).to.have.contain("history");

      expect(items[1]).to.have.contain("폴더");
      expect(items[1]).to.have.contain("nextFolder");

      expect(items[2]).to.have.contain("파일");
      expect(items[2]).to.have.contain("nextFile");
    });
  });
  // navigation에서 layer 나오는거 이동 테스트 하기
});
