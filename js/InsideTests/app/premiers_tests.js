'use strict',

Test.new("Mon premier test passe-t-il ?", async function(){

	await App.isReady()

	const miniEditor = DGet('#mini-editor')
	DGet('input[type="text"]', miniEditor).value = "Mon trop beau tableau"
	await wait(2)
	DGet('button#mini-editor-btn-save').click()

	return true
})