// faccio il check di avere il file di partenza
if (process.argv.length < 3) {
	console.log("Usage: node " + process.argv[1] + " FILENAME");
	process.exit(1);
}
// Read the file and print its contents.
import fs from "fs";
import cliProgress from "cli-progress";
import readline from "readline";
const filename = process.argv[2];

const readInterface = readline.createInterface({
	input: fs.createReadStream(filename),
	console: false,
});

// create new progress bar
const b1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// definizione parametri per fare i calcoli
let parameters = {
	a: {
		gamma: 0,
		epsilon: 0,
		result: 0,
	},
	b: {},
};

// PART A
fs.readFile(filename, "utf8", function(err, data) {
	if (err) throw err;
	// console.log("OK: " + filename);
	const input = data.split("\n");
	console.log("ARRAY: ", input);

	const item0 = [];
	const item1 = [];
	const item2 = [];
	const item3 = [];
	const item4 = [];

	input.forEach((line) => {
		const lineSplit = line.split("");

		lineSplit.map((el, index) => {
			if (index === 0) item0.push(el);
			if (index === 1) item1.push(el);
			if (index === 2) item2.push(el);
			if (index === 3) item3.push(el);
			if (index === 4) item4.push(el);
			// console.log(el, index);
		});
	});

	const gammaBinary =
		(item0.filter((x) => x == 1).length > item0.filter((x) => x == 0).length
			? 1
			: 0) +
		"" +
		(item1.filter((x) => x == 1).length > item1.filter((x) => x == 0).length
			? 1
			: 0) +
		"" +
		(item2.filter((x) => x == 1).length > item2.filter((x) => x == 0).length
			? 1
			: 0) +
		"" +
		(item3.filter((x) => x == 1).length > item3.filter((x) => x == 0).length
			? 1
			: 0) +
		"" +
		(item4.filter((x) => x == 1).length > item4.filter((x) => x == 0).length
			? 1
			: 0);
	const epsilonBinary =
		(item0.filter((x) => x == 1).length > item0.filter((x) => x == 0).length
			? 0
			: 1) +
		"" +
		(item1.filter((x) => x == 1).length > item1.filter((x) => x == 0).length
			? 0
			: 1) +
		"" +
		(item2.filter((x) => x == 1).length > item2.filter((x) => x == 0).length
			? 0
			: 1) +
		"" +
		(item3.filter((x) => x == 1).length > item3.filter((x) => x == 0).length
			? 0
			: 1) +
		"" +
		(item4.filter((x) => x == 1).length > item4.filter((x) => x == 0).length
			? 0
			: 1);

	console.log("GAMMA", gammaBinary);
	parameters.a.gamma = parseInt(gammaBinary, 2);
	console.log("EPSILON", epsilonBinary);
	parameters.a.epsilon = parseInt(epsilonBinary, 2);
	parameters.a.result = parameters.a.gamma * parameters.a.epsilon;

	console.log("END", parameters.a);
});

// PART B
