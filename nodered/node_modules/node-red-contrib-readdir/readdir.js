module.exports = function (RED) {
    "use strict";

    var path = require('path');
    var fs = require('fs');

    function ReadDirNode(config) {
        RED.nodes.createNode(this, config);

        this.dir = config.dir;
        this.as = config.as || "multi";
        this.outproperty = config.outproperty || "payload";
        this.recursive = config.recursive || false;

        var node = this;
        node.on('input', function (msg) {

            try {
                // List all files in a directory in Node.js recursively in a synchronous fashion
                var walkSync = function (dir, filelist) {
                    var files = fs.readdirSync(dir);
                    filelist = filelist || [];

                    files.forEach(function (file) {
                        var fileName = path.join(dir, file);

                        if (fs.statSync(fileName).isDirectory()) {
                            //check recursive
                            if (node.recursive) {
                                filelist = walkSync(fileName, filelist);
                            }

                        } else {

                            if (node.as === 'multi') {
                                var newMsg = RED.util.cloneMessage(msg);
                                RED.util.setMessageProperty(newMsg, node.outproperty, fileName);
                                node.send(newMsg);
                            }

                            if (node.as === 'single') {
                                filelist.push(fileName);
                            }
                        }
                    });

                    return filelist;
                };

               var allFiles =  walkSync(node.dir);

                if (node.as === 'single') {
                    RED.util.setMessageProperty(msg, node.outproperty, allFiles);
                    node.send(msg);
                }

            } catch (error) {
                node.error(error.message, msg);
            }

        });
    }

    RED.nodes.registerType("readdir", ReadDirNode);

};