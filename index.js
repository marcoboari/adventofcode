// faccio il check di avere il file di partenza
if (process.argv.length < 3) {
	console.log("Usage: node " + process.argv[1] + " FILENAME");
	process.exit(1);
}
// Read the file and print its contents.
const fs = require("fs");
const cliProgress = require("cli-progress");
const readline = require("readline");
const filename = process.argv[2];

const readInterface = readline.createInterface({
	input: fs.createReadStream(filename),
	console: false,
});

// create new progress bar
const b1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// definizione parametri per fare i calcoli
let parameters = {
	incresed: 0,
	decresed: 0,
	total: 0,
	prev: null,
};

// number of row
let row = 0;

readInterface
	.on("line", function(line) {
		line = parseInt(line);
		if (parameters.prev) {
			if (line > parameters.prev) {
				parameters.incresed++;
				console.log(line + " | increase | " + parameters.incresed);
			} else {
				parameters.decresed++;
				console.log(line + " | decrese | " + parameters.incresed);
			}
		} else {
			console.log(line + " | NA | " + parameters.incresed);
		}
		parameters.prev = line;
	})
	.on("close", () => {
		parameters.total = parameters.incresed + parameters.decresed;
		console.log(parameters);
	});
