export const convertHeicToJpg = async (file: any) => {
    const heic2any = require('heic2any')
    const isHeic = file.type.toLowerCase() === "image/heic"
        || file.type.toLowerCase() === "image/heif"
        || file.name.toLowerCase().includes("heic")
        || file.name.toLowerCase().includes("heif");

    const newFile = isHeic
        ? await heic2any({
                blob: file,
                toType: "image/jpeg",
            })
            .then((result: any) => {
                return new File([result as Blob], file.name.split(".")[0] + ".jpg",{type:"image/jpeg", lastModified:new Date().getTime()});
            })
            .catch((error: any) => console.log(error))
        : file;

    return newFile;
}
