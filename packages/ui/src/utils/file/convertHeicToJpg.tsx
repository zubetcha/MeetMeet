export const convertHeicToJpg = async (file: any) => {
    const heic2any = require('heic2any')
    const fileExt = file.name.slice(file.name.lastIndexOf(".") + 1);
    let newFile;

    if (fileExt === "heic") {
        const convertedFile = await heic2any({
            blob: file,
            toType: "image/jpg",
        }).then((result: any) => {
            const url = URL.createObjectURL(result as Blob);
            const newFile = new File([result as Blob], "heic." + "jpg",{type:"image/jpeg", lastModified:new Date().getTime()});

            return { file: newFile, url };
        }).catch((error: any) => console.log(error));

        newFile = convertedFile;
    }
    else if (!(fileExt === "heic")) {
        const url = URL.createObjectURL(file);
        newFile = { file, url };
    }

    return newFile;
}
