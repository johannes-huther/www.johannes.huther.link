# www.johannes.huther.link
My personal website.

## Building
### Building with `docker-compose` (recommended; if you need hot-reloads see ["Building manually"](#building-manually))
Prerequisites:
- Git
- Docker
- Docker Compose

Run the following commands:
```sh
git clone https://github.com/johannes-huther/www.johannes.huther.link
cd www.johannes.huther.link
docker-compose up
```

To make sure that the container is recreated and the image rebuilt, use the command with additional options:
```sh
docker-compose up --force-recreate --build
```

### Building manually
Prerequisites:
- Git
- Node.js and npm
- TypeScript installed globally (`npm install -g typescript`)

Run the following commands:
```sh
git clone https://github.com/johannes-huther/www.johannes.huther.link
cd www.johannes.huther.link
npm install
cd server && npm install
```

**To build for production**, run the following commands:
```sh
npm run build
npm run start
```
Open `http://[your ip]:3080` in your browser.


**To enable hot reloads**, configure a file watcher for the TypeScript files in the `server/src` directory to run `tsc` in the `server` directory and run the following command:
```sh
npm run serve
```
Open `http://[your ip]:8080` in your browser.

## Deployment
The website is deployed to [`www.johannes.huther.link`](https://www.johannes.huther.link) as soon as a new release is published.

A staging build is deployed to [`www.staging.johannes.huther.link`](https://www.staging.johannes.huther.link) with every push to the `master` branch.

## Licensing
This project is licensed under the MIT License. See also [`LICENSE`](LICENSE).
