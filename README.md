# Movie Mode

A movie and TV series recommendation generator using the IMDB dataset. Generates random recommendations based on certain input criteria and displays the results using gifs from [Giphy](https://giphy.com/).


## How to Install

First you need to execute "movie-db/prepare-db.py". This script downloads, decompresses, and formats all necessary datasets (removes the headers). Make sure you have [Python 3.x](http://python.org/) installed.

```sh
$ cd movie-db
$ python3 prepare-db.py
```

When building the database image all of these files, including a script for creating all tables will be copied into the Docker entrypoint folder. This is really not an ideal solution. The data load should be moved into the python script as well, and be built as a separate image that can be scheduled for data updates at runtime. But hey, here we are.

You also need to add your own [Giphy](https://giphy.com/) API key to docker-compose.yml.


## How to run

Make sure that [Docker](https://www.docker.com/) is installed on your system. The initial startup will take a while, since all data will be loaded into the database. 

#### If you are on linux/MacOS
```sh
$ docker-compose up
```

#### If you are on Windows
Mounting volumes with Docker in Windows is painful. You need to edit the docker-compose.yml file and change the local mount path to an absolute path (i.e. "C:\\somethingsomething\\movie-mode\\node-app"). Make sure that the directory is shared in your Docker system preferences. If you still get an error you can just remove the whole volume part from the compose file. It will still run, but your changes to the source code in the node-app folder will not be reflected in the running container. 

```sh
$ docker-compose up
```

#### Finally
By default your app will run on [localhost:8080](http://localhost:8080/).

![Screenshot 1](/screenshot1.PNG?raw=true)
![Screenshot 2](/screenshot2.PNG?raw=true)