const Eureka = require('eureka-js-client').Eureka;
const EurekaClient = require('eureka-js-client').EurekaClient;
const eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '127.0.0.1');
const eurekaPort = 8888;
const hostName = (process.env.HOSTNAME || 'localhost')
const ipAddr = '127.0.0.1';

exports.registerWithEureka = function(appName, PORT) {
    const client = new Eureka({
    instance: {
        instanceId: `${hostName}:${appName}:${PORT}`,
        app: appName,
        hostName: hostName,
        ipAddr: ipAddr,
        port: {
            '$': PORT,
            '@enabled': 'true',
        },
        vipAddress: appName,
        homePageUrl: `http://${hostName}:${PORT}/`,
        statusPageUrl: `http://${hostName}:${PORT}/`,
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    //retry 10 time for 3 minute 20 seconds.
    eureka: {
      host: eurekaHost,
      port: eurekaPort,
      servicePath: '/eureka/apps/',
      maxRetries: 10,
      requestRetryDelay: 2000,
    },
  })
client.logger.level('debug')

client.start( error => {
    console.log(error || "user service registered");
    //console.log(client.getInstancesByAppId('ms3'));
});



function exitHandler(options, exitCode) {
    if (options.cleanup) {
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) {
        client.stop();
    }
}

client.on('deregistered', () => {
    process.exit();
    console.log('after deregistered');
})

client.on('started', () => {
  console.log("eureka host  " + eurekaHost);
})

process.on('SIGINT', exitHandler.bind(null, {exit:true}));
};