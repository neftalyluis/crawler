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
    await this.page.waitForNavigation()
    await this.page.type('input[formcontrolname="nip"]', this.password)
    await this.page.click('button[class="rounded-red-button"]')

    // Waits for the main page to be loaded
    if (await this.alreadyLoggedIn()) {
      return false
    }

    return this.page.url() === 'https://www.santander.com.mx/MiSitioPrivado/inicio'
  }

  async alreadyLoggedIn() {
    try {
      await this.page.waitForSelector('div[_nghost-c17]', {timeout: 5000})
      return true
    } catch (error) {
      return false
    }
  }

  async logout () {
    await this.page.click('div[_ngcontent-c7]')
    await this.page.waitForSelector('ng-component[_nghost-c43]')
    await this.page.click('button[_ngcontent-c43][class="btn btnright ng-star-inserted"]')

    await this.page.waitForNavigation()

    return this.page.url() === 'https://www.santander.com.mx/logout.html'
  }
}

export default Auth
