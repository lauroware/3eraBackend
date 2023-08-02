export default class SessionsDTO{
    constructor(resp){
        this.firstName = resp.first_name
        this.lastName = resp.last_name
        this.mail = resp.email
        this.role = resp.role
    }
}