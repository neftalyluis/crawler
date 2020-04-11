import puppeteer from 'puppeteer'
import Auth from './Auth.mjs'

class Crawler {
  static async run (user, password) {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1366, height: 768} })
    const page = await browser.newPage()

    const auth = await new Auth(page, user, password)

    const loginResult = await auth.login()

    if (!loginResult) {
      await browser.close()
      throw new Error("No se pudo hacer Login");
    }

    console.log("Se pudo hacer login?: ", loginResult)

    const logoutResult = await auth.logout()

    console.log(logoutResult)

    await new Promise((resolve, _reject) => {
      setTimeout(() => resolve('done!'), 1000000)
    })

    await browser.close()
  }
}

export default Crawler
