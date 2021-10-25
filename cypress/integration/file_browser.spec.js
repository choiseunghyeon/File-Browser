import {
  itemSelector,
  pathSelector,
  pathArrowSelector,
  treeItemSelector,
  initialPath,
  initialState,
  nextPath,
  nextState,
  BASE_URL,
  layerPathSelector,
  APP_STORY_URL,
} from "../../src/tests/constValue";
import { validateRootPath } from "../utils";

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
    cy.visit(APP_STORY_URL);

    // main
    validateRootPath();

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

    cy.get(layerPathSelector).within(items => {
      expect(items).to.have.length(3);
      expect(items[0]).to.have.contain("Data");
      expect(items[1]).to.have.contain("Image");
      expect(items[2]).to.have.contain("Setup");
    });
  });
});
