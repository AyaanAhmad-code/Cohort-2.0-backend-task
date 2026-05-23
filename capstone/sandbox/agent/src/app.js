import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const WORKING_DIR = '/workspace';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Sandbox Agent is running',
        status: 'success'
    });
})

app.get("/list-files", async (req, res)=> {

    const listFiles = async (dir, basedir) => {
        const entries = await fs.promises.readdir(dir, { withFileTypes: true });
        const files = [];

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            const relativePath = path.relative(basedir, fullPath);

            if (entry.isDirectory() && ['.git', 'node_modules', 'dist'].includes(entry.name)) {
                continue; 
            }
            
            if (entry.isDirectory()) {
                files.push(...await listFiles(fullPath, basedir));
            } else {
                files.push(relativePath);
            }
        }

        return files;

    }

    try {
        const files = await listFiles(WORKING_DIR, WORKING_DIR);
        res.status(200).json({
            files,
            message: 'Files listed successfully',
            status: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: `Error listing files: ${error.message}`,
            status: 'error'
        });
    }

});

app.get("/read-files", async (req, res) => {
    const files = req.query.files;

    if(!files) {
        return res.status(400).json({
            message: 'No files specified',
            status: 'error'
        });
    }

    const fileList = files.split(',');

    const results = await Promise.all(fileList.map(async (file) => {
        const filePath = path.join(WORKING_DIR, file);

        try {
            const content = await fs.promises.readFile(filePath, 'utf-8');
            return {
                [filePath.replace(WORKING_DIR, '')]: content
            }
        } catch (error) {
            return {
                [filePath.replace(WORKING_DIR, '')]: `Error reading file: ${error.message}`
            }
        }
    }));

    res.status(200).json({
        message: 'File contents',
        files: results,
    });

});

app.patch('/update-files', async (req, res) => {
    const updates = req.body.updates;

    if(!updates || !Array.isArray(updates)) {
        return res.status(400).json({
            message: 'Invalid request body. Expected an array of updates.',
            status: 'error'
        });
    }

    const result = await Promise.all(updates.map(async (update) => {
        const { file, content } = update;
        const filePath = path.join(WORKING_DIR, file);

        try {
            await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
            await fs.promises.writeFile(filePath, content, 'utf-8');
            return {
                [filePath]: 'File updated successfully'
            }
        } catch (error) {
            return {
                [filePath]: `Error updating file: ${error.message}`
            }
        }
    }));

    res.status(200).json({
        results: result,
        message: 'File updates processed',
        status: 'success'
    });
});

app.post('/create-file', async (req, res) => {
    const files = req.body.files;

    if(!files || !Array.isArray(files)) {
        return res.status(400).json({
            message: 'Invalid request body. Expected an array of files.',
            status: 'error'
        });
    }

    const result = await Promise.all(files.map(async (fileobj) => {
        const { file, content } = fileobj;
        const filePath = path.join(WORKING_DIR, file);

        try {
            await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
            await fs.promises.writeFile(filePath, content, 'utf-8');
            return {
                [filePath]: 'File created successfully'
            }
        } catch (error) {
            return {
                [filePath]: `Error creating file: ${error.message}`
            }
        }
    }));

    res.status(200).json({
        results: result,
        message: 'Files created successfully',
        status: 'success'
    });
});

export default app;