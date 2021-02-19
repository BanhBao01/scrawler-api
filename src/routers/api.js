const express = require('express')
const router = express.Router()

const ZingMp3Controller = require('./../controllers/ZingMp3Controller')
const controller = new ZingMp3Controller()

router.get('/zing-mp3/search', controller.searchSong)
router.get('/zing-mp3/playlistDetail', controller.getDetailPlaylist)
router.get('/zing-mp3/getStreaming', controller.getStreamingSong)

module.exports = router