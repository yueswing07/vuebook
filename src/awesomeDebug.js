export default class Awesome{
  prefix = ""
  suffix = ""
  level = ""
  /**
   *
   * @param {JSON} options Options like level, etc.
   * @param {String} message Message to print
   */
  static debug(level,classname, message, object){
    var style_level = ""
    var style_classname = "background: black; color: yellow"
    var style_time = "background: black; color: white"
    var style_message = "background: lightgray: color: red"

    switch (level) {
      case 'minor':
        this.level = "[M]"
        style_level = "background: lightgreen; color: green"
        break;
      case 'servere':
        this.level = "[S]"
        style_level = "background: red; color: white"
      break;
      case 'debug':
        this.level = "[D]"
        style_level = "background: lightgray; color: black"
      break;
      case 'info':
        this.level = "[I]"
        style_level = "background: lightblue; color: blue"
      break;
      default:
        this.level = ""
        message = level
        break;
    }
    /**
     * Append leading 0 if time is too small
     * http://stackoverflow.com/a/23579692
     */
    var hours = ('0'+new Date().getHours()).slice(-2);
    var mins = ('0'+new Date().getMinutes()).slice(-2);
    var seconds = ('0'+new Date().getSeconds()).slice(-2);
    var messageTime = '['+hours+':'+mins+':'+seconds+']'

    var classname = '['+classname+']'
    /**
     * 1. Level
     * 2. Time
     * 3. Message
     * http://stackoverflow.com/questions/7505623/colors-in-javascript-console
     */
    if(!object){
      console.log("%c%s%c%s%c%s%c %s",style_level,this.level,style_classname,classname||"",style_time,messageTime,style_message,message)
    } else {
      console.log("%c%s%c%s%c%s%c %s",style_level,this.level,style_classname,classname||"",style_time,messageTime,style_message,message,"",object)
    }

    // console.log("%cExample %s", css, 'all code runs happy');
  }

}
