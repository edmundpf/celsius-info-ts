# celsius-info-ts
> Celsius Wallet Info using read-only Partner Key and API Key

## Install
``` bash
$ npm i -S celsius-info-ts
```

## Usage
``` javascript
import CelsiusInfo from 'celsius-info-ts'

const run = async () => {
	const info = new CelsiusInfo()
	await info.driver({ log: true })
}

run()
```

## Environment Variables
* CELSIUS_API_KEY: string
	* Your Celsius API Key from within the app
* CELSIUS_PARTNER_KEY
	* Your Celsius Partner Key. You must reach out to [partners@celsius.network](mailto:partners@celsius.network) via email to obtain a read-only partner key.
* COIN_MARKET_CAP_KEY
	* Coin Market Cap API Key. This is used to fetch current prices for balances.

## Documentation
* [Package Docs](docs/globals.md)
