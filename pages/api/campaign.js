const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
// import { getCampaignInfo } from "../../external-functions/gofundme.js";

export default async function handler(req, res) {
	const getCampaignInfo = async (url) => {
		const browser = await puppeteer.launch({
			args: [
				...chrome.args,
				"--hide-scrollbars",
				"--disable-web-security",
				"--start-maximized",
			],
			headless: true,
			executablePath: process.env.PATH || (await chrome.executablePath),
			defaultViewport: chrome.defaultViewport,
			ignoreHTTPSErrors: true,
		});
		const page = await browser.newPage();
		await page.goto(url);
		const title = await page.title();
		// const goal = await page.$eval(".text-stat.text-stat-title", (e) =>
		// 	e.innerText.split(" ")
		// );
		// const raised = await page.$eval(".m-progress-meter-heading", (e) =>
		// 	e.innerText.split(" ")
		// );

		await browser.close();
		// let symbolToAbbrev = {
		// 	"€": "EUR",
		// 	"£": "GBP",
		// 	"₺": "TRY",
		// 	$: "USD",
		// };

		// if (["USD", "CAD", "AUD", "GBP"].includes(goal[0])) {
		// 	return {
		// 		goal: goal[3],
		// 		raised: raised[0],
		// 		currency: symbolToAbbrev[goal[3][0]],
		// 		formatted: {
		// 			goal: parseFloat(
		// 				goal[3]
		// 					.replace("$", "")
		// 					.replace("€", "")
		// 					.replace("£", "")
		// 					.replace(",", "")
		// 					.replace(",", "")
		// 			),
		// 			raised: parseFloat(
		// 				raised[0]
		// 					.replace("$", "")
		// 					.replace("€", "")
		// 					.replace("£", "")
		// 					.replace(",", "")
		// 					.replace(",", "")
		// 			),
		// 		},
		// 	};
		// } else {
		// 	return {
		// 		goal: goal[2],
		// 		raised: raised[0],
		// 		currency: symbolToAbbrev[goal[2][0]],
		// 		format: {
		// 			goal: parseInt(
		// 				goal[2]
		// 					.replace("$", "")
		// 					.replace("€", "")
		// 					.replace("£", "")
		// 					.replace(",", "")
		// 					.replace(",", "")
		// 			),
		// 			raised: parseInt(
		// 				raised[0]
		// 					.replace("$", "")
		// 					.replace("€", "")
		// 					.replace("£", "")
		// 					.replace(",", "")
		// 					.replace(",", "")
		// 			),
		// 		},
		// 	};
		// }
		return { title };
	};

	if (!!!req.query.url) {
		res.status(418).send("<h1>You forgot the URL dummy</h1>");
		return;
	}
	res.setHeader(
		"Cache-Control",
		`public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
	);
	// const { goal, raised, formatted } = await getCampaignInfo(
	// 	req.query.url.replace('"', "")
	// );

	const { title } = await getCampaignInfo(req.query.url.replace('"', ""));
	res.status(200).json({ goal, raised, formatted });
}
