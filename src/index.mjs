#!/bin/sh
':' // # http://sambal.org/?p=1014 ; exec /usr/bin/env node --experimental-modules "$0" "$@"

import Crawler from './Crawler.mjs'
import process from 'process'
import 'dotenv/config.js'

const user = process.env.SANTANDER_USER
const password = process.env.SANTANDER_PASSWORD

Crawler.run(user, password)

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)

  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  sleep(2000000000).then(() => {
    console.log('jaja salu2')
    process.exit(1)
  })
})
