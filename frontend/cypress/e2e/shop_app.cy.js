// cypress/e2e/shop_app.cy.js

describe('ShopStack basic user flow', () => {
  it('loads the home page and navigates to Products', () => {
    cy.visit('http://localhost:3000');
    cy.contains(/welcome to shopstack/i).should('be.visible');
    cy.contains('Products').click();
    cy.contains(/products/i).should('be.visible');
  });
});
