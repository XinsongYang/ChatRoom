const fs = require('fs');
const path = require('path');

module.exports = {
    
    async upload(ctx, next) {
        const files = ctx.request.body.files || {};
        const uploadPath = path.join(__dirname, '../public/upload');
        let url;
        for (let key in files) {
            const file = files[key];
            const filePath = path.join(uploadPath, file.name);
            const reader = fs.createReadStream(file.path);
            const writer = fs.createWriteStream(filePath);
            reader.pipe(writer);
            url = `/upload/${file.name}`;
        }

        ctx.ok({ url });
    }

}