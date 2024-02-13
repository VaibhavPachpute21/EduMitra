const User = require('./models/userModel');
const Project =require('./models/projectModel')
async function migrateProjects() {
    try {
        const projects = await Project.find({});
        for (const pro of projects) {
            if (1 == 1) {
                pro.demoLink=null;
                pro.codeLink=null
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

