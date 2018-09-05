import { Request, Response } from "express";

export interface ResolverMap {
	[key: string]: (request: Request, response: Response, next: any) => any;
}
