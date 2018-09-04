import { Request, Response } from "express";

export interface ResolverMap {
	[key: string]: (request: Request, respone: Response, next: any) => any;
}
