import data from '../fixtures/prayer_data.json'

describe('WSB', () => {
  beforeEach(() => {
    localStorage.clear()
  });

  describe("on load with empty local storage", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should display loader if data is not available", () => {
      cy.get('#loader').should('exist')
    });
    it("should select Brunei Muara & Temburong district by default", () => {
      cy.contains('Brunei').should('have.class', 'v-btn--active')
    });
  });

  describe("on load with prayer data in local storage", () => {
    beforeEach(() => {
      localStorage.setItem('prayer_data', JSON.stringify(data))
      localStorage.setItem('debug_data', JSON.stringify({ customDateTime: '2021-01-01 00:00:00' }))
      cy.visit("/");
    });

    it('should display correct date format after data is loaded', () => {
      cy.contains("Jumaat")
      cy.contains("1 January 2021")
      cy.contains("17 Jamadilawal 1442")
    });

    it('should display correct count down message after data is loaded', () => {
      cy.contains("sekitar 5 jam lagi kn masuk waktu Imsak")
    });

    it('should display correct prayer times format after data is loaded', () => {
      cy.contains("Zuhur")
      cy.contains("12:25 pm")
      cy.contains("Asar")
      cy.contains("03:47 pm")
      cy.contains("Maghrib")
      cy.contains("06:19 pm")
      cy.contains("Isya")
      cy.contains("7:34 pm")
      cy.contains("Imsak")
      cy.contains("04:56 am")
      cy.contains("Subuh")
      cy.contains("05:06 am")
    });

    it('should display offset day when user click navigation buttons, display correct date and prayer name list', () => {
      cy.get("[value=1]").click()
      cy.contains("Sabtu")
      cy.contains("2 January 2021")
      cy.contains("18 Jamadilawal 1442")

      cy.contains("Imsak")
      cy.contains("Subuh")
      cy.contains("Syuruk")
      cy.contains("Duha")
      cy.contains("Zuhur")
      cy.contains("Asar")
      cy.contains("Maghrib")
      cy.contains("Isya")

      cy.get("[value=2]").click()
      cy.contains("Ahad")
      cy.contains("3 January 2021")
      cy.contains("19 Jamadilawal 1442")
    });

    it('should display correct date for offset day', () => {
    });

    it('should highlight correct active prayer time', () => {
      cy.contains('Isya').parent().should('have.class', 'active')
    });
  });

  describe("on debugging", () => {
    beforeEach(() => {
      localStorage.setItem('prayer_data', JSON.stringify(data))
      localStorage.setItem('debug_data', JSON.stringify({ isDebugging: true }))
      cy.visit("/");
    });

    it('should display debug panel', () => {
      cy.get("#debug").should("exist")
    });
    it('should display debug panel', () => {
      localStorage.setItem('debug_data', JSON.stringify({ isDebugging: true, customDateTime: '2021-01-01 00:00:00' }))
      cy.get("#debug").should("exist")
    });
  });
});