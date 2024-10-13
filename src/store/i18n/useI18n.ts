/* eslint-disable @typescript-eslint/no-explicit-any */
import * as i18nStore from "./i18n"
import { useStore } from "effector-react"

const useI18n = () => useStore(i18nStore.store)
export default useI18n
