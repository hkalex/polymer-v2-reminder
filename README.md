# Polymer 2.0 Reminder App

This is a very simple reminder app built with Polymer 2.0.

It is not easy to make Polymer 2.0 working with existing libraries. Some libraries have NOT had official release for Polymer 2.0, so `bower` is not able to resolve the dependencies. Thus I have to commit the entire `bower_components`.

## Run on Local

Assume you have installed Polymer 2.0 CLI.

In order to setup your local repository, you have to run the following command first.

```shell
npm run runfirst
```

After it is done, the following command is to run the Polymer 2.0 application.

```shell
npm run start
```

## Run on Docker

If you have installed docker, the following command is to run the Polymer application on Docker.

```shell
npm run start-docker
```

After the docker container is up, the application is located at `http://localhost:8080`

I am using Docker image `nginx:alpine`, because it is very light-weight and fast. The total size of `nginx:alpine` is only **15.5MB** .

*If something doesn't work, please use `nginx:latest` image. The script is located at `scripts/docker_run.sh`*
