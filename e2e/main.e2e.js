// const { reloadApp } = require('detox-expo-helpers');

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Example', () => {
	beforeAll(async () => {
		await device.launchApp();
	});
	afterAll(async () => {
		await device.sendToHome();
	})

  beforeEach(async () => {
		device.reloadReactNative();
		//await reloadApp({url: 'exp://exp.host/@senhorbardell/trivia?release-channel=detox'});
		await waitFor(element(by.id('StartButton'))).toBeVisible().withTimeout(5000);
  });

	it('should have main screen', async () => {
		await expect(element(by.id('StartButton'))).toBeVisible()
	});

	it('should start the session', async () => {
		await waitFor(element(by.id('StartButton'))).toBeVisible()
		await element(by.id('StartButton')).tap();
		await waitFor(element(by.label('Answer-0'))).toBeVisible();
	});

	it('should finish the session', async () => {
		await waitFor(element(by.id('StartButton'))).toBeVisible()
		await element(by.id('StartButton')).tap();
		for (let i = 0; i < 10; i++) {
			await waitFor(element(by.id('Answer-0'))).toBeVisible().withTimeout(10000);
			await element(by.id(`Answer-0`)).tap();
		}
		await waitFor(element(by.text('Finished'))).toBeVisible();
	});

	it('should restart the session', async () => {
		await element(by.id('StartButton')).tap();
		for (let i = 0; i < 10; i++) {
			await waitFor(element(by.id('Answer-0'))).toBeVisible().withTimeout(10000);
			await element(by.id('Answer-0')).tap();
		}
		await element(by.id('Restart')).tap();
		await waitFor(element(by.id('Answer-0'))).toBeVisible().withTimeout(10000);
	});

	it('should run the second time', async () => {
		await element(by.id('StartButton')).tap();
		for (let i = 0; i < 10; i++) {
			await waitFor(element(by.id('Answer-0'))).toBeVisible().withTimeout(10000);
			await element(by.id('Answer-0')).tap();
		}
		await element(by.id('Restart')).tap();
		for (let i = 0; i < 10; i++) {
			await waitFor(element(by.id('Answer-0'))).toBeVisible().withTimeout(10000);
			await element(by.id('Answer-0')).tap();
		}
	})

});
