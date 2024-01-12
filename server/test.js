const Project = require('./models/projectModel');
async function migrateProjects() {
    try {
        const projects = await Project.find({});
        for (const project of projects) {
            if (1 == 1) {
                project.grades = {
                    CQ: null,
                    EC: null,
                    PC: null
                }
                await project.save();
                console.log(project)
            }
        }
        console.log('Migration completed.');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

module.exports = migrateProjects()
