var keys    = require("./keys.json"),
    input   = process.argv[2],
    ignore  = process.argv[3] || false,
    counter = 0;

if (!input) {
    console.log("\033[31mFile not specified\n\033[0m");
    process.exit();
}

var trashLayers = [1, 2, 3, 5, 7, 8, 9, 10, 11, 15, 16, 20, 21, 22, 23, 26, 33, 34, 35, 36, 45, 46, 47, 48, 57, 58, 59, 60, 69, 70, 71, 72, 81, 82, 83, 84, 94, 95, 96, 97, 106, 107, 108, 109];

dreamify();

function inArray(needle, haystack, strict) {
    var found = false;

    strict = !!strict;

    for (var i = 0; i < haystack.length; i++) {
        if (
            (strict && haystack[i] === needle) ||
            (!strict && haystack[i] == needle)
        ) {
            found = true;
            break;
        }
    }

    return found;
}

function CmdExec(cmd, args, cbEnd) {
    var spawn = require("child_process").spawn,
        child = spawn(cmd, args);

    child.on("error", function (err) {
        console.log("\033[31m" + err.toString() + ", command:", cmd, args.join(" "), "\n\033[0m");
        process.exit();
    });

    child.stderr.on("data", function (data) {
        console.log(data.toString());
    });

    child.stdout.on("data", function (data) {
        console.log(data.toString());
    });

    child.stdout.on("end", function () {
        console.log("\033[35m", cmd, args.join(" "), "finished\n\033[0m");
        cbEnd();
    });

}

function dreamify() {
    if (!keys.length) return;

    counter++;

    var key = keys.shift();

    if (ignore && inArray(counter, trashLayers)) {
        console.log("\033[36m" + counter + " ignored\n\033[0m");
        dreamify();
        return;
    }

    var name = input + "_" + counter + "_" + key.replace("/", "-") + ".png";
    new CmdExec("ipython", ["dreamify.py", input, name, key], dreamify);
}