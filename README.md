# projectHt2019Jacob

A proof of concept plugin for gene coexpression network with the ability to add personalized modules.

## Docker

In order to serve the application through Docker, first build the image.

```sh
docker build -t <image name> .
```

Then spin up the container mounting the database with the data that you want to visualise.

```sh
docker run \
    --detach \
    --publish 80:3000 \
    --mount type=bind,source=<database>,target=/home/node/app/databse/ignv.db \
    <image name>
```
