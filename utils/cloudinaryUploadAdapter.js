const cloudinary = require('./cloudinary.js');

    class CloudinaryUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }

        upload() {
            return this.loader.file.then(file => new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'news/editor', use_filename: true, unique_filename: false },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve({
                                default: result.secure_url
                            });
                        }
                    }
                ).end(file);
            }));
        }

        abort() {
            // Xử lý hủy upload nếu cần
        }
    }

    function CloudinaryUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new CloudinaryUploadAdapter(loader);
        };
    }

    module.exports = CloudinaryUploadAdapterPlugin;