class CifDownloader {
  constructor (page) {
    this.page = page

    this.url = 'https://rfcampc.siat.sat.gob.mx/app/seg/SessionBroker?' +
            'url=/PTSC/IdcSiat/autc/ReimpresionTramite/ConsultaTramite.jsf' +
            '&parametro=c&idSessionBit='
  }

  async obtainPdf () {
    await this.page.goto(this.url, { waitUntil: 'networkidle2' })
    const result = await this.page.click("button[name='formReimpAcuse:j_idt50']")

    console.log(result)

    await new Promise((resolve, reject) => {
      setTimeout(() => resolve('done!'), 1000000)
    })
  }
}

export default CifDownloader
