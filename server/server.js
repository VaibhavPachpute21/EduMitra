const express=require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')

const connectDB = require('./config/config');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users/', require('./routes/userRoutes'));
app.use('/api/project/', require('./routes/projectRoutes'));
//const Project = require('./models/projectModel');
// async function migrateProjects() {
//     try {
//         const projects = await Project.find({});
//         for (const project of projects) {
//             if (!project.comments) {
//                 project.comments = ["hii"];
//                 await project.save();
//                 console.log(project)
//             }
//         }
//         console.log('Migration completed.');
//     } catch (error) {
//         console.error('Migration failed:', error);
//     }
// }
// migrateProjects();


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})