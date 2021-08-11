const initialState = [
  { type: "dir", name: "Data" },
  { type: "dir", name: "Image" },
  { type: "dir", name: "Setup" },
  { type: "file", name: "testFile" },
];

const itemSelector = "[data-testid=item]";
const pathSelector = "[data-testid=pathSpan]";
const pathArrowSelector = "[data-testid=pathNavigation]";
const treeItemSelector = "[data-testid=treeItem]";

const initialPath = "C:/";

describe("render file-browser", () => {
  beforeEach(() => {
    // cy.server();
    // cy.route("/", initialState);
    cy.intercept("GET", `http://localhost:5000/all?path=${initialPath}`, {
      body: initialState,
      //path=C://Bitnami HTTP/1.1
      //   query: {
      //     path: "C:/",
      //   },
    });
  });

  it("render correctly", () => {
    cy.visit("/");

    // main
    cy.get(itemSelector).within(items => {
      expect(items).to.have.length(initialState.length);
      expect(items[0]).to.have.contain("폴더");
      expect(items[0]).to.have.contain("Data");

      expect(items[1]).to.have.contain("폴더");
      expect(items[1]).to.have.contain("Image");

      expect(items[2]).to.have.contain("폴더");
      expect(items[2]).to.have.contain("Setup");

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
