import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { TYPE_FILE } from "../global/enum";
import { uuid } from "../utils";
const firebaseConfig = {
    apiKey: "AIzaSyBG6cpo8dhmWyqEot9L8Dlg_WiXzNWHVUM",
    authDomain: "learn-tluc.firebaseapp.com",
    projectId: "learn-tluc",
    storageBucket: "learn-tluc.appspot.com",
    messagingSenderId: "865305202679",
    appId: "1:865305202679:web:146b73f41cdde87cf7a8f2"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


// Upload file and metadata to the object 'images/mountains.jpg'
const uploadFile = (typeFile: TYPE_FILE, file: any, progress: (number: number) => void, getUrl: (url: string) => void, setErrUpload: (err: string) => void) => {
    const type = file.type as string;
    const metadata = {
        contentType: type
    };
    let err = false
    if (typeFile === TYPE_FILE.IMG) {
        if (!type.includes('image/')) {
            setErrUpload('Bạn chỉ có thể tải lên hình ảnh!');
            err = true;
            return;
        }
    }
    if ((typeFile === TYPE_FILE.VIDEO)) {
        if (!type.includes('video/')) {
            setErrUpload('Bạn chỉ có thể tải lên định dạng cho video!');
            console.log('run')
            err = true;
            return;
        }
    }
    if ((typeFile === TYPE_FILE.SCORM)) {
        console.log('scrom')
        if (!type.includes('application/x-zip-compressed')) {
            setErrUpload('Bạn cần tải lên file nén zip!');
            err = true;
            return;
        }
    }
    if (err) {
        return
    } else {
        const storageRef = ref(storage, (typeFile === TYPE_FILE.IMG ? 'images/' : 'videos/') + file.name + uuid());
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progressP = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progress(progressP);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                setErrUpload(error.message)
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    getUrl(downloadURL)
                    console.log(downloadURL)
                });
            }
        );
    }

}
export { uploadFile }