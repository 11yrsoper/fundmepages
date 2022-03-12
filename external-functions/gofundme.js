// async function getCampaignInfo(url) {
// 	const browser = await puppeteer.launch({
// 		headless: !false,
// 		args: ["--start-maximized"],
// 		defaultViewport: null,
// 	});
// 	const page = await browser.newPage();
// 	await page.goto(decodeURIComponent(url));
// 	const goal = await page.$eval(".text-stat.text-stat-title", (e) =>
// 		e.innerText.split(" ")
// 	);
// 	const raised = await page.$eval(".m-progress-meter-heading", (e) =>
// 		e.innerText.split(" ")
// 	);

// 	await browser.close();
// 	let symbolToAbbrev = {
// 		"€": "EUR",
// 		"£": "GBP",
// 		"₺": "TRY",
// 		$: "USD",
// 	};

// 	if (["USD", "CAD", "AUD", "GBP"].includes(goal[0])) {
// 		return {
// 			goal: goal[3],
// 			raised: raised[0],
// 			currency: symbolToAbbrev[goal[3][0]],
// 			formatted: {
// 				goal: parseFloat(
// 					goal[3]
// 						.replace("$", "")
// 						.replace("€", "")
// 						.replace("£", "")
// 						.replace(",", "")
// 						.replace(",", "")
// 				),
// 				raised: parseFloat(
// 					raised[0]
// 						.replace("$", "")
// 						.replace("€", "")
// 						.replace("£", "")
// 						.replace(",", "")
// 						.replace(",", "")
// 				),
// 			},
// 		};
// 	} else {
// 		return {
// 			goal: goal[2],
// 			raised: raised[0],
// 			currency: symbolToAbbrev[goal[2][0]],
// 			format: {
// 				goal: parseInt(
// 					goal[2]
// 						.replace("$", "")
// 						.replace("€", "")
// 						.replace("£", "")
// 						.replace(",", "")
// 						.replace(",", "")
// 				),
// 				raised: parseInt(
// 					raised[0]
// 						.replace("$", "")
// 						.replace("€", "")
// 						.replace("£", "")
// 						.replace(",", "")
// 						.replace(",", "")
// 				),
// 			},
// 		};
// 	}
// }

// export { getCampaignInfo };

// DRAAAFT.
