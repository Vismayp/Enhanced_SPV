const fs = require('fs');
const path = require('path');

// Function to create directory if it doesn't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Creating directory: ${directory}`);
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Check and create the missing directory
const ajvCompilePath = path.join(__dirname, 'node_modules', 'ajv', 'dist', 'compile');
const ajvCodegenPath = path.join(ajvCompilePath, 'codegen');

ensureDirectoryExists(ajvCompilePath);
ensureDirectoryExists(ajvCodegenPath);

// Create an empty index.js if not exists
const indexFilePath = path.join(ajvCodegenPath, 'index.js');
if (!fs.existsSync(indexFilePath)) {
  console.log(`Creating file: ${indexFilePath}`);
  fs.writeFileSync(indexFilePath, 'module.exports = {};');
}

console.log('Fixed Ajv module structure'); 