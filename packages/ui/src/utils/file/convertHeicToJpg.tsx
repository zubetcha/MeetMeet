export const convertHeicToJpg = async (file: any) => {
    const heic2any = require('heic2any')
    const isHeic = file.type.toLowerCase() === "image/heic" || file.name.toLowerCase().includes(".heic");
    let newFile;

    if (isHeic) {
        heic2any({
            blob: file,
            toType: "image/jpeg",
        })
        .then((result: any) => {
            const url = URL.createObjectURL(result as Blob);
            const convertedFile = new File([result as Blob], file.name.split(".")[0] + "jpg",{type:"image/jpeg", lastModified:new Date().getTime()});

            newFile =  { file: convertedFile, url };
        })
        .catch((error: any) => console.log(error));
    }
    else if (!isHeic) {
        const url = URL.createObjectURL(file);
        newFile = { file, url };
    }

    return newFile;
}
