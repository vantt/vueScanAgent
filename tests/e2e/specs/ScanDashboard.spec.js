// import { mockScanAction1 } from '../../data/scanActions'
const visit = () => cy.visit('/scans')

describe('ScanDashboard screen, renders correctly', () => {
    beforeEach(visit)

    it('component should be loaded', () => {
        cy.get('[data-test="app-component"]').should('be.visible')
    })
})


describe('ScanDashboard screen, cards behave correctly', () => {
    beforeEach(visit)

    it('renders 3 cards', () => {
        cy.get('[data-test="scan-card"]').should('have.length', 3)
    })

    it('click on Scan Card, QRSCan screen should be loaded', () => {
        const card = cy.get('[data-test="scan-card"]').first();
        card.click();
        cy.location('pathname').should('eq', '/scan/checkin1')
    })

    it('click on Scan Button, QRSCan screen should be loaded', () => {
        const btn = cy.get('[data-test="scan-card"]').first().find('[data-test="scan-action"]');
        btn.click();
        cy.location('pathname').should('eq', '/scan/checkin1')
    })
})


describe('ScanDashboard screen, Add New button', () => {
    beforeEach(visit)

    it("renders an addNew button", () => {
        cy.get('[data-test="addNew-btn"]').should('be.visible');
    });

    it("click on Add New button, then save, new Item created", () => {
        cy.get('[data-test="scan-card"]').should('have.length', 3);

        // then, click on Add New button
        cy.get('[data-test="addNew-btn"]').click();
        cy.waitFor('[data-test="btn-save"]');

        // then, click save on the new Form
        cy.get('[data-test="btn-save"]').click();

        // it should redirect to /settings
        cy.location('pathname').should('eq', '/settings')

        // it should render new setting-cards
        cy.get('[data-test="setting-card"]').should('have.length', 4);
    });
})

