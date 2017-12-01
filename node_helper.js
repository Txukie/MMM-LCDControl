'use strict';
const NodeHelper = require('node_helper');

const PythonShell = require('python-shell');
var pythonStarted = false
var pythonFlipping = false

module.exports = NodeHelper.create({
  
  python_start: function () {
    const self = this;
    const pyshell = new PythonShell('modules/' + this.name + '/lcdcontrol/lcdcontrol.py', { mode: 'json', args: [JSON.stringify(this.config)]});
    
    pyshell.on('message', function (message) {
      if (message.hasOwnProperty('status'))
      {
        console.log("[" + self.name + "] " + message.status);
      }
    });
      pyshell.end(function (err)
      {
        if (err) throw err;
        console.log("[" + self.name + "] " + 'finished running...');
        pythonStarted = false;
      });
  },

  python_switchoff: function () {
    const self = this;
    const pyshell = new PythonShell('modules/' + this.name + '/lcdcontrol/switchoff.py', { mode: 'json', args: [JSON.stringify(this.config)]});

    pyshell.on('message', function (message) {
      
      if (message.hasOwnProperty('status'))
      {
        console.log("[" + self.name + "] " + message.status);
      }
    });

    pyshell.end(function (err)
    {
      if (err) throw err;
      console.log("[" + self.name + "] " + 'finished running...');
      pythonFlipping = false;
    });
  },

  python_switchon: function () {
    const self = this;
    const pyshell = new PythonShell('modules/' + this.name + '/lcdcontrol/switchon.py', { mode: 'json', args: [JSON.stringify(this.config)]});

    pyshell.on('message', function (message)
    {
      if (message.hasOwnProperty('status'))
      {
        console.log("[" + self.name + "] " + message.status);
      }
    });

    pyshell.end(function (err)
    {
      if (err) throw err;
      console.log("[" + self.name + "] " + 'finished running...');
      pythonFlipping = false;
    });
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if(notification === 'INITIALIZE')
    {
      this.config = payload
      if(!pythonStarted)
      {
        pythonStarted = true;
        this.python_start();
      };
    };
    if(notification === 'SWITCHOFF')
    {
      this.config = payload
      if(!pythonFlipping)
      {
        pythonFlipping = true;
        this.python_switchoff();
      };
    };
    if(notification === 'SWITCHON')
    {
      this.config = payload
      if(!pythonFlipping)
      {
        pythonFlipping = true;
        this.python_switchon();
      };
    };
  }
});
