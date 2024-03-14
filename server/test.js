const User = require('./models/userModel');
const Project =require('./models/projectModel')
async function migrateProjects() {
    try {
        const projects = await User.find({});
        for (const pro of projects) {
            if (1 == 1) {
                pro.uViews=1;
                await pro.save();
                console.log(pro)
            }
        }
        console.log('Migration completed.');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

module.exports = migrateProjects()

