module.exports = function(RED){
  function AssessmentNode(config){
    const utils = require('../../utils/utils')

    var node = this;
    node.file = __dirname + '\\assessment.py'
    node.config = {
      score: config.score
    }
    node.data = {}
    node.preMsg = (msg, done) => {
      if(msg.topic == 'real'){
        node.data.real = msg.payload
      }
      else if(msg.topic == 'predicted'){
        node.data.predicted = msg.payload
      }
      if(node.data.real && node.data.predicted){
        msg.payload = node.data
        done(msg)
      }
    }

    utils.run(RED, node, config)
  }
  RED.nodes.registerType("Assessment", AssessmentNode);
}