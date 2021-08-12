import CelsiusInfo from './'

/**
 * Main
 */

const main = async () => {
	const info = new CelsiusInfo()
	await info.driver({ log: true })
}

// Run

main()
