// src/axios/listAPI.d.ts
declare module "@/axios/listAPI.js" {
  export function getNowShowingAPI(): Promise<any>; // 根据实际返回类型进行修改
  export function getPopFilmTagAPI(): Promise<any>; // 根据实际返回类型进行修改
  export function getPopFilmAPI(tag: string): Promise<any>; // 根据实际返回类型进行修改
  export function getFilmFloatAPI(id: string): Promise<any>; // 根据实际返回类型进行修改
}
