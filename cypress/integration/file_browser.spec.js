import { itemSelector, pathSelector, pathArrowSelector, treeItemSelector, initialPath, initialState, nextPath, nextState, BASE_URL, layerPathSelect } from "../../src/tests/constValue";

beforeEach(() => {
  cy.intercept("GET", `${BASE_URL}/all?path=${initialPath}`, {
    body: initialState,
    //path=C://Bitnami HTTP/1.1
    //   query: {
    //     path: "C:/",
    //   },
  }).as("getRootPath");

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

    // navigation
    cy.get(pathSelector).contains(initialPath);
    cy.get(pathArrowSelector).click();

    cy.get(layerPathSelect).within(items => {
      expect(items).to.have.length(3);
      expect(items[0]).to.have.contain("Data");
      expect(items[1]).to.have.contain("Image");
      expect(items[2]).to.have.contain("Setup");
    });
  });
});
