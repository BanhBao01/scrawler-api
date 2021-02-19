const axios = require('axios').default;

const helpers = require('./../helpers/common')
const constantsAxios = require('./../constants/axios')

let headers = constantsAxios.headers

class ZingMp3Controller {
    constructor() {
        async () => {
            const rqid = await helpers.getCookieZing(axios);
            headers = {
                ...headers,
                Cookie: rqid
            }
        }
    }

    /**
     * Tìm kiếm bài hát
     * @param {*} req 
     * @param {*} res 
     */
    async searchSong(req, res) {
        const { q } = req.query
        const api = '/api/v2/search/multi'
        const time = helpers.ctime()

        try {
            if (!q) {
                res.json({
                    "err": 1,
                    "msg": "q does not exist!"
                })
            }

            const response = await axios('https://zingmp3.vn' + api, {
                params: {
                    q,
                    ctime: time,
                    sig: helpers.sig(api, `ctime=${time}version=1.0.22`),
                    version: '1.0.22',
                    apiKey: process.env.API_KEY
                },
                headers
            })

            res.json({
                ...response.data
            })
        } catch (error) {
            res.json({
                "err": 1,
                "msg": error.message
            })
        }
    }
    /**
     * Lấy chi tiết playlist
     * @param {*} req 
     * @param {*} res 
     */
    async getDetailPlaylist(req, res) {
        const { idPlaylist } = req.query
        const api = '/api/v2/playlist/getDetail'
        const time = helpers.ctime()

        try {
            if (!idPlaylist) {
                res.json({
                    "err": 1,
                    "msg": "idPlaylist does not exist!"
                })
            }

            const response = await axios('https://zingmp3.vn' + api, {
                params: {
                    id: idPlaylist,
                    ctime: time,
                    sig: helpers.sig(api, `ctime=${time}id=${idPlaylist}version=1.0.22`),
                    version: '1.0.22',
                    apiKey: process.env.API_KEY
                },
                headers
            })

            res.json({
                ...response.data
            })
        } catch (error) {
            res.json({
                "err": 1,
                "msg": error.message
            })
        }
    }
    /**
     * Lấy link stream bài hát
     * @param {*} req 
     * @param {*} res 
     */
    async getStreamingSong(req, res) {
        const { idSong } = req.query
        const api = '/api/v2/song/getStreaming'
        const time = helpers.ctime()

        try {
            if (!idSong) {
                res.json({
                    "err": 1,
                    "msg": "idSong does not exist!"
                })
            }

            const response = await axios('https://zingmp3.vn' + api, {
                params: {
                    id: idSong,
                    ctime: time,
                    sig: helpers.sig(api, `ctime=${time}id=${idSong}version=1.0.22`),
                    version: '1.0.22',
                    apiKey: process.env.API_KEY
                },
                headers
            })

            res.json({
                ...response.data
            })
        } catch (error) {
            res.json({
                "err": 1,
                "msg": error.message
            })
        }
    }
}

module.exports = ZingMp3Controller