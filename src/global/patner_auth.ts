import { Storage } from "@ionic/storage"
import { alertController, loadingController, toastController } from "@ionic/vue";
import axios from "axios";
import { Router } from "vue-router";

export const check_connect = async () => {
    const storage = new Storage({
        name: "patner_info",
    });
    storage.create();
    const token: string | undefined = await storage.get('ptoken')
    if (!token) return false
    else {
        const json_tok = JSON.parse(token)
        try {
            const resp = await axios({
                url: 'v2/ping',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${json_tok.access}`
                },
            })
            if (resp.data['done']) return true
        } catch (err: any) {
            if (err.response.status == 401) {
                const form = new FormData()
                form.append('refresh', json_tok.refresh)
                try {
                    const refresh_res = await axios({
                        url: 'api/token/refresh/',
                        method: 'POST',
                        data: form
                    })
                    json_tok.access = refresh_res.data['access']
                    storage.set('ptoken', JSON.stringify(json_tok))
                    return true
                } catch (err: any) {
                    if (err.response.status == 401) return false
                }
            }
        }
    }
}

export const access_tok = async (path: string, router: Router, load : HTMLIonLoadingElement|undefined) => {
    const storage = new Storage({
        name: "patner_info",
    });
    storage.create();
    const token: string | undefined = await storage.get('ptoken')
    if (!token) {
        if (load) load.dismiss();
        return router.push(`/seller?redirect=${path}`)
    } 
    else {
        const json_tok = JSON.parse(token)
        try {
            const resp = await axios({
                url: 'v2/ping',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${json_tok.access}`
                },
            })
            return json_tok.access as string
        } catch (err: any) {
            if (err.response.status == 401) {
                const form = new FormData()
                form.append('refresh', json_tok.refresh)
                try {
                    const refresh_res = await axios({
                        url: 'api/token/refresh/',
                        method: 'POST',
                        data: form
                    })
                    json_tok.access = refresh_res.data['access']
                    storage.set('ptoken', JSON.stringify(json_tok))
                    return refresh_res.data['access'] as string
                } catch (err: any) {
                    if (err.response.status == 401) return router.push(`/seller?redirect=${path}`)
                }
            }
        }
    }
}

export default access_tok;