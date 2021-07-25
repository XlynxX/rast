import 'axios';
import axios from 'axios';

export default class ApiHelper {
    token: string | undefined;

    constructor() {
    }

    async apiLogin(login: string, password: string) {
        let payload = {
            "login": login,
            "password": password,
            "undelete": false,
            "captcha_key": null,
            "login_source": null,
            "gift_code_sku_id": null
        };

        let headers = {
            'Content-type': 'application/json',
            'Accept': 'text/plain'
        }
        const response = await axios.post('https://discord.com/api/v9/auth/login', payload, { headers: headers });
        if (response.status == 200) this.token = response.data.token;
        else {
            throw new Error("An error has occurred while trying to login." + response.statusText);
        }
        return this.token;
    }   
}