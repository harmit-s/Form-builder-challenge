const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const formsFilePath = path.join(__dirname, 'forms.json');


const readFormsFromFile = () => {
    if (!fs.existsSync(formsFilePath)) {
        fs.writeFileSync(formsFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(formsFilePath);
    return JSON.parse(data);
};

const writeFormsToFile = (forms) => {
    fs.writeFileSync(formsFilePath, JSON.stringify(forms, null, 2));
};

// Save Form Endpoint
app.post('/api/forms/save', (req, res) => {
    const { form_name, form_data } = req.body;

    const forms = readFormsFromFile();
    const newForm = {
        id: forms.length + 1,
        form_name,
        form_data,
        created_at: new Date(),
        updated_at: new Date(),
    };

    forms.push(newForm);
    writeFormsToFile(forms);
    res.status(201).json(newForm);
});

// Fetch Form by ID
app.get('/api/forms/:id', (req, res) => {
    const { id } = req.params;
    const forms = readFormsFromFile();
    const form = forms.find((f) => f.id === parseInt(id));

    if (!form) {
        return res.status(404).json({ message: "Form not found" });
    }

    res.json(form);
});

// Update Form
app.put('/api/forms/update/:id', (req, res) => {
    const { id } = req.params;
    const { form_name, form_data } = req.body;

    const forms = readFormsFromFile();
    const formIndex = forms.findIndex((f) => f.id === parseInt(id));

    if (formIndex === -1) {
        return res.status(404).json({ message: "Form not found" });
    }

    forms[formIndex].form_name = form_name;
    forms[formIndex].form_data = form_data;
    forms[formIndex].updated_at = new Date();

    writeFormsToFile(forms);
    res.json(forms[formIndex]);
});

// List Forms
app.get('/api/forms/list', (req, res) => {
    try {
        const forms = readFormsFromFile();
        res.status(200).json(forms); 
    } catch (error) {
        console.error("Error reading forms:", error);
        res.status(500).json({ message: "Error retrieving forms" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});