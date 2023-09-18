// Desc: Use merge script with additional logic that ignores rule for specific branches.
// script: Require a minimum number of approvers
def notFromMaster = !(mergeRequest.pullRequest.fromRef.displayId == "master")
def notFromRelease = !mergeRequest.pullRequest.fromRef.displayId.matches("release/v.*")
def toDev = mergeRequest.pullRequest.toRef.displayId == "dev"

log.warn(
    "toDev=$toDev,"
    + " notFromMaster=$notFromMaster,"
    + " notFromRelease=$notFromRelease,"
    + " fromRef.displayId=$mergeRequest.pullRequest.fromRef.displayId"
)

return notFromMaster && notFromRelease && toDev