const visit = () => cy.visit('/scan/checkin1');

describe('ScanScreen screen, test redirect', () => {
    it('redirects to previous screen, if request an invalid ScanAction', () => {
        cy.visit('/settings');
        cy.location('pathname').should('eq', '/settings')
        cy.visit('/scan/an-invalid-scancode');
        cy.location('pathname').should('eq', '/settings')
    })
})

describe('ScanScreen screen, behaves correctly', () => {
    beforeEach(visit)

    it('component should be loaded', () => {
        cy.get('[data-test="camera"]').should('be.visible');
        cy.get('video').should('be.visible');
    })

    it('When Camera is showing and no-qr-code detected, there is no scanContent, no External-Content, no Continue button', () => {
        cy.get('[data-test="camera"]').should('be.visible')
        cy.get('[data-test="scan-content"]').should('not.exist');
        cy.get('[data-test="external-content"]').should('not.exist');
        cy.get('[data-test="btn-continue-scan"]').should('not.exist');
    })

    it('When QR code detected, Camera is turned-off', () => {
        cy.wait(5000);
        cy.get('[data-test="scan-content"]').should('contain.text', '1213343634');
        cy.get('[data-test="camera"]').should('not.be.visible')
        cy.get('video').should('not.be.visible');
    })

    it('When QR code detected, show the scanned QR-Content', () => {
        cy.wait(5000);
        cy.get('[data-test="scan-content"]').should('contain.text', '1213343634');
    })

    it('When QR code detected, show a Continue button', () => {
        cy.wait(5000);
        cy.get('[data-test="scan-content"]').should('contain.text', '1213343634');
        cy.get('[data-test="btn-continue-scan"]').should('be.visible');
    })

    it('When QR code detected, show an IFrame that load external content', () => {
        cy.wait(5000);
        cy.get('[data-test="scan-content"]').should('contain.text', '1213343634');
        cy.get('[data-test="external-content"]').should('be.visible');
        //cy.get('[data-test="external-content"]').its('src').should('equal', 'https://127.0.0.1:8443/admin/qr-check/nestle?key=1213343634&activityName=CheckIn&recept=Uyen');
    })

    it('When QR code detected, click on Continue button, will start Camera', () => {
        cy.wait(5000);
        cy.get('[data-test="scan-content"]').should('contain.text', '1213343634');
        cy.get('[data-test="btn-continue-scan"]').click()
        cy.get('[data-test="camera"]').should('be.visible')
        cy.get('video').should('be.visible');
    })
})