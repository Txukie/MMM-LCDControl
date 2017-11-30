/* global Module */

/* Magic Mirror
 * Module: MMM-LCDControl
 *
 * By Alberto de Tena Rojas http://albertodetena.com
 * MIT Licensed.
 */

Module.register('MMM-LCDControl',
{
	defaults:
	{
		GPIO_PIR: 21,
                GPIO_LCD_ONOFF: 20,
                GPIO_LCD_STATUS: 12
	},

	// Define required translations.
	getTranslations: function() {
		return {
			en: "translations/en.json",
                        es: "translations/es.json",
			fr: "translations/fr.json"
		};
	},

	getCommands : function(register) {
    if (register.constructor.name == 'TelegramBotCommandRegister') {
      register.add({
        command: 'screen switch off',
        description: this.translate("CMD_TELBOT_SWITCHOFF"),
        callback: 'cmd_switchoff'
      })
      register.add({
        command: 'screen switch on',
        description: this.translate("CMD_TELBOT_SWITCHON"),
        callback: 'cmd_switchon'
      })
    }
    if (register.constructor.name == 'AssistantCommandRegister') {
      register.add({
        command: this.translate("CMD_ASSTNT_SWITCH_OFF"),
        description: this.translate("CMD_ASSTNT_SWITCH_OFF_DESCRIPTION"),
        callback: 'cmd_switchoff'
      })
      register.add({
        command: this.translate("CMD_ASSTNT_SWITCH_ON"),
        description: this.translate("CMD_ASSTNT_SWITCH_ON_DESCRIPTION"),
        callback: 'cmd_switchon',
      })
    }
    },

        cmd_switchoff : function (command, handler)
	{
    	Log.info('Trying to switch off the LCD');
    	handler.response('Trying to switch off the LCD');
    	this.sendSocketNotification('SWITCHOFF', this.config);
  	},
  	cmd_switchon : function (command, handler)
	{
    	Log.info('Trying to switch on the LCD');
    	handler.response('Trying to switch on the LCD');
    	this.sendSocketNotification('SWITCHON', this.config);
  	},
	start: function()
	{
		//this.sendSocketNotification('CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
                this.sendSocketNotification('INITIALIZE', this.config);
	}
});
