
async function expoDeepLink13_6(client) {
	const urlSelector = 'label == "Address"'
	const urlField = await client.$(`-ios predicate string:${urlSelector}`)
	await urlField.setValue('exp://192.168.1.39:19000\uE007')
}

async function handleFirstLaunch(client) {
	try {
		const gotItSelector = 'label == "Got it"';
		const gotIt = await client.$(`-ios predicate string:${gotItSelector}`);
		await gotIt.click();
		const reloadSelector = 'type == \'XCUIElementTypeOther\' && name CONTAINS \'Reload\'';
		const reload = await client.$(`-ios predicate string:${ reloadSelector }`);
		await reload.click();
	} catch (err) {
		console.log('No need to handle first launch');
	}
}

async function reloadExpo(client) {
  await client.shake();
  const reloadSelector = 'type == \'XCUIElementTypeOther\' && name CONTAINS \'Reload\'';
  const reload = await client.$(`-ios predicate string:${ reloadSelector }`);
  await reload.click();
}

describe('My Login application', () => {
	before(async () => {
		await driver.execute('mobile: launchApp', { bundleId: 'com.apple.mobilesafari' });
		await expoDeepLink13_6(driver)
		await handleFirstLaunch(driver)
		// await reloadExpo(driver)
	})
    it('should start', async () => {
			await $('~Start').click()
			await $('~Answer-1').click()
			await $('~Answer-1').click()
			await $('~Answer-1').click()
			await $('~Answer-1').click()
			await $('~Answer-1').click()
			await $('~Answer-1').click()
			await $('~Answer-1').click()
			await $('~Answer-1').click()
			await $('~Answer-1').click()
			await $('~Answer-1').click()
			await driver.saveScreenshot('result.png')
    });
});

