const Sequelize = require('Sequelize');

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/feather-blog');

// Configure models
const PostStatus = sequelize.define('post_status', {
    description: {
        type: Sequelize.STRING
    }
});

const Post = sequelize.define('posts', {
    title: {
        type: Sequelize.STRING
    },
    summary: {
        type: Sequelize.TEXT
    },
    content: {
        type: Sequelize.TEXT
    },
    publishedOn: {
        type: Sequelize.DATE
    }
});

PostStatus.hasOne(Post);

PostStatus.sync().then(function () {
    Post.sync().then(async function () {
        await createState(1, 'Draft');
        await createState(2, 'Published');
    });
});

async function createState(id, description) {
    let state = await PostStatus.find({where: { id: id }});

    if (!state) {
        PostStatus.create({
            id: id,
            description: description
        });
    }
}

module.exports = {
    PostStatus: PostStatus,
    Post: Post,
    connection: sequelize
};