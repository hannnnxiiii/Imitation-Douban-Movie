declare module "@/axios/detailAPI.js" {
  export function getVideoDetailAPI(id: string): Promise<any>
  export function getStillPhotosAPI(id: string): Promise<any>
  export function getFilmReviewAPI(id: string): Promise<any>
}
