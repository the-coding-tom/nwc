import fs from 'fs';
import path from 'path';

const ndJsonFilesDir = path.join(__dirname, '../data/ndjson');
const statusFilesDir = path.join(__dirname, '../data/status');

// Each call appends data to supplied .ndJSON file
export const saveToFile = (data, filename) => {
    var stream = fs.createWriteStream(path.join(ndJsonFilesDir, `${filename}`), { flags: 'a' });
    stream.write(data + "\n");
    stream.end();
};

// Saves and updates the current status of the .ndJSON file
export const saveStatus = (data, filename) => {
    if (!fs.existsSync(statusFilesDir)) fs.mkdirSync(statusFilesDir);

    fs.writeFile(path.join(statusFilesDir, `${filename}`), data, (err) => {
        if (err) throw err;

    });
};

// Creates .ndJson file
export const createNdJsonFile = (filename) => {
    if (!fs.existsSync(ndJsonFilesDir)) fs.mkdirSync(ndJsonFilesDir);

    fs.writeFileSync(path.join(ndJsonFilesDir, `${filename}`), '', (err) => {
        if (err) throw err;

    });
};

// Gets the status of the .ndJSON file passed: if the web crawler is done saving data to the .ndJSON file or still saving
export const fileDownloadComplete = (filename, callback) => {
    if (!fs.existsSync(path.join(statusFilesDir, `${filename}-.status`))) {
        callback(null);
        return;
    }

    fs.readFile(path.join(statusFilesDir, `${filename}-.status`), 'utf8', (err, data) => {
        if (err) throw err;

        callback(data);
    });
};
