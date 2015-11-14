const shell = require('child_process').spawn;

const command = {
	shell: "powershell.exe",
	shell_arg: "-NoProfile -ExecutionPolicy Bypass -Command",
	ps: "get-wmiobject win32_process",
	select: "select",
	convert: "convertto-json -compress"
}

/**
 * Build shell command
 * @param  {Array} fields
 * @return {Object}        child_process instance
 */
function build_shell(fields) {
	var fields = fields || 'ProcessId,Name,Path,ParentProcessId,Priority';

	var args = command.shell_arg.split(' ');
	args.push(`${command.ps} | ${command.select} ${fields} | ${command.convert}`);

	return shell(command.shell, args);
}

/**
 * Main function to receive the list of the launched processes
 * @param  {Array} fields fields to select
 * @return {Promise}	    resolved to array of processes
 */
exports.snapshot = function snapshot(fields) {
	var ps = build_shell(fields);
	var data = [];

	ps.stdout.on('data', (chunk) => {
		data.push(chunk);
	})

	return new Promise((resolve) => {
		ps.on('close', () => {
			var json = JSON.parse( Buffer.concat(data).toString() );
			data.length = 0;

			resolve(json);
		})
	})
}
