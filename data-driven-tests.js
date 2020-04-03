describe('Recently Consumed Feature Tests', () => {
    beforeEach(() => {
        // Set cookie to bypass pop-ups
        cy.setCookie('gdprCookieName', 'gdprCookieValue');
    });
    const features = [
        {
            featureName: 'Feature Name 1',
            consumeItem: () => {
                cy.get('[data-test=featureTile')
                  .should('be.visible')
                  .click();

                cy.get('[data-test=JwPlayerModal]')
                  .should('exist');

                // Wait for mp4 VOD chunks to be loaded via XHR
                cy.waitForHttpResponse('GET', 'std.mp4', 'mp4 chunks');
            },
            validateState: () => {      
                cy.get('[data-test=feature1ItemTitle]')
                  .should('be.visible')
                  .contains('RECENTLY WATCHED');

                // Should only show 1 item shown
                cy.get('[data-test=feature1ItemTitle]').should('have.length', 1);
            }
        },
        {
            featureName: 'Feature Name 2',
            consumeItem: () => {
                // Actions for the Feature 2
            },
            validateState: () => {      
                // Validations for the Feature 2
            }
        }
    ];

    features.forEach(feature => {
        it(`Should show Recently \"consumed\" featured list after consuming ${feature.featureName} item`, () => {
            // Consume an item
            feature.consumeItem();
            
            // Validate the Recently "consumed" feature state
            feature.validateState();
        });
    });
});
