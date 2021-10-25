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
  previousPathSelector,
  nextPathSelector,
  APP_STORY_URL,
} from "../../src/tests/constValue";
import { validateNextPath, validateRootPath } from "../utils";

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

  cy.visit(APP_STORY_URL);
  cy.wait("@getRootPath");

  validateRootPath();
});

describe("move next path", () => {
  it("when mainbody item dblclick then move next path", () => {
    cy.get(itemSelector).contains("Data").dblclick();

    cy.wait("@getNextPath");

    validateNextPath();
  });

  it("when tree item click then move next path", () => {
    cy.get(treeItemSelector).contains("C:/").click();

    cy.get(treeItemSelector).contains("Data").click();

    cy.wait("@getNextPath");

    validateNextPath();
  });

  it("when navigation layer click then move selected path", () => {
    cy.get(pathArrowSelector).click();

    cy.get(layerPathSelector).contains("Data").click();

    cy.wait("@getNextPath");

    validateNextPath();

    cy.get(pathArrowSelector).within(items => {
      expect(items).to.have.length(2);
    });

    cy.get(pathSelector).within(items => {
      expect(items).to.have.length(2);
    });
  });
});

describe("move next path or previous path", () => {
  it("move previous path", () => {
    // 이동할 경로가 없으므로 현재 경로 유지
    cy.get(previousPathSelector).click();

    validateRootPath();

    cy.get(itemSelector).contains("Data").dblclick();

    cy.wait("@getNextPath");

    validateNextPath();

    cy.get(previousPathSelector).click();

    validateRootPath();
  });
  it("move next path", () => {
    // 이동 기록 없으므로 현재 경로 유지
    cy.get(nextPathSelector).click();
    validateRootPath();

    // main item을 통해 다음 경로 이동
    cy.get(itemSelector).contains("Data").dblclick();
    cy.wait("@getNextPath");
    validateNextPath();

    // 이전 경로 이동
    cy.get(previousPathSelector).click();
    validateRootPath();

    // 다음 경로 이동
    cy.get(nextPathSelector).click();
    validateNextPath();
  });
});
