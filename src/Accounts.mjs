class Accounts {
  constructor (page) {
    this.page = page
    this.accountsSummary = []
  }

  async listAll () {
    this.page.on('response', this.extractFromRequest)

    await this.page.click('a[_ngcontent-c7][class="nav-link"] > span[class="fav-icon-wallet"]')
    await this.page.waitForSelector('super-carousel', { timeout: 5000 })
    return this.accountsSummary
  }

  extractFromRequest = async (response) => {
    if (response.url().includes('saldosCuentasChequesNB.do')) {
      this.accountsSummary = await response.json()
    }
  }
}

export default Accounts
