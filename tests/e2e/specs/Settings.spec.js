// import { mockScanAction1 } from '../../data/scanActions'
const visit = () => cy.visit('/settings')

describe('Settings screen, renders correctly', () => {
    beforeEach(visit)

    it('component should be loaded', () => {
        cy.get('[data-test="settings-component"]').should('be.visible')
    })
})

describe('Settings screen, Test render Cards', () => {
    beforeEach(visit)

    it('renders 3 cards', () => {
        cy.get('[data-test="setting-card"]').should('have.length', 3)
    })

    it('renders Title of a card', () => {
        const card = cy.get('[data-test="setting-card"]').first();
        card.find('[data-test="card-title"]').contains('Checkin1');
    })

    it('renders Code of a card', () => {
        const card = cy.get('[data-test="setting-card"]').first();
        card.find('[data-test="card-code"]').contains('[ checkin1 ]');
    })

    it('renders Link of a card', () => {
        const card = cy.get('[data-test="setting-card"]').first();
        card.find('[data-test="card-link"]').contains('https://127.0.0.1:8443/admin/qr-check/nestle?key=%scanValue%&activityName=CheckIn&recept=Uyen');
    })

    it('renders Edit button of a card', () => {
        const card = cy.get('[data-test="setting-card"]').first();
        card.find('[data-test="card-edit"]').should('be.visible');
    })

    it('renders Copy  button of a card', () => {
        const card = cy.get('[data-test="setting-card"]').first();
        card.find('[data-test="card-copy"]').should('be.visible');
    })

    it('renders Delete button of a card', () => {
        const card = cy.get('[data-test="setting-card"]').first();
        card.find('[data-test="card-delete"]').should('be.visible');
    })
});


describe('Settings screen, Test a card behaviors', () => {
    beforeEach(visit)

    it('click on Edit button of first card, show the Edit Screen', () => {
        const cardCode = 'checkin1';

        cy.get('[data-test="setting-card"]').first().find('[data-test="card-edit"]').click();
        cy.get('[data-test="settingItem-component"]').should('be.visible')
        cy.location('pathname').should('eq', `/setting/${cardCode}/edit`)
        cy.get('[data-test="field-code"]').should('have.value', cardCode)
    })

    it('click on Copy button of first card, show the Copy Screen', () => {
        const cardCode = 'checkin1';

        cy.get('[data-test="setting-card"]').first().find('[data-test="card-copy"]').click();
        cy.get('[data-test="settingItem-component"]').should('be.visible')
        cy.location('pathname').should('contain', `/setting/Copy_${cardCode}_`)
        cy.get('[data-test="field-code"]').should('contain.value', 'Copy_checkin1_')
    })

    it('click on Delete button of first card, cards are deleted', () => {
        cy.get('[data-test="setting-card"]').should('have.length', 3)
        cy.get('[data-test="setting-card"]').first().find('[data-test="card-delete"]').click();
        cy.get('[data-test="setting-card"]').should('have.length', 2)
        cy.get('[data-test="setting-card"]').first().find('[data-test="card-delete"]').click();
        cy.get('[data-test="setting-card"]').should('have.length', 1)
        cy.get('[data-test="setting-card"]').first().find('[data-test="card-delete"]').click();
        cy.get('[data-test="setting-card"]').should('have.length', 0)
    })
});


describe('Settings screen, Test Speed Dial', () => {
    beforeEach(visit)

    it("renders an Speed Dial button", () => {
        cy.get('[data-test="speed-dial"]').should('be.visible');
    });

    it("given no Action Items are showed, when clicking on SpeedDial button, renders 4 Action buttons", () => {
        const speedDial = cy.get('[data-test="speed-dial"]');
        speedDial.find('[data-test~="speed-action"]').should('have.length', 0)
        cy.get('[data-test="speed-dial"]').click();
        speedDial.find('[data-test~="speed-action"]').should('have.length', 4)
    });

    it("given 4 Action Items are showed, when clicking on SpeedDial button, hide all Action buttons", () => {
        const speedDial = cy.get('[data-test="speed-dial"]');
        cy.get('[data-test="speed-dial"]').click();
        speedDial.find('[data-test~="speed-action"]').should('have.length', 4)

        cy.get('[data-test="speed-dial"]').click();
        speedDial.find('[data-test~="speed-action"]').should('have.length', 0)
    });

    it("given a messy data, click on Reset Button, will reset default-clean data", () => {
        // first, delete some Cards
        cy.get('[data-test="setting-card"]').should('have.length', 3)
        cy.get('[data-test="setting-card"]').first().find('[data-test="card-delete"]').click();
        cy.get('[data-test="setting-card"]').first().find('[data-test="card-delete"]').click();
        cy.get('[data-test="setting-card"]').should('have.length.lt', 3)

        // then, click on Speed Dial button
        const speedDial = cy.get('[data-test="speed-dial"]');
        cy.get('[data-test="speed-dial"]').click();

        // then, click on Reset Action button
        speedDial.get('[data-test~="reset-settings"]').click();

        cy.get('[data-test="setting-card"]').should('have.length', 3)
    });

    it("given a empty data, click on New Item Button, will renders 1 card", () => {
        // first, delete some Cards
        cy.get('[data-test="setting-card"]').should('have.length', 3)
        cy.get('[data-test="setting-card"]').first().find('[data-test="card-delete"]').click();
        cy.get('[data-test="setting-card"]').first().find('[data-test="card-delete"]').click();
        cy.get('[data-test="setting-card"]').first().find('[data-test="card-delete"]').click();
        cy.get('[data-test="setting-card"]').should('have.length', 0)

        // then, click on Speed Dial button
        const speedDial = cy.get('[data-test="speed-dial"]');
        cy.get('[data-test="speed-dial"]').click();

        // then, click on New Scan Action button
        speedDial.get('[data-test~="new-scan"]').click();

        // then, click save on the new Form
        cy.get('[data-test="btn-save"]').click();

        cy.get('[data-test="setting-card"]').should('have.length', 1);
    });
});