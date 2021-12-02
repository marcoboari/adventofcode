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
		forward: 0,
		depth: 0,
		result: 0,
	},
	b: {
		forward: 0,
		depth: 0,
		aim: 0,
		result: 0,
	},
};

// PART A
fs.readFile(filename, "utf8", function(err, data) {
	if (err) throw err;
	// console.log("OK: " + filename);
	const input = data.split("\n");
	// console.log("ARRAY: ", input);

	input.forEach((line) => {
		const data = line.split(" ");
		// console.log("DATA ", data);
		switch (data[0]) {
			case "forward":
				parameters.a.forward += parseInt(data[1]);
				break;
			case "down":
				parameters.a.depth += parseInt(data[1]);
				break;
			case "up":
				parameters.a.depth -= parseInt(data[1]);
				break;
		}
	});

	parameters.a.result = parameters.a.forward * parameters.a.depth;

	console.log(parameters.a);
});

// PART B
fs.readFile(filename, "utf8", function(err, data) {
	if (err) throw err;
	console.log("OK: " + filename);
	const input = data.split("\n");
	console.log("ARRAY: ", input);

	input.forEach((line) => {
		const data = line.split(" ");
		console.log("DATA ", data);
		switch (data[0]) {
			case "forward":
				parameters.b.forward += parseInt(data[1]);
				parameters.b.depth += parameters.b.aim * parseInt(data[1]);
				break;
			case "down":
				parameters.b.aim += parseInt(data[1]);
				break;
			case "up":
				parameters.b.aim -= parseInt(data[1]);
				break;
		}
	});

	parameters.b.result = parameters.b.forward * parameters.b.depth;

	console.log(parameters.b);
});
