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
		incresed: 0,
		decresed: 0,
		total: 0,
		prev: null,
	},
	b: {
		incresed: 0,
		decresed: 0,
		nochange: 0,
		total: 0,
		prev: null,
	},
};

// number of row
let row = 0;

// PART A
readInterface
	.on("line", function(line) {
		line = parseInt(line);
		if (parameters.a.prev) {
			if (line > parameters.a.prev) {
				parameters.a.incresed++;
				// console.log(line + " | increase | " + parameters.a.incresed);
			} else {
				parameters.a.decresed++;
				// console.log(line + " | decrese | " + parameters.a.incresed);
			}
		} else {
			// console.log(line + " | NA | " + parameters.a.incresed);
		}
		parameters.a.prev = line;
	})
	.on("close", () => {
		parameters.a.total = parameters.a.incresed + parameters.a.decresed;
		console.log(parameters.a);
	});

// PART B

fs.readFile(filename, "utf8", function(err, data) {
	if (err) throw err;
	// console.log("OK: " + filename);
	const input = data.split("\n");
	// console.log("ARRAY: ", input);

	const newVal = [];
	input.forEach((val, index) => {
		if (input[index + 2] != null)
			newVal[index] =
				parseInt(val) +
				parseInt(input[index + 1]) +
				parseInt(input[index + 2]);
	});

	// console.log("NEW ", newVal);

	newVal.forEach((val, index) => {
		if (parameters.b.prev && val > parameters.b.prev)
			parameters.b.incresed++;
		parameters.b.prev = val;
	});

	console.log(parameters.b);
});

// fetch(filename).then(function(response) {
// 	response.text().then((input) => {
// 		input.split("\n").forEach((n) => {
// 			n = parseInt(n);
// 			if (prev && n > prev) count++;
// 			//console.log(`${n} > ${prev} ? ${n > prev}, count: ${count}`);
// 			prev = n;
// 		});
// 		console.log(count);
// 	});
// });
