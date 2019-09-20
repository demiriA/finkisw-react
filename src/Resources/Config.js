class Config {
    constructor(){
       this.ipAddress = "192.168.0.103";
       this.port = "3001";
    }

    getIp(){
        return this.ipAddress;
    }

    getPort(){
        return this.port
    }

}

export default new Config();