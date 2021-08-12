# celsius-info-ts
> Celsius Wallet Info using read-only partner key and API Key

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

## Documentation
* [Package Docs](docs/globals.md)
