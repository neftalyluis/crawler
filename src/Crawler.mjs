import puppeteer from 'puppeteer'
import Auth from './Auth.mjs'
import Accounts from './Accounts.mjs'

class Crawler {
  static async run (user, password) {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1366, height: 768 },
      args: [
        '--window-size=1366,768'
      ]
    })

    const page = await browser.newPage()

    const auth = new Auth(page, user, password)

    const loginResult = await auth.login()

    if (!loginResult) {
      await browser.close()
      throw new Error('No se pudo hacer Login')
    }

    const accounts = await new Accounts(page).listAll()
    console.log(accounts)

    await auth.logout()
    await browser.close()
  }
}

export default Crawler
