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

	const items = [];

	input.forEach((line) => {
		const lineSplit = line.split("");

		lineSplit.map((el, index) => {
			if (!items[index]) items[index] = [];
			items[index].push(el);
		});
	});

	console.log(items);

	let gammaBinary = "";
	items.forEach((el, index) => {
		gammaBinary +=
			"" + el.filter((x) => x == 1).length >
			el.filter((x) => x == 0).length
				? 1
				: 0;
	});

	let epsilonBinary = "";
	items.forEach((el, index) => {
		epsilonBinary +=
			"" + el.filter((x) => x == 1).length >
			el.filter((x) => x == 0).length
				? 0
				: 1;
	});

	console.log("GAMMA", gammaBinary);
	parameters.a.gamma = parseInt(gammaBinary, 2);
	console.log("EPSILON", epsilonBinary);
	parameters.a.epsilon = parseInt(epsilonBinary, 2);
	parameters.a.result = parameters.a.gamma * parameters.a.epsilon;

	console.log("END", parameters.a);
});

// PART B
