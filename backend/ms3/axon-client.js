const Grpc = require('@grpc/grpc-js');
const Loader = require('@grpc/proto-loader');
const Rx = require('rxjs');
var path = require('path');
const serializer = require('./util/xml-serializer');
const protoLoaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

const meta = new Grpc.Metadata();

const controller = require('./controllers/Controller');
function start(){
    const p =  path.join(__dirname, '/proto/event.proto');
    const packageDefinition = Loader.loadSync(p, protoLoaderOptions);
    const eventBus = Grpc.loadPackageDefinition(packageDefinition).io.axoniq.axonserver.grpc.event;
    eventClient = new eventBus.EventStore('localhost:8124',Grpc.credentials.createInsecure());

    openEventStream().subscribe((res)=>{
        switch(res.Type){
            case "com.example.demo.Events.UserModifieEvent":
                if(res.role._text=="enseignat")
                    controller.updateTeacherFullName(res.Id,res.Nom._text+" "+res.Prenom._text);
                else
                    controller.updateStudentFullName(res.Id,res.Nom._text+" "+res.Prenom._text);
                break;
            case "com.example.demo.Events.UserSupprimeEvent":
                if(res.role._text=="enseignat")
                    controller.deleteSessionByTeacherId(res.Id._text);
                else
                    controller.deleteAbsenceByStudentId(res.Id._text);
                break;
            case "com.example.coreapi.events.EtudiantAddedEvent":
                console.log('--------------------------------------------------------------');
                console.log(res);
                break;
        }
    })
}


function openEventStream() {
    return new Rx.Observable( observer => {
        const call = eventClient.listEvents(meta);
        let requests_before_new_permits = 10;
        call.on('data', d => {
            let payload = serializer.deserialize(d.event.payload);
            payload.message_identifier = d.event.message_identifier;
            observer.next(payload);
            requests_before_new_permits--;
            if (requests_before_new_permits === 0) {
                call.write({"number_of_permits": 10});
                requests_before_new_permits += 10;
            }
        });
        call.on('error', error => {
            console.error("grpc-js : No connection established");
            //observer.error(error);
        });
        call.on('end', () => {
            console.warn("End");
            observer.complete();
        });
        call.write({"tracking_token": 0, "number_of_permits": 10});
    });
}
exports.start = start;