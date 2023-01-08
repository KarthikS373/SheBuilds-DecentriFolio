import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import { storage } from "./firebase.config"

export const handleTicketUpload = async (file: File, setUrl: any) => {
  const storageRef = ref(storage, `/ticket/${file.name}`)
  const progress = uploadBytesResumable(storageRef, file)

  progress.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    },
    (err: Error) => console.log(err),
    () => {
      getDownloadURL(progress.snapshot.ref).then((url: string) => {
        setUrl(url)
      })
    }
  )
}
