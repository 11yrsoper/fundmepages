// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cheerio from "cheerio";
import axios from "axios";
export default async function handler(req, res) {
	// res.setHeader(
	// 	"Cache-Control",
	// 	"maxage=900000, stale-while-revalidate, s-max-age=900000"
	// );
	const { url } = req.body;
	const html = await axios(url);

	const $ = cheerio.load(html.data);
	const goali = await $(".text-stat.text-stat-title").text().split(" ");
	const raisedi = await $(".m-progress-meter-heading").text().split(" ");
	// console.log("goal");
	// console.log(goali);
	// console.log("raised");
	// console.log(raisedi);
	let symbolToAbbrev = {
		"€": "EUR",
		"£": "GBP",
		"₺": "TRY",
		$: "USD",
	};
	if (["USD", "CAD", "AUD", "GBP"].includes(goali[0])) {
		res.json({
			goal: goali[3],
			raised: raisedi[0],
			currency: symbolToAbbrev[goali[3][0]],
			formatted: {
				goal: parseFloat(
					goali[3]
						.replace("$", "")
						.replace("€", "")
						.replace("£", "")
						.replace(",", "")
						.replace(",", "")
				),
				raised: parseFloat(
					raisedi[0]
						.replace("$", "")
						.replace("€", "")
						.replace("£", "")
						.replace(",", "")
						.replace(",", "")
				),
			},
		});
	} else {
		res.json({
			goal: goali[3],
			raised: raisedi[0],
			currency: symbolToAbbrev[goali[3][0]],
			format: {
				goal: parseInt(
					goali[3]
						.replace("$", "")
						.replace("€", "")
						.replace("£", "")
						.replace(",", "")
						.replace(",", "")
				),
				raised: parseInt(
					raisedi[0]
						.replace("$", "")
						.replace("€", "")
						.replace("£", "")
						.replace(",", "")
						.replace(",", "")
				),
			},
		});
	}
}
