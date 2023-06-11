const converter = require('xml-js');

function serialize( type, object) {
    let wrapped = {};
    wrapped[type] = object;
    let xml = converter.js2xml(wrapped, {compact: true, ignoreComment: true, spaces: 4});

    return {
        "type": type,
        "data": Buffer.from(xml)
    };
}

function deserialize( serializedType) {
    let xml = serializedType.data.toString();
    let result = null;
    result = converter.xml2js(xml, {compact: true,nativeType: true, spaces: 4});
    result = result[serializedType.type];
    result.Type = serializedType.type;
    return result;
}

exports.deserialize = (serializedType) => deserialize(serializedType);
exports.serialize = (type,object) => serialize(type, object);