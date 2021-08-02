const core = require("@actions/core")
const semver = require("semver")

async function run(){
	let version = core.getInput("version")
	if (version.startsWith("refs/")){
		version = version.substr(5)
	}
	if (version.startsWith("heads/")){
		version = version.substr(6)
	}
	if (version.startsWith("tags/")){
		version = version.substr(5)
	}
	if (version.startsWith("v")){
		version = version.substr(1)
	}

	if (!semver.valid(version)){
		core.setOutput("useMatrix", false)
		core.setOutput("major", version)
		core.setOutput("minor", "")
		core.setOutput("patch", "")
		return
	}

	version = semver.parse(version)
	if (version.prerelease.length !== 0){
		core.setOutput("useMatrix", false)
		core.setOutput("major", `v${version.format()}`)
		core.setOutput("minor", "")
		core.setOutput("patch", "")
		return
	}

	core.setOutput("useMatrix", true)
	core.setOutput("major", `v${version.major}`)
	core.setOutput("minor", `v${version.major}.${version.minor}`)
	core.setOutput("patch", `v${version.major}.${version.minor}.${version.patch}`)
}
run()
