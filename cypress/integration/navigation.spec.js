import { itemSelector, pathSelector, pathArrowSelector, treeItemSelector, initialPath, initialState, nextPath, nextState, BASE_URL, layerPathSelect } from "../../src/tests/constValue";

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
  });
});

describe("move next path", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait("@getRootPath");
  });
  it("when mainbody item dblclick then move next path", () => {
    /**
     * navigation, tree, mainBody에서 folder 이동 기능 테스트
     */

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

  it("when navigation layer click then move selected path", () => {
    cy.get(pathArrowSelector).click();

    cy.get(layerPathSelect).contains("Data").click();

    cy.get(itemSelector).within(items => {
      expect(items).to.have.length(nextState.length);
      expect(items[0]).to.have.contain("폴더");
      expect(items[0]).to.have.contain("history");

      expect(items[1]).to.have.contain("폴더");
      expect(items[1]).to.have.contain("nextFolder");

      expect(items[2]).to.have.contain("파일");
      expect(items[2]).to.have.contain("nextFile");
    });

    cy.get(pathArrowSelector).within(items => {
      expect(items).to.have.length(2);
    });

    cy.get(pathSelector).within(items => {
      expect(items).to.have.length(2);
    });
  });
  // navigation에서 layer 나오는거 이동 테스트 하기
});
