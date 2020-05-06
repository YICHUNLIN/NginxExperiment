# NginxExperiment

## 目的

用了很多，但是也對Nginx有點陌生，大多時候都只是基本的設定，因此實驗一下Nginx功能，特別想實驗的是node balance




## 使用方法

1. 建置 server

```shell
$ cd server
$ ./build
```

2. 在 docker-compose.yml同目錄下

```shell
$ docker-compose up -d
```

3. 測試

```shell
cd runner
node index.js
```