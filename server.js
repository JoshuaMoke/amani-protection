const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const PASSWORD = 'amani'; // simple hardcoded password for admin

app.use(express.json());
app.use(express.static(__dirname));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + ext);
    }
});
const upload = multer({ storage });

// Helper to read/write DB
const dbPath = path.join(__dirname, 'portfolio.json');
function getPhotos() {
    if (!fs.existsSync(dbPath)) return [];
    try {
        return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } catch (e) {
        return [];
    }
}
function savePhotos(photos) {
    fs.writeFileSync(dbPath, JSON.stringify(photos, null, 2));
}

// Auth Middleware
function requireAuth(req, res, next) {
    const pass = req.headers['x-admin-password'];
    if (pass === PASSWORD) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

// API Routes
app.get('/api/photos', (req, res) => {
    res.json(getPhotos());
});

app.post('/api/photos', requireAuth, upload.single('photo'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    const photos = getPhotos();
    const newPhoto = {
        id: Date.now(),
        src: '/uploads/' + req.file.filename,
        caption: req.body.caption || '',
        category: req.body.category || 'Event Security'
    };
    
    photos.push(newPhoto);
    savePhotos(photos);
    res.json(newPhoto);
});

app.delete('/api/photos/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    let photos = getPhotos();
    const photo = photos.find(p => p.id === id);
    
    if (photo) {
        // Remove file
        const filePath = path.join(__dirname, photo.src);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        // Remove from db
        photos = photos.filter(p => p.id !== id);
        savePhotos(photos);
    }
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
