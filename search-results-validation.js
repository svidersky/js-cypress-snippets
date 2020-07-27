/**
 * Seaches for a content using provided string
 * @param  {[Text]} phrase [Search query]
 * @example
    import {searchForContent} from './search_utils'
    searchForContent("phrase")
 */
export const searchForContent = (phrase) => {
   cy.server();
   cy.route(`**filter=title=@\\*${phrase}\\**`).as('search');
   cy.get(searchField)
      .should("be.visible") // Needed check to avoid failures when a dropdown is still covering the field
      .type(phrase);
   cy.get(searchButton).click();
   };
   cy.wait('@search');
};

/**
* Validates Search results on the Search page in case of successful search:
* @param  {[Text]} queryText [Query that was used to perform search]
* @example
   import {validatePositiveSearchResults} from './search_utils'
   validatePositiveSearchResults()
*/
export const validatePositiveSearchResults = (queryText) => {
    cy.get('[data-test=some-section').should("exist");
    cy.get('[data-test=another-section]').should("not.exist");
    cy.get('[data-test=searchItemTitle]')
      .each(($title) => {
        cy.wrap($title) // Wrap each div with title so that Cypress can iterate it
          .invoke("text") // Needs to take the full text value of an item name as long names are cut off and not visible
          .then(text => {
            expect(text.toLowerCase()).to.contain(queryText) // Put the titles in a lower case to make it case insensitive to compare with the original query string
          });
    });
};
