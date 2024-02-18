import { toast } from "sonner"

// success alert
export const successAlert = (msg) => {
  toast.success(msg)
}

// error alert
export const errorAlert = (msg) => {
  toast.error(msg)
}

// error alert
export const infoAlert = (msg) => {
  toast.info(msg)
}