import { string } from "prop-types"

declare type ns = number | string

declare interface Article {
  id: number,
  title: string,
  introduce?: string,
  content: string,
  create_time?: string,
  update_time?: string,
  view_count?: number,
  type: string
}
