class Movements {
  constructor (page) {
    this.page = page
  }

  async getFromAccount () {
    await this.page.click('a[_ngcontent-c7][class="nav-link"] > span[class="fav-icon-paysheet"]')
    await this.page.waitForSelector('super-carousel', { timeout: 5000 })


    this.sleep(60000000)
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

export default Movements
