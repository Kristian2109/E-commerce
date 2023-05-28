const ROLES = {
    ADMINISTRATOR: "admininstartor",
    MODERATOR: "moderator",
    USER: "user",

}

function hasUserAccessToProfile(currentUser, userIdToVisit) {
    return currentUser.id === userIdToVisit ||
           currentUser.role === ROLES.ADMINISTRATOR ||
           currentUser.role === ROLES.MODERATOR;
}

function authorizeUser(req, res, next) {
    if (!hasUserAccessToProfile(req.user, req.params.userId)) {
        return res.sendStatus(403);
    }

    next();
}

module.exports = {
    ROLES, authorizeUser
}