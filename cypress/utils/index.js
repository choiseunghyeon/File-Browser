import { initialState, itemSelector, nextState } from "../../src/tests/constValue";

export const validateRootPath = () => {
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
};

export const validateNextPath = () => {
  cy.get(itemSelector).within(items => {
    expect(items).to.have.length(nextState.length);
    expect(items[0]).to.have.contain("폴더");
    expect(items[0]).to.have.contain("history");

    expect(items[1]).to.have.contain("폴더");
    expect(items[1]).to.have.contain("nextFolder");

    expect(items[2]).to.have.contain("파일");
    expect(items[2]).to.have.contain("nextFile");
  });
};
