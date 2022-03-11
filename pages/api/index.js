import express from "express";
import apicache from "apicache";
import { getCampaignInfo } from "./gofundme.js";

const app = express();
app.set("json spaces", 3);
app.set("trust proxy", 1);
let cache = apicache.middleware;

app.get("/", cache("60 minutes"), async (req, res) => {
	if (!!!req.query.url) {
		res.send("<h1>You forgot the URL dummy</h1>");
		return;
	}
	const { goal, raised, formatted } = await getCampaignInfo(
		encodeURIComponent(req.query.url.replace('"', ""))
	);
	res.status(200).json({ goal, raised, formatted }); //lolss
});

app.listen(3000, () =>
	console.log("Example app listening on port http://localhost:3000 !")
);
