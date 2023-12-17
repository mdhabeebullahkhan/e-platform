export const uploader = async (url, file, folder, token) =>{

    const formData = new FormData();

    formData.append("file", file);
    formData.append("folder", folder);

    const res = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
            'Authorization': token
        },
        onUploadProgress: (event) => {
            console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        }
    });
    return res;
}