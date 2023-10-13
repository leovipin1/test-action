const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    const context = github.context
    const token = core.getInput('token', { required: true })
    const owner = context.payload.repository.owner.login
    const repo = context.payload.repository.name
    const issue_number = context.payload.issue.number

    const octokit = new github.getOctokit(token)

    const { data: labels } = await octokit.rest.issues.listLabelsOnIssue({
      owner,
      repo,
      issue_number
    })

    for (const key in labels) {
      console.log(key)
      console.log(labels[key])
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
