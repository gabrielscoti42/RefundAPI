import { Request, Response } from "express";

class UploadsController {
    async create(request: Request, response: Response): Promise<any> {
        response.json("ok")
    }
}

export { UploadsController }