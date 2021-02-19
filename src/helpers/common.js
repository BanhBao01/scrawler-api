const crypto = require('crypto');

const ctime = () => {
    return Math.round((new Date).getTime() / 1e3)
}
const getHash256 = (a) => {
    return crypto.createHash('sha256').update(a).digest('hex');
}
const getHmac512 = (str, key) => {
    let hmac = crypto.createHmac("sha512", key);
    return hmac.update(Buffer.from(str, 'utf8')).digest("hex");
}

const sig = (api, key) => {
    return getHmac512(api + getHash256(key), process.env.SECRET_KEY)
}

const getCookieZing = async (axios) => {
    try {
        const response = await axios.get('https://zingmp3.vn/')
        return getZmp2Rqid('zmp3_rqid', response.headers['set-cookie'])
    } catch (error) {
        return null
    }
}

const getZmp2Rqid = (name, cookie) => {
    const value = `;${cookie}`;
    const parts = value.split(`,${name}=`);
    if (parts.length === 2) return  `${name}=${parts.pop().split(';').shift()}`;
  }

module.exports = {
    ctime, sig, getCookieZing    
}