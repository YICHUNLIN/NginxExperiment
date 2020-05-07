# NginxExperiment

## branch dev(基本) - 實驗一
### 實驗目的

用了很多，但是也對Nginx有點陌生，大多時候都只是基本的設定，因此實驗一下Nginx功能，特別想實驗的是node balance

### 使用方法

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

## branch websocket - 實驗二

### 實驗目的

觀察websocket 在 node balance下會如何運作

### 使用方法

1. 執行伺服器

```shell
$ ./run_server
```

2. 執行client

```shell
$ cd runner
$ node index_ws.js
```

3. 透過 docker-compose stop 一個一個關掉, 觀察結果


# 結論

1. 實驗一: nginx若無太多設定，則執行方式是輪詢node1 -> node2 -> node3 -> node1 ...，總體來說每個node的執行數量蠻平均的
2. 實驗二: 當連線斷掉時, 會自己切換到下一個連線, 透過redis建立共用的連線資料庫


# 參考資料

https://github.com/socketio/socket.io/tree/master/examples