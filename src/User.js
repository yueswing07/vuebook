export default class User {
  informations = {
    name: "placeholder",
    email: "placeholder",
    uid: "placeholder",
  };
  flag_valid = false
  /**
   * Setup a user with his information
   * These values are not ment to be modified afterwards
   * @param {String} name username
   * @param {String} email email
   * @param {String} uid UID from firebase
   */
  constructor(name, email, uid) {
    console.log('== User ==');
    this.informations.name = name
    this.informations.email = email
    this.informations.uid = uid
  }
  /**
   * @return Current user name
   */
  getName(){
    return this.informations.name
  }
  /**
   * @return Current user email
   */
  getEmail(){
    return this.informations.email
  }
  /**
   * @return Current user UID
   */
  getUID(){
    return this.informations.uid
  }
  /**
   *
   * @param {boolen} isValid Define if user is logged in or not
   */
  setValidation(isValid){
    this.flag_valid = isValid || false
  }
  /**
   * @return True/False if user is still valid
   */
  getValidation(){
    return this.flag_valid
  }
}
