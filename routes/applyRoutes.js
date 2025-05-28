const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const express = require('express');
const router = express.Router();


// POST route for form submission
router.post('/apply', upload.single('cv'), (req, res) => {
    try {
        const { fullName, email, phone, country, degree, institution, major, researchInterests, motivation } = req.body;
        const cvPath = req.file ? `/uploads/application/${req.file.filename}` : null;

        // Log or save the data (e.g., to MongoDB)
        console.log('Application Received:', {
            fullName, email, phone, country, degree, institution, major, researchInterests, motivation, cvPath
        });

        res.render('apply-form', {
            locale: req.getLocale(),
            __: res.__,
            success: 'Application submitted successfully!'
        });
    } catch (error) {
        console.error('Error processing application:', error);
        res.render('apply-form', {
            locale: req.getLocale(),
            __: res.__,
            error: 'Failed to submit application. Please try again.'
        });
    }
});

module.exports = router;