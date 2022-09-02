import heic2any from "heic2any"

export const convertHeicToJpg = (file: any) => {
    const fileExt = file.substring(file.lastIndexOf(".") + 1);
    let newFile = file;

    if (fileExt === "heic") {
        const convertedFile = heic2any({
            blob: file,
            toType: "image/jpg",
        }).then((result) => {
            const url = URL.createObjectURL(result as Blob);
            const container = new DataTransfer();
            const file = new File([result as Blob], "heic" + "jpg",{type:"image/jpeg", lastModified:new Date().getTime()});
            container.items.add(file);

            return file;
        }).catch(error => console.log(error));

        newFile = convertedFile;
    }

    return newFile;
}
