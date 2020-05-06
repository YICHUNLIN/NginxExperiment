var request = require('basic-request');

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const workThread = () => {

    setInterval(()=>{
        const a = (Math.random() * 100 + 1);
        const b = (Math.random() * 100 + 2);
        request.get(`http://localhost/plus/a/${a}/b/${b}`, function(error, body) {
            parentPort.postMessage({id: body.from, woker: workerData.name});
        });
    }, workerData.interval);

};
const machines = {};
const recieve = [];
const record = (msg) => {
    recieve.push(msg);
    if (!machines.hasOwnProperty(msg.id)) {
        machines[msg.id] = 0;
    }
    machines[msg.id] += 1;
};

if (isMainThread) {
    for(let i = 0; i < 10; i++) {
        const worker = new Worker(__filename, {workerData : {interval: 1000, name: `worker_${i+1}`}});
        worker.on('message', record);
    }
    setInterval(()=>{
        console.log('times', machines);
    }, 1000);
    console.log('raw', recieve);
} else {
    workThread();
}