const core = require('@actions/core')
const github = require('@actions/github')

let labels = core
  .getInput('labels')
  .split(',')
  .map(x => x.trim())

async function run() {
  try {
    const context = github.context
    const token = core.getInput('token', { required: true })
    const owner = context.payload.repository.owner.login
    const repo = context.payload.repository.name
    const issue_number = context.payload.issue.number

    const octokit = new github.getOctokit(token)

    labels = labels.filter(value => ![''].includes(value))

    await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number,
      labels
    })
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
