const User = require('./models/userModel');
async function migrateProjects() {
    try {
        const users = await User.find({});
        for (const user of users) {
            if (1 == 1) {
                user.city=null;
                user.linkedin=null;
                user.github=null;
                user.skills=null;
                user.bio= null;
                await user.save();
                console.log(user)
            }
        }
        console.log('Migration completed.');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

module.exports = migrateProjects()

