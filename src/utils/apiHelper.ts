import 'axios';
import axios from 'axios';
import { colors } from '../core/colors/colors';
import { UsersResponse } from './types/users';

export default class ApiHelper {
    token: string;
    headers: object;

    constructor(token: string = '') {
        this.token = token;
        // if token is not empty
        if (token !== '') {
            this.headers = {
                'Content-type': 'application/json',
                'Accept': 'text/plain',
                'Authorization': this.token,
            };
            return;
        }
        // if token is empty
        this.headers = {
            'Content-type': 'application/json',
            'Accept': 'text/plain'
        }
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

        try {
            const response = await axios.post('https://discord.com/api/v9/auth/login', payload, { headers: this.headers });
            if (response.status == 200) {
                this.token = response.data.token;
                this.headers = {
                    'Content-type': 'application/json',
                    'Accept': 'text/plain',
                    'Authorization': this.token,
                }
                return this.token;
            }
        }
        catch (reason) {
            console.log(colors.FgRed + 'An error has occured while trying to login\n' + reason + colors.Reset);
            return '';
        }
        return '';
    }

    async getUsers() {
        try {
            const response = await axios.get('https://discord.com/api/v9/users/@me/affinities/users', { headers: this.headers });
            if (response.status == 200) {
                return response.data;
            }
        }
        catch (reason) {
            console.log(colors.FgRed + 'An error has occured while trying to get users\n' + reason + colors.Reset);
            return '';
        }
    }
}