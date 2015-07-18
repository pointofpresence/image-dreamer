var keys    = require("./keys.json"),
    input   = process.argv[2],
    counter = 0;

if (!input) {
    console.log("\033[31mFile not specified\n\033[0m");
    process.exit();

}

dreamify();

function CmdExec(cmd, args, cbEnd) {
    var spawn, child;

    spawn = require("child_process").spawn;
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

    var key = keys.shift(),
        name = input + "_" + counter + "_" + key.replace("/", "-") + ".png";

    new CmdExec("ipython", ["dreamify.py", input, name, key], dreamify);
}