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
  layerPathSelect,
  emptySpaceSelector,
  rootStateAfterDataPaste,
} from "../../src/tests/constValue";
import { clickEmptySpace, clickEmptySpaceInMainContainer, rightClickEmptySpace, validateNextPath, validateRootPath, validateRootPathAfterPaste } from "../utils";

/**
 * navigation, mainbody, tree에서 경로 이동에 대한 테스트
 */

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
  }).as("getNextPath");

  cy.intercept("DELETE", `${BASE_URL}/folder`).as("deleteFolder");
  cy.intercept("POST", `${BASE_URL}/paste`, {
    body: rootStateAfterDataPaste,
  }).as("paste");
});

describe("layer", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait("@getRootPath");

    validateRootPath();
  });

  it("render layer correctly", () => {
    cy.get(itemSelector).contains("Data").rightclick();

    cy.get(layerPathSelect).within(items => {
      expect(items).to.have.length(3);
      expect(items[0]).to.have.contain("열기");
      expect(items[1]).to.have.contain("삭제");
      expect(items[2]).to.have.contain("복사");
    });
  });

  it("delete file from layer", () => {
    cy.get(itemSelector).contains("Data").rightclick();

    cy.get(layerPathSelect).contains("삭제").click();

    cy.wait("@deleteFolder");

    cy.get(itemSelector).within(items => {
      expect(items).to.have.length(initialState.length - 1);
      expect(items[0]).to.have.contain("폴더");
      expect(items[0]).to.have.contain("Image");

      expect(items[1]).to.have.contain("폴더");
      expect(items[1]).to.have.contain("Setup");

      expect(items[2]).to.have.contain("파일");
      expect(items[2]).to.have.contain("testFile");
    });
  });

  it("open folder from layer", () => {
    cy.get(itemSelector).contains("Data").rightclick();

    cy.get(layerPathSelect).contains("열기").click();

    cy.wait("@getNextPath");

    validateNextPath();
  });

  // it("rename file or folder from layer", () => {});

  describe("copy & paste", () => {
    it("paste Folder to empty space", () => {
      cy.get(itemSelector).contains("Data").rightclick();
      cy.get(layerPathSelect).contains("복사").click();

      cy.get(emptySpaceSelector).rightclick();
      cy.get(layerPathSelect).contains("붙여넣기").click();

      cy.wait("@paste");

      validateRootPathAfterPaste();
    });

    it("paste Folder in Folder", () => {
      cy.get(itemSelector).contains("Data").rightclick();
      cy.get(layerPathSelect).contains("복사").click();

      cy.get(itemSelector).contains("image").rightclick();
      cy.get(layerPathSelect).contains("붙여넣기").click();

      // 이 작업 마무리 하기
      cy.wait("@paste");

      validateRootPathAfterPaste();
    });
  });
});
