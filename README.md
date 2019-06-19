# leaflet-bundles
Collection of Leaflet bundles to start building web maps with a proper npm module loader (browserify, rollup or webpack)

1. **Start cloning a branch:**
- [leaflet-browserify](https://github.com/Raruto/leaflet-bundles/tree/leaflet-browserify)
- [leaflet-rollup](https://github.com/Raruto/leaflet-bundles/tree/leaflet-rollup)
- [leaflet-webpack](https://github.com/Raruto/leaflet-bundles/tree/leaflet-webpack)

2. **Develop your Leaflet Map within the respective `/src` folder**

3. **Pack your application running the `npm run build` command**

4. **See the generated results opening the /dist/index.html file**

---

**List of useful npm commands**

- **`npm update`** - _download/update npm package dependecies_
- **`npm i <package_name> [--s]/[--D]`** - _add package/dependency (alias for: `npm install <package_name> [--save]/[--save-dev]`)_
- **`npm r <package_name> [--s]/[--D]`** - _remove package/dependency (alias for: `npm remove <package_name> [--save]/[--save-dev]`)_
- **`npm run build`** - _run build script (from package.json)_
- **`npm run watch`** - _run watch script (from package.json)_
- **`npm start`** - _run start command (from package.json)_
