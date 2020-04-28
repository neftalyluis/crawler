class Auth {
  constructor (page, user, password) {
    this.page = page
    this.user = user
    this.password = password
    this.url = 'https://www.santander.com.mx/MiSitioPrivado/'
  }

  async login () {
    await this.page.goto(this.url, { waitUntil: 'networkidle2' })

    await this.page.type('input[formcontrolname="client"]', this.user)
    await this.page.click('button[class="rounded-red-button btn-continue"]')

    // Awaits for the password field to be present on the DOM
    await this.page.waitForSelector('p[_ngcontent-c16][class="welcome"]')
    await this.page.type('input[formcontrolname="nip"]', this.password)
    await this.page.click('button[class="rounded-red-button"]')

    // Waits for the main page to be loaded
    if (await this.alreadyLoggedIn()) {
      return false
    }

    return this.page.url() === 'https://www.santander.com.mx/MiSitioPrivado/inicio'
  }

  async alreadyLoggedIn () {
    try {
      await this.page.waitForSelector('div[_nghost-c17]', { timeout: 5000 })
      return true
    } catch (error) {
      return false
    }
  }

  async logout () {
    await this.page.click('a[class="txt-option text-right align-middle"] > img[src="assets/img/cerrar_sesion_header_white.svg"]')
    await this.page.waitForSelector('ngb-modal-window[role="dialog"]', { timeout: 5000 })
    await this.page.click('button[class="btn btnright ng-star-inserted"]')

    await this.page.waitForNavigation()

    return this.page.url() === 'https://www.santander.com.mx/logout.html'
  }
}

export default Auth
