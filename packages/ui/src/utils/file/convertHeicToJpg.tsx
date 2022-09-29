export const convertHeicToJpg = async (file: any) => {
    const heic2any = require('heic2any')
    const isHeic = file.type.toLowerCase() === "image/heic"
        || file.type.toLowerCase() === "image/heif"
        || file.name.toLowerCase().includes("heic")
        || file.name.toLowerCase().includes("heif");
    let newFile;

    if (isHeic) {
        console.log('format of this image is heic')
        const converted = await heic2any({
            blob: file,
            toType: "image/jpeg",
        })
        .then((result: any) => {
            const url = URL.createObjectURL(result as Blob);
            const convertedFile = new File([result as Blob], file.name.split(".")[0] + ".jpg",{type:"image/jpeg", lastModified:new Date().getTime()});

            return { file: convertedFile, url };
        })
        .catch((error: any) => console.log(error));

        return converted
    }
    else if (!isHeic) {
        const url = URL.createObjectURL(file);
        return { file, url };
    }
}
