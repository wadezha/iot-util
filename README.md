# iot-util

//Use this test.js need node version is higher than 8.9.3 .


```

const config = {
  loggerConfig: {
    categories: {
      default: {
        appenders: ['console'],
        level: 'info',
      },
    },
    appenders: {
      console: {
        type: 'console',
      },
      redis: {
        type: '@log4js-node/redis',
        host: '127.0.0.1',
        port: 6379,
        pass: '',
        channel: 'iot_log',
        category: 'redis',
        layout: {
          type: 'pattern',
          pattern: '%d{yyyy-MM-dd hh:mm:ss:SSS}#%p#%z#%m',
        },
      },
    },
  },
  mysqlConfig: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mysql',
    port: 3306,
  },
  redisConfig: {
    host: '127.0.0.1',
    port: 6379,
    pass: '',
  },
};

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
};

```

```
const util = require('../index');
const idGenerator = new util.IdGenerator(1);

function normalFuncTest() {

  console.log('geography.distance ', util.geography.distance(113.82496, 22.73944, 113.82596, 22.73944));
  console.log('geography.convertBaiduToGps ', util.geography.convertBaiduToGps(113.934945,22.531195));

  console.log('PyramidBlock.decodeBlockID ', util.PyramidBlock.decodeBlockID(7009386646791));

  const buf = new Buffer(3);
  buf.writeUInt24BE(65526, 0);
  console.log('Buffer ', buf.readUInt24BE(0));

  console.log('idGenerator ', idGenerator.nextId());

  const logger = new util.Logger(config.loggerConfig, 'iot-util');
  logger.info('username', 'MYSQL', 'getLoggerList', '获取日志分页列表错误: ', '报错了');
}

```

```
const mysqlClient = new util.MysqlClient(config.mysqlConfig);
const redisClient = new util.RedisClient(config.redisConfig);
const messageCenter = new util.MessageCenter(config.redisConfig);
const httpClient = new util.HttpClient(config.httpConfig);

async function getPropertymapSqlList(queryParams) {

  const sql = `select help_topic_id,name,help_category_id
    from help_topic
    limit 3`;

  return await mysqlClient.all(sql, queryParams);
}


async function asyncFuncTest() {
  try{
    await sleep(2000);

    console.log('mysql query start');
    const result1 = await getPropertymapSqlList({ user_id: '123213' });
    console.log('mysql.all ', result1);
    // console.log('to query in 30 seconds')
    // await sleep(600000)
    const result2 = await getPropertymapSqlList({ user_id: '123213' });
    console.log('mysql.all ', result2);
    console.log('mysql query finish');


    await redisClient.set('redis_test', 'immmmxxxx');
    await redisClient.setex('redis_test_ex', 10, 'immmmxxxx');
    console.log('redisClient.get.redis_test ', await redisClient.get('redis_test'));
    console.log('redisClient.get.redis_test_ex ', await redisClient.get('redis_test_ex'));
    await sleep(20000);
    console.log('redisClient.get.redis_test ', await redisClient.get('redis_test'));
    console.log('redisClient.get.redis_test_ex ', await redisClient.get('redis_test_ex'));
    
    await redisClient.hset('redis_hash', 'kit', 10);
    await redisClient.hset('redis_hash', 'kit1', '3456f');
    console.log('redisClient.redis_hget ', await redisClient.hget('redis_hash', 'kit'));
    console.log('redisClient.redis_hgetall ', await redisClient.hgetall('redis_hash'));
    console.log('redisClient.redis_hexists ', await redisClient.hexists('redis_hash', 'kit'));
    await redisClient.hdel('redis_hash', 'kit');
    console.log('redisClient.redis_hget ', await redisClient.hget('redis_hash', 'kit'));


    await messageCenter.push('q_test', '如何啊，你收一下');
    console.log('messageCenter.queue ', await messageCenter.pop('q_test'));

    messageCenter.addMessageHandler('mes1', { handle: (topic, message) => console.log('messageCenter.publish.mes1 ', message) });
    messageCenter.addMessageHandler('mes2', { handle: (topic, message) => console.log('messageCenter.publish.mes2 ', message) });
    await messageCenter.publish('mes1', '快来啊');
    await messageCenter.publish('mes2', '来了老弟');
    await messageCenter.publish('mes1', '等你吃饭');

    console.log('http invoke start');
    const url = 'http://apis.map.qq.com/ws/geocoder/v1/?address=%E6%B7%B1%E5%9C%B3%E5%B8%82%E5%AE%9D%E5%AE%89%E5%8C%BA%E8%A5%BF%E4%B9%A1%E5%9C%B0%E9%93%81%E7%AB%99&key=';
    const result = await httpClient.get(url);
    console.log('httpClient.get ', result);

  }catch (err){
    const error = err ? (err.message || err) : undefined;
    console.error(error);
  }
}

```

```
normalFuncTest();
asyncFuncTest();
```
