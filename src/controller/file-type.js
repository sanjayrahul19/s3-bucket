export const getFileType = (extension) => {

    switch (extension) {
        case 'jpg':
        case 'png':
        case 'jpeg':
        case 'gif':
        case 'tiff':
        case 'ico':
        case 'svg':
        case 'webp':
        case 'avif':

            return "IMAGE";

        case 'mp3':
        case 'wav':

            return "AUDIO";

        case 'mp4':
        case 'mov':
        case 'MOV':
        case 'ogg':
        case 'wmv':
        case 'webm':

            return "VIDEO";

        case 'pdf':
        case 'doc':
        case 'docx':
        case 'odt':
        case 'rtf':
        case 'txt':

            return "FILE";

        default:
            return 0;
    }
}
