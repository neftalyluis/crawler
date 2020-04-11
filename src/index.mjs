#!/bin/sh
':' // # http://sambal.org/?p=1014 ; exec /usr/bin/env node --experimental-modules "$0" "$@"

import Crawler from './Crawler.mjs'
import process from 'process'

try {
  Crawler.run(user, password)
} catch (error) {
  console.error(error)
}

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  process.exit(1)
})
