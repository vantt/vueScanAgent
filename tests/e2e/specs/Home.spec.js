describe('Home, test redirects', () => {
    it('user enter "/" path, redirect to Scan ScanDashboard /scans path', () => {
        cy.visit('/')
        cy.location('pathname').should('eq', '/scans')
    })

    it('user enter "empty" path, redirect to Scan ScanDashboard /scans path', () => {
        cy.visit('')
        cy.location('pathname').should('eq', '/scans')
    })
});
