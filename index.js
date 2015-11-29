'use strict';
const shell = require('child_process').spawn;

const command = {
	shell: "powershell.exe",
	shell_arg: "-NoProfile -ExecutionPolicy Bypass -Command",
	ps: "get-wmiobject win32_process",
	select: "select",
	convert: "convertto-json -compress",
	alias: (from, to) => `@{ Name = '${to}'; Expression = { $_.${ from } }}`
}

const isAlias = field => field && (typeof field === 'object') && Object.keys(field).length >= 1;

function toAlias(map) {
	var fields = [];
	
	for (let from of Object.keys(map)) {
		fields.push(command.alias(from, map[from]));
	}
	
	return fields;
}

function normalizeFields(fields) {
	var normalFields = [];
	
	for (let field of fields) {
		if (isAlias(field)) {
			var keys = toAlias(field);
			normalFields = normalFields.concat(keys);
		} else {
			normalFields.push(field);
		}
	}
	
	return normalFields;
}

/**
 * Build shell command
 * @param  {Array} fields
 * @return {Object}        child_process instance
 */
function build_shell(fields) {
	var $fields = Array.isArray(fields) ? normalizeFields(fields) : ['ProcessId','Name','Path','ParentProcessId','Priority'];
	
	var args = command.shell_arg.split(' ');
	args.push(`${command.ps} | ${command.select} ${ $fields.join(',') } | ${command.convert}`);

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
