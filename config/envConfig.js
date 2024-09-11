const fs = require('fs');
const path = require('path');

const checkEnvKeys = () => {
    const envExamplePath = path.resolve(process.cwd(), '.env-example');
    const envExampleContent = fs.readFileSync(envExamplePath, 'utf-8');
    const exampleKeys = envExampleContent.split('\n').map(line => line.split('=')[0].trim()).filter(key => key);

    const envKeys = Object.keys(process.env);
    const missingKeys = exampleKeys.filter(key => !envKeys.includes(key));

    if (missingKeys.length > 0) {
        console.warn('Warning: The following environment variables are missing:', missingKeys);
    }
};
checkEnvKeys();