describe('My Login application', () => {
	beforeEach(async () => {
		await $('~Trivia').waitForExist({timeout: 10000});
	});

	it('should login with valid credentials', async () => {
		await $('~Start').click();
	});
});

