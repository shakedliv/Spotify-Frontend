export const uploadService = {
    uploadImg,
}
async function uploadImg(file) {
    const CLOUD_NAME = 'dw4kn4aq9'
    const UPLOAD_PRESET = 'statify_imgs'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()

    // Building the request body
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)

    // Sending a post method request to Cloudinary API
    try {
        const res = await fetch(UPLOAD_URL, { method: 'POST', body: formData })
        const imgData = await res.json()
        return imgData
    } catch (err) {
        console.error(err)
        throw err
    }
}