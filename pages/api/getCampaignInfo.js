// import express from "express";
// import apicache from "apicache";
import { getCampaignInfo } from "../../external-functions/gofundme.js";

// let cache = apicache.middleware;

export default async function handler(req, res) {
	res.setHeader("Cache-Control", "s-maxage=86400");

	if (!!!req.query.url) {
		res.status(418).send("<h1>You forgot the URL dummy</h1>");
		return;
	}
	const { goal, raised, formatted } = await getCampaignInfo(
		encodeURIComponent(req.query.url.replace('"', ""))
	);
	res.status(200).json({ goal, raised, formatted });
}
