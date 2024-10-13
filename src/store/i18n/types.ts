import { ExistsFunction } from "i18next"
import { Locale } from 'date-fns/locale'

export interface I18nState {
  readonly lang: string
  readonly locale: Locale
  readonly t: (
    key: string | string[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: { [key: string]: any }
  ) => string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly exist: ExistsFunction
}
