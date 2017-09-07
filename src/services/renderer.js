function build(res, view, variables) {
    return res.render(view, buildVariables(variables));
}

function buildVariables(object) {
    if (!object) {
        object = {};
    }

    object.SITE_TITLE = 'MY SITE';
    return object;
}

module.exports = {
    build
};