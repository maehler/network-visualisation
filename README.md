# Gene network visualisation

A small web application for visualising gene networks.

## Docker

In order to serve the application through Docker, first build the image.

```sh
docker build -t <image name> .
```

Then spin up the container mounting the database with the data that you want to visualise.

```sh
docker run \
    --detach \
    --publish <host port>:3000 \
    --mount type=bind,source=<database>,target=/home/node/app/database/ignv.db \
    <image name>
```
