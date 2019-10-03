class Config {
    constructor(){
       this.ipAddress = "localhost";
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
